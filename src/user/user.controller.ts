import { Body, Controller, Post } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { UserService } from './user.service';
import { GetTokenDto } from './dto/get-token.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Post('/signin')
    async login(
        @Body() body: SigninDto
    ): Promise<GetTokenDto> {
        return await this.userService.signin(body);
    }
}
