import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { AuthUser } from "./model/auth-user";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
    ) {}

    async generateToken(
      id: string,
    ): Promise<string> {
      if(!id) {
        throw new NotFoundException('Nenhum dado foi informado para gerar a autenticação');
      }
      const optionJwt: JwtSignOptions = {
        secret: process.env.JWT_SECRET
      }
      const dataToken: AuthUser = {
        id,
      }
      const token = await this.jwtService.signAsync(dataToken, optionJwt);
      return `Bearer ${token}`;
    }
}