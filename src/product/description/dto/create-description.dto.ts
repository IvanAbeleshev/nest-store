export class CreateProductDescriptionDTO{
  name: string
  fullName: string
  description?: string | null = null  
  languageShortName: string
}