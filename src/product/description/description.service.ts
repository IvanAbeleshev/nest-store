import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDescriptionDTO } from './dto/create-description.dto';
import { UpdateProductDescriptionDTO } from './dto/update-description.dto';

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
    const findedInternalization = await this.prisma.productInternalization.findFirst({
      where: {
        id: productId
      }
    })

    if(findedInternalization && findedInternalization.languageShortName === descriptionDTO.languageShortName){
      throw new BadRequestException(`product description in ${descriptionDTO.languageShortName} already exist. Id of existing description is: ${findedInternalization.id}`)
    }
    
    const description = await this.prisma.productInternalization.create({
      data: {
        ...descriptionDTO,
        productId
      }
    })

    return description
  }

  async update(descriptionDTO: UpdateProductDescriptionDTO, productId:number){
    let description
    try{
       description = await this.prisma.productInternalization.update({
        data:{
          ...descriptionDTO,
          productId,
        },
        where:{
          id: descriptionDTO.id
        }
      })
      
    }catch(error){
      throw new BadRequestException(`product description with id: ${descriptionDTO.id} is missed`)
    }

    return description
  }
}
