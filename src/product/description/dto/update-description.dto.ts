export class UpdateProductDescriptionDTO{
  id: number
  name: string
  fulName: string
  description?: string | null = null  
  languageShortName: string
  producId: number
}