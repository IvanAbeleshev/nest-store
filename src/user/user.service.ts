import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {}

  async createUser( data: CreateUserDTO ) {
    const createdUser = await this.prisma.user.create({
      data
    })

    return createdUser
  }

  async findUserByEmail( email:string ){
    const findedUser = await this.prisma.user.findFirst({
      where:{
        email
      }
    })

    return findedUser
  }

  async findUserById ( id:number ){
    const findedUser = await this.prisma.user.findFirst({
      where:{
        id
      }
    })

    return findedUser
  }
}
