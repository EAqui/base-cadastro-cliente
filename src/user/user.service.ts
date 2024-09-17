import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { UserRepository } from './repositories/user.repository';
import { isMatch } from 'src/utils/bcrypt/isMatch';
import { AuthService } from 'src/auth/auth.service';
import { GetTokenDto } from './dto/get-token.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly authService: AuthService,
    ) {}

    async signin(signinDto: SigninDto): Promise<GetTokenDto> {
        const { email, password } = signinDto;
        const user = await this.userRepository.findUserByUser(email);
        if(!user) {
            throw new HttpException('Acesso negado', HttpStatus.FORBIDDEN);
        }
        const passwordMatch = await isMatch(password, user.password);
        if(!passwordMatch) {
            throw new HttpException('Acesso negado', HttpStatus.FORBIDDEN);
        }
        const token = await this.authService.generateToken(user.id);
        return new GetTokenDto(token);
    }
}
