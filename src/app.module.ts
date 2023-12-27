import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service';
import authConfig from './config/authConfig'

@Module({
  imports: [AuthModule, 
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
      load: [authConfig]
    })
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
