import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDescriptionDTO } from './dto/create-description.dto';

@Injectable()
export class DescriptionService {

  constructor(private prisma:PrismaService){}

  async createMany(descriptionsDTO: CreateProductDescriptionDTO[], productId:number){
    const descriptions = await this.prisma.productInternalization.createMany({
      data: descriptionsDTO.map(el=>({
        ...el,
        productId
      }))
    })

    return descriptions
  }

  async create(descriptionDTO: CreateProductDescriptionDTO, productId:number){
    const description = await this.prisma.productInternalization.create({
      data: {
        ...descriptionDTO,
        productId
      }
    })

    return description
  }
}
