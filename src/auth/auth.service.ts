import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2';
import { IAuthPayload, IGoogleUser } from 'src/interfaces';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { CredentialSigninDTO } from './dto/credential-sign-in.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    public userService: UserService
  ) {}

  getTokens(payload: IAuthPayload){
    return ({
      access_token: this.generateJWT(payload)
    })
  }
  generateJWT(payload: IAuthPayload){
    return this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.key'),
      expiresIn: '15m'
    })
  }

  hashPassword(password:string):Promise<string>{
    return argon2.hash(password)
  }

  async signUp(userData: CreateUserDTO){
    const candidat = await this.userService.findUserByEmail(userData.email)
    if(candidat){
      throw new BadRequestException('user with that email already exists')
    }

    if(!userData.password){
      throw new BadRequestException('password must be required')
    }

    const hashPassword = await this.hashPassword(userData.password)
    try{
      const createdUser = await this.userService.createUser({...userData, password: hashPassword})
      return this.getTokens({
        email: createdUser.email,
        id: createdUser.id,
        role: createdUser.role
      })
    }catch(error){
      throw new InternalServerErrorException('can not create new user')
    }
  }

  async signIn( loginData: CredentialSigninDTO ) {
    const candidat = await this.userService.findUserByEmail(loginData.login)
    if(!candidat){
      throw new UnauthorizedException('User does ot exist')
    }

    const verifiedPassword = await argon2.verify(candidat.password, loginData.password)
    if (!verifiedPassword) {
      throw new UnauthorizedException('password is incorrect')
    }
    
    return this.getTokens({
        id: candidat.id,
        email: candidat.email,
        role: candidat.role
      })
  }

  async signInGoogle(user:IGoogleUser) {
    if (!user) {
      throw new UnauthorizedException()
    }

    let userCandidat = await this.userService.findUserByEmail(user.email)

    if (!userCandidat) {
      try{
        const userDTO: CreateUserDTO = {
          email: user.email,
          img: user.picture,
        }
        userCandidat = await this.userService.createUser(userDTO) 
      }catch {
        throw new InternalServerErrorException()
      }
    }

    return this.getTokens({
      id: userCandidat.id,
      email: userCandidat.email,
      role: userCandidat.role
    })
  }

}
