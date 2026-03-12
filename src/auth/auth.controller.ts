import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterRequestDto } from "./dto/request/register-request.dto";
import { RegisterResponseDto } from "./dto/response/register-response.dto";
import { RegisterModel } from "./models/register.model";
import { LoginRequestDto } from "./dto/request/login-request.dto";
import { LoginResponseDto } from "./dto/response/login-response.dto";
import { LoginModel } from "./models/login.model";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() registerDto: RegisterRequestDto): Promise<RegisterResponseDto> {
        const registeModel = RegisterModel.fromDto(registerDto);
        const result  = await this.authService.register(registeModel);
        return RegisterResponseDto.fromModel(result);
    }

    @Post('login')
    async login(@Body()loginDto: LoginRequestDto): Promise<LoginResponseDto> {
        const loginModel = LoginModel.fromDto(loginDto);
        const result = await this.authService.login(loginModel);
        return LoginResponseDto.fromModel(result);
    }
    
}
