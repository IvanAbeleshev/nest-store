import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { IAuthPayload, IGoogleUser } from 'src/interfaces';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    public userService: UserService
  ) {}

  generateJWT(payload: IAuthPayload){
    return this.jwtService.sign(payload)
  }

  async signInGoogle(user:IGoogleUser) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    let userCandidat = await this.userService.findUserByEmail(user.email);

    if (!userCandidat) {
      try{
        userCandidat = await this.userService.createUser(user.name, user.email) 
      }catch {
        throw new InternalServerErrorException();
      }
      
    }
  }

}
