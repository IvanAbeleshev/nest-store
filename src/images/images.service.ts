import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateImageDTO } from './dto/create-image.dto';

@Injectable()
export class ImagesService {
  
  constructor(private prisma:PrismaService){}

  async addImage(imgData: CreateImageDTO, ownerAttribute:Record<string, number>){
    const image = await this.prisma.images.create({
      data:{
        ...imgData,
        ...ownerAttribute
      }
    })

    return image
  }

  async getOriginalName(imgPath:string){
    const img = await this.prisma.images.findFirst({
      where:{
        imgPath
      }
    })

    return img.originalName
  }
}
