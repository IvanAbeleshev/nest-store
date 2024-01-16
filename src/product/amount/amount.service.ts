import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductAmountDTO } from './dto/create-amount.dto';

@Injectable()
export class AmountService {

  constructor(private prisma:PrismaService){}

  async set(amountDTO: CreateProductAmountDTO, productId:number){
    const price = await this.prisma.productAvailableAmout.upsert({
      create:{
        ...amountDTO,
        productId
      },
      update:{
        ...amountDTO,
      },
      where:{
        productId
      }
    })

    return price
  }
}
