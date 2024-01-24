import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AdminRoleGuard } from 'src/auth/guards/admin-role/admin-role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import { SetCategoryInternalizationDTO } from './dto/set-category-internalization.dto';
import { Response } from 'express';
import { categoryImageMulterOption } from 'src/config/fileConfig';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('category')
export class CategoryController {

  constructor(private categoryService: CategoryService){}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async createProduct(@Body() body:CreateCategoryDTO, @Res() res: Response){
    const category = await this.categoryService.create(body)
    return res.json(category)
  }

  @Post('translation/:id')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async setCategoryInternalization(
    @Param('id') id: string, 
    @Body() body: SetCategoryInternalizationDTO, 
    @Res() res: Response)
  {
    const categoryId = await this.categoryService.find(id)
    const categoryTranslation = await this.categoryService.createCategoryDescription(body, categoryId)

    return res.json(categoryTranslation)
  }

  @Post('addImage/:id')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @UseInterceptors(FileInterceptor('file', categoryImageMulterOption))
  async uploadProductFile(
    @UploadedFile() file: Express.Multer.File, 
    @Param('id') id: string, 
    @Res() res: Response)
  {
    const categoryId = await this.categoryService.find(id)
    const categoryWithImg = await this.categoryService.attachFile(
      categoryId,
      file.path,
      file.originalname)
    return res.json(categoryWithImg)
  }

  @Get('img/:filename')
  @HttpCode(HttpStatus.CREATED)
  async getProductImage(@Param('filename') filepath: string, @Res({ passthrough: true }) res: Response):Promise<StreamableFile>{
    const file = createReadStream(join(process.cwd(), filepath));
    const originFileName = await this.categoryService.getOriginalName(filepath)
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="${originFileName}"`,
    })
    return new StreamableFile(file);
  }

  @Get()
  @HttpCode(HttpStatus.CREATED)
  async getCategoryList(@Res() res: Response){
    const categoryList = await this.categoryService.getList()
    return res.json(categoryList)
  }

}
