import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { languages } from 'constants/languages'

export class SetCategoryInternalizationDTO{
  @IsNotEmpty()
  @IsString()
  title: string
  
  @IsOptional()
  @IsString()
  description?: string | null = null

  @IsNotEmpty()
  @IsString()
  @IsIn(languages)
  languageShortName: string

}