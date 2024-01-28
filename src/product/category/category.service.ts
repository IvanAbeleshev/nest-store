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
    let category
    try{
       category = await this.prisma.productCategory.create({
        data:{
          UID: categoryDTO.UID,
          parent:{
            connect: {
              //@ts-ignore
              id: categoryDTO.parent
            }
          }
        }
      })
    }catch(error){
      throw new BadRequestException(`Category with UID: ${categoryDTO.UID} already exist`)
    }

    if(categoryDTO.descriptions){
      this.createCategoryDescriptions(categoryDTO.descriptions, category.id)
    }

    return category
  }

  async find(idOrUID:string):Promise<number>{
    let where
    if(/^\d+$/.test(idOrUID)){
      where = {
        id: Number(idOrUID)
      }
    }else{
      where = {
        UID: idOrUID
      }
    }

    const product = await this.prisma.productCategory.findFirst({
      where
    })

    if(!product){
      throw new BadRequestException('product category does not exist')
    }
    
    return product.id
  }

  async attachFile(categoryId:number, imgPath: string, originalName:string){
    const attachedFile = await this.prisma.images.create({
      data:{
        imgPath,
        originalName,
        categoryId
      }
    })

    return attachedFile
  }

  async getList(){
    const categoryList = await this.prisma.productCategory.findMany({
      include:{
        translations:{},
        image:{},
        parent:{}
      }
    })

    return categoryList
  }
}
