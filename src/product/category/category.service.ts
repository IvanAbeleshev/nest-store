import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { SetCategoryInternalizationDTO } from './dto/set-category-internalization.dto';

@Injectable()
export class CategoryService {

  constructor(private prisma: PrismaService){}

  private async createCategoryDescriptions(descriptionsDTO: SetCategoryInternalizationDTO[], categoryID:number){
    const description = await this.prisma.productCategoryInternalization.createMany({
      data:descriptionsDTO.map(el=>(
        {
          ...el, 
          productCategoryId: categoryID
        }
      ))
    })
  }

  async createCategoryDescription(descriptionDTO: SetCategoryInternalizationDTO, categoryID:number){
    const description = await this.prisma.productCategoryInternalization.create({
      data:{
        ...descriptionDTO,
        productCategoryId: categoryID
      }
    })

    return description
  }

  async create(categoryDTO: CreateCategoryDTO){
    const category = await this.prisma.productCategory.create({
      data:{
        UID: categoryDTO.UID
      }
    })

    if(categoryDTO.descriptions){
      this.createCategoryDescriptions(categoryDTO.descriptions, category.id)
    }

    return category
  }

  async find(idOrUID:string):Promise<number>{
    let id = null
    try{
      id = Number(idOrUID)
    }catch(error){

    }
    const product = await this.prisma.productCategory.findFirst({
      where:{
        OR:[
          {id},
          {UID: idOrUID}
        ]
      }
    })

    if(!product){
      throw new BadRequestException('product category does not exist')
    }
    
    return product.id
  }

  async attachFile(categoryId:number, imgPath: string, originalName){
    const attachedFile = await this.prisma.productCategory.update({
      data:{
        originalName,
        imgPath
      },
      where:{
        id: categoryId
      }
    })

    return attachedFile
  }

  async getOriginalName(imgPath:string){
    const img = await this.prisma.productCategory.findFirst({
      where:{
        imgPath
      }
    })

    return img.originalName
  }

  async getList(){
    const categoryList = await this.prisma.productCategory.findMany({
      include:{
        translations:{}
      }
    })

    return categoryList
  }
}
