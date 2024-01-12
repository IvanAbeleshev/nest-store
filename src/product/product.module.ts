import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { DescriptionService } from './description/description.service';
import { AmountService } from './amount/amount.service';
import { PriceService } from './price/price.service';
import { ImagesService } from './images/images.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService, 
    DescriptionService, 
    AmountService, 
    PriceService, 
    ImagesService, 
    PrismaService,
  ],
})
export class ProductModule {}
