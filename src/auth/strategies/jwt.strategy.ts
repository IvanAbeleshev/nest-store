import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from '../../config/authConfig';
import { IAuthPayload } from 'src/interfaces';
import { UserService } from 'src/user/user.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigType<typeof config>,
    private userService: UserService
  ) {
    const extractJwtFromCookie = (req) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies['access_token'];
      }
      return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    };

    super({
      ignoreExpiration: false,
      secretOrKey: configService.jwt.key,
      jwtFromRequest: extractJwtFromCookie,
    });
  }

  async validate(payload: IAuthPayload) {
    const user = await this.userService.findUserById(payload.id);

    if (!user) throw new UnauthorizedException('Please log in to continue');

    return {
      id: payload.id,
      email: payload.email,
    };
  }
}