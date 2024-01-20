import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { diskStorage } from 'multer'
import {v4 as uuidv4} from 'uuid'

const getConfigByPath = (path:string): MulterOptions => {
  return {
    storage: diskStorage({
      destination: path,
      filename: (req, file, cb)=>{
        const arrayFileName = file.originalname.split('.')
        cb(undefined, `${uuidv4()}.${arrayFileName.pop()}`)
      }
    }),
  
  }
}

const productImageMulterOption = getConfigByPath('./media/productImages/')
const categoryImageMulterOption = getConfigByPath('./media/CategoryImages/')

export { 
  productImageMulterOption,
  categoryImageMulterOption
}