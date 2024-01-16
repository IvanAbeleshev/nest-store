import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductPriceDTO } from './dto/create-price.dto';

@Injectable()
export class PriceService {

  constructor(private prisma:PrismaService){}

  async set(priceData:CreateProductPriceDTO, productId:number){
    const price = await this.prisma.productPriceAndDiscount.upsert({
      create:{
        ...priceData,
        productId
      },
      update:{
        ...priceData,
      },
      where:{
        productId
      }

    })

    return price
  }
}
