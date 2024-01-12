import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DescriptionService } from './description/description.service';
import { PriceService } from './price/price.service';
import { AmountService } from './amount/amount.service';

@Injectable()
export class ProductService {

  constructor(
    private prisma:PrismaService,
    private descriptionService:DescriptionService,
    private priceService:PriceService,
    private amountService:AmountService,
  ){}

  async createProduct( productData:CreateProductDTO ){
    const product = await this.prisma.product.create({
      data:{
        UID: productData.UID,
        article: productData.article
      }
    })

    //create internalizations
    if(productData.descriptions){
      this.descriptionService.createMany(productData.descriptions, product.id)
    }

    //set product price
    if(productData.price){
      this.priceService.create(productData.price, product.id)
    }

    //add available amount
    if(productData.amount){
      this.amountService.create(productData.amount, product.id)
    }
    
    return product
  }
}
