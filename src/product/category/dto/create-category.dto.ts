import { Type } from 'class-transformer'
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator'
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
}