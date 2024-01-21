import { Body, Controller, HttpCode, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { AdminRoleGuard } from 'src/auth/guards/admin-role/admin-role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import { SetCategoryInternalizationDTO } from './dto/set-category-internalization.dto';

@Controller('category')
export class CategoryController {

  constructor(private categoryService: CategoryService){}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async createProduct(@Body() body:CreateCategoryDTO, @Res() res: Response){
    const category = await this.categoryService.create(body)
    return res.json()
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

    return res.json()
  }
}
