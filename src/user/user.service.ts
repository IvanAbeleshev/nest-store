import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {}

  async createUser( name: string, email: string ) {
    const createdUser = await this.prisma.user.create({
      data: {
        name,
        email
      }
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
