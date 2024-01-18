import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductImageDTO } from './dto/create-image.dto';

@Injectable()
export class ImagesService {
  
  constructor(private prisma:PrismaService){}

  async addImage(imgData: CreateProductImageDTO, productId:number){
    const productImage = await this.prisma.productImages.create({
      data:{
        ...imgData,
        productId
      }
    })

    return productImage
  }

  async getOriginalName(imgPath:string){
    const img = await this.prisma.productImages.findFirst({
      where:{
        imgPath
      }
    })

    return img.originalName
  }
}
