import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import e from "express";
import { RegisterModel } from "./models/register.model";
import { LoginModel } from "./models/login.model";
import { UserRepository } from "../common/database/user/repository/user.repository";

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) {}

    async register(model: RegisterModel): Promise<{id:string}> {
        try {
            const user = await this.userRepository.create(model);
            return { id: user.id };
        } catch (error) {
             console.error('Register error:', error);
            if(error instanceof BadRequestException){
                throw error;
            }
            throw new InternalServerErrorException('Failed to register user');
        }
    }

    async login(model: LoginModel): Promise<LoginModel> {
        try {
            const user = await this.userRepository.findByEmail(model.email);

            if(!user){
                throw new BadRequestException('Invalid email or password');
            }

            if(!model.password) {
                throw new BadRequestException('Password is required');
            }

            const isPasswordValid = await this.userRepository.validatePassword(user, model.password);

            if(!isPasswordValid){
                throw new BadRequestException('Invalid email or password');
            }

            const payload = { userId: user.id, email: user.email, role: user.role };

            const result = new LoginModel();
            result.email = user.email;
            result.accessToken = this.jwtService.sign(payload);

            return result;

        } catch (error) {
            if(error instanceof BadRequestException){
                throw error;
        }
            throw new InternalServerErrorException('Failed to login');
      }
    }
}