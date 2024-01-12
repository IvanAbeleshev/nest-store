import { Body, Controller, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { Response } from 'express';
import { ProductService } from './product.service';
import { AdminRoleGuard } from 'src/auth/guards/admin-role/admin-role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Controller('product')
export class ProductController {

  constructor(private productService:ProductService){}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async createProduct(@Body() body:CreateProductDTO, @Res() res: Response){
    const product = await this.productService.createProduct(body)
    return res.json(product)
  }
}
