import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service';
import { ProductModule } from './product/product.module';
import authConfig from './config/authConfig'
import { ImagesService } from './images/images.service'

@Module({
  imports: [
    AuthModule, 
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
      load: [authConfig]
    }), 
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, ImagesService],
})
export class AppModule {}
