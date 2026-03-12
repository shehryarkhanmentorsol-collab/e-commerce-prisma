import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";


export interface JwtPayload {
    userId: string;
    email: string;
    role: string;
}

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') || 'default-secret-key',
        });
    }

    async validate(payload: JwtPayload) {
        if(!payload.userId){
            throw new UnauthorizedException('Invalid token payload');
        }
    return { id: payload.userId, email: payload.email, role: payload.role };    
    }

}