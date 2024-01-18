import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { diskStorage } from 'multer'
import {v4 as uuidv4} from 'uuid'

const productImageMulterOption: MulterOptions = {
  storage: diskStorage({
    destination: './media/uploads/',
    filename: (req, file, cb)=>{
      const arrayFileName = file.originalname.split('.')
      cb(undefined, `${uuidv4()}.${arrayFileName.pop()}`)
    }
  }),

}

export { productImageMulterOption }