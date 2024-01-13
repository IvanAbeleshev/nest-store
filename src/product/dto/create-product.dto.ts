import { IsArray, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator'
import { CreateProductAmountDTO } from '../amount/dto/create-amount.dto'
import { CreateProductDescriptionDTO } from '../description/dto/create-description.dto'
import { CreateProductPriceDTO } from '../price/dto/create-price.dto'
import { Type } from 'class-transformer'

export class CreateProductDTO{
  @IsString()
  @IsNotEmpty()
  UID: string
  
  @IsOptional()
  @IsString()
  article?: string | null = null

  @IsOptional()
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => CreateProductDescriptionDTO )
  descriptions: CreateProductDescriptionDTO[] | null = null

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateProductPriceDTO)
  price: CreateProductPriceDTO | null = null

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateProductAmountDTO)
  amount: CreateProductAmountDTO | null = null
}