import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductPriceDTO } from './dto/create-price.dto';

@Injectable()
export class PriceService {

  constructor(private prisma:PrismaService){}

  async create(priceData:CreateProductPriceDTO, productId:number){
    const price = await this.prisma.productPriceAndDiscount.create({
      data:{
        ...priceData,
        productId
      }
    })

    return price
  }
}
