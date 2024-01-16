import { Body, Controller, HttpCode, HttpStatus, Param, Post, Put, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { Response } from 'express';
import { ProductService } from './product.service';
import { AdminRoleGuard } from 'src/auth/guards/admin-role/admin-role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { CreateProductDescriptionDTO } from './description/dto/create-description.dto';
import { DescriptionService } from './description/description.service';
import { CreateProductAmountDTO } from './amount/dto/create-amount.dto';
import { AmountService } from './amount/amount.service';
import { CreateProductPriceDTO } from './price/dto/create-price.dto';
import { PriceService } from './price/price.service';
import { UpdateProductDescriptionDTO } from './description/dto/update-description.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { productImageMulterOption } from 'constants/fileConfig';

@Controller('product')
export class ProductController {

  constructor(
    private productService:ProductService,
    private productDescriptionService:DescriptionService,
    private productAmountService:AmountService,
    private productPriceService:PriceService
  ){}

  @Post('addInternalization/:id')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async addProductDescription(@Param('id') id: string, @Body() body:CreateProductDescriptionDTO, @Res() res:Response){
    const productId = await this.productService.findProduct(id)
    const internalization = await this.productDescriptionService.create(body, productId)
    return res.json(internalization)
  }

  @Put('updateInternalization/:id')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async updateProductDescription(@Param('id') id: string, @Body() body:UpdateProductDescriptionDTO, @Res() res:Response){
    const productId = await this.productService.findProduct(id)
    const internalization = await this.productDescriptionService.update(body, productId)
    return res.json(internalization)
  }

  @Post('setAmout/:id')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async setProductAmount(@Param('id') id: string, @Body() body:CreateProductAmountDTO, @Res() res:Response){
    const productId = await this.productService.findProduct(id)
    const amount = await this.productAmountService.set(body, productId)
    return res.json(amount)
  }

  @Post('setPrice/:id')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async setProductPrice(@Param('id') id: string, @Body() body:CreateProductPriceDTO, @Res() res:Response){
    const productId = await this.productService.findProduct(id)
    const price = await this.productPriceService.set(body, productId)
    return res.json(price)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async createProduct(@Body() body:CreateProductDTO, @Res() res: Response){
    const product = await this.productService.createProduct(body)
    return res.json(product)
  }

  @Post('addImage/:id')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @UseInterceptors(FileInterceptor('file', productImageMulterOption))
  async uploadProductFile(@UploadedFile() file: Express.Multer.File){
    console.log(file)
  }
}
