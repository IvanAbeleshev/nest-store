import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { languages } from 'constants/languages'

export class UpdateProductDescriptionDTO{
  @IsNotEmpty()
  @IsNumber()
  id: number

  @IsNotEmpty()
  @IsString()
  name: string
  @IsNotEmpty()
  @IsString()
  fulName: string

  @IsOptional()
  @IsString()
  description?: string | null = null  

  @IsNotEmpty()
  @IsString()
  @IsIn(languages)
  languageShortName: string
}