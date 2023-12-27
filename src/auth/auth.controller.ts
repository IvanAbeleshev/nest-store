import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleOauthGuard } from './guards/google-oauth/google-oauth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {

  constructor(private authService:AuthService) {}

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async auth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    
    await this.authService.signInGoogle(req.user);
    console.log('sign in is well')
    // maybe i will generate own token and add to cookie
    // here i need redirect to frontend
    return res.redirect('https://ukr.net')
  }
}
