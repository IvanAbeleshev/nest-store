import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { diskStorage } from 'multer'

const productImageMulterOption: MulterOptions = {
  storage: diskStorage({
    destination: './media/uploads/',
  }),

}

export { productImageMulterOption }