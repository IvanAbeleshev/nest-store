import { Type } from 'class-transformer'
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import { SetCategoryInternalizationDTO } from './set-category-internalization.dto'

export class CreateCategoryDTO{
  @IsNotEmpty()
  @IsString()
  UID:string

  @IsOptional()
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => SetCategoryInternalizationDTO )
  descriptions?: SetCategoryInternalizationDTO[] | null = null

  @IsOptional()
  @IsString()
  parent?: string | number | null = null
}