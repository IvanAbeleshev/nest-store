import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAuthPayload } from 'src/interfaces';
import { UserService } from 'src/user/user.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    private userService: UserService
  ) {
    super({
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.key'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: IAuthPayload) {
    const user = await this.userService.findUserById(payload.id);

    if (!user) throw new UnauthorizedException('Please log in to continue');

    return payload;
  }
}