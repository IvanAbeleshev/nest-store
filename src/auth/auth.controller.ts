import { Body, Controller, Get, Headers, Post, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleOauthGuard } from './guards/google-oauth/google-oauth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CredentialSigninDTO } from './dto/credential-sign-in.dto';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { RefreshTokenGuard } from './guards/refresh-jwt/refresh-jwt.guard';
import { IAuthPayload } from 'src/interfaces';

@Controller('auth')
export class AuthController {

  constructor(private authService:AuthService) {}

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async auth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    
    const tokens = await this.authService.signInGoogle(req.user);
    // maybe i will generate own token and add to cookie
    res.cookie('access_token', tokens.access_token)
    return res.redirect('http://localhost:3000/uk')
  }

  @Post('signin')
  signIn(@Body() signinDto:CredentialSigninDTO) {
    return this.authService.signIn(signinDto)
  }

  @Post('signUp')
  signUp(@Body() createUser: CreateUserDTO) {
    return this.authService.signUp(createUser)
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  refresh(@Req() req){
    return this.authService.getTokens({
      email: req.user.email,
      id: req.user.id,
      role: req.user.role
    })

  }
}
