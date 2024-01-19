import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Res, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
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
import { productImageMulterOption } from 'src/config/fileConfig';
import { ImagesService } from './images/images.service';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('product')
export class ProductController {

  constructor(
    private productService:ProductService,
    private productDescriptionService:DescriptionService,
    private productAmountService:AmountService,
    private productPriceService:PriceService,
    private productImages:ImagesService
  ){}

  @Post('addInternalization/:id')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async addProductDescription(@Param('id') id: string, @Body() body:CreateProductDescriptionDTO, @Res() res:Response){
    const productId = await this.productService.find(id)
    const internalization = await this.productDescriptionService.create(body, productId)
    return res.json(internalization)
  }

  @Put('updateInternalization/:id')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async updateProductDescription(@Param('id') id: string, @Body() body:UpdateProductDescriptionDTO, @Res() res:Response){
    const productId = await this.productService.find(id)
    const internalization = await this.productDescriptionService.update(body, productId)
    return res.json(internalization)
  }

  @Post('setAmout/:id')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async setProductAmount(@Param('id') id: string, @Body() body:CreateProductAmountDTO, @Res() res:Response){
    const productId = await this.productService.find(id)
    const amount = await this.productAmountService.set(body, productId)
    return res.json(amount)
  }

  @Post('setPrice/:id')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async setProductPrice(@Param('id') id: string, @Body() body:CreateProductPriceDTO, @Res() res:Response){
    const productId = await this.productService.find(id)
    const price = await this.productPriceService.set(body, productId)
    return res.json(price)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async createProduct(@Body() body:CreateProductDTO, @Res() res: Response){
    const product = await this.productService.create(body)
    return res.json(product)
  }

  @Post('addImage/:id')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @UseInterceptors(FileInterceptor('file', productImageMulterOption))
  async uploadProductFile(
    @UploadedFile() file: Express.Multer.File, 
    @Param('id') id: string, 
    @Res() res: Response)
  {
    const productId = await this.productService.find(id)
    const productImage = await this.productImages.addImage({
      imgPath: file.path,
      originalName: file.originalname,
    }, productId)
    return res.json(productImage)
  }


  @Get('img/:filename')
  @HttpCode(HttpStatus.CREATED)
  async getProductImage(@Param('filename') filepath: string, @Res({ passthrough: true }) res: Response):Promise<StreamableFile>{
    const file = createReadStream(join(process.cwd(), filepath));
    const originFileName = await this.productImages.getOriginalName(filepath)
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="${originFileName}"`,
    })
    return new StreamableFile(file);
  }

  @Get()
  @HttpCode(HttpStatus.CREATED)
  async getProductList(
    @Res() res: Response,
    @Query('page') page?:string,
    @Query('pageSize') pageSize?:string
  ){
    let parsedPage = parseInt(page)
    parsedPage = (isNaN(parsedPage) ? 1 : parsedPage)
    
    let parsedPageSize = parseInt(pageSize)
    parsedPageSize = (isNaN(parsedPageSize) ? 10 : parsedPageSize)

    const list = await this.productService.getList(parsedPage, parsedPageSize)
    return res.json(list)
  }
}
