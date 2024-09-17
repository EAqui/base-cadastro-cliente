import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { AuthUser } from "../model/auth-user";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
      private jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Usuário sem permissão');
    }
    const payload = await this.jwtService.verifyAsync<AuthUser>(token, {
        secret: process.env.JWT_SECRET,
    });
    request['user'] = payload;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    if(!request.headers.authorization) {
        return undefined;
    }
    const [type, token] = request.headers.authorization.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}