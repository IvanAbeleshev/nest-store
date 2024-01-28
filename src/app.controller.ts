import { Controller, Get, HttpCode, HttpStatus, Param, Res, StreamableFile } from '@nestjs/common'
import { AppService } from './app.service'
import { Response } from 'express'
import { createReadStream } from 'fs'
import { join } from 'path'
import { ImagesService } from './images/images.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private imagesService: ImagesService
  ) {}

  @Get('img/:filename')
  @HttpCode(HttpStatus.CREATED)
  async getProductImage(@Param('filename') filepath: string, @Res({ passthrough: true }) res: Response):Promise<StreamableFile>{
    const file = createReadStream(join(process.cwd(), filepath))
    const originFileName = await this.imagesService.getOriginalName(filepath)
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="${originFileName}"`,
    })
    return new StreamableFile(file);
  }

}
