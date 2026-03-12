import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { UserReadModel } from "../../../../user/models/user-read.model";
import { PrismaService } from "../../prisma.service";
import { BaseRepository, IQueryOptions } from "../../base.repository";
import { RegisterModel } from "../../../../auth/models/register.model";
import * as bcrypt from 'bcrypt';


interface PrismaUserWithPassword {
  id: string;
  password: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}



@Injectable()
export class UserRepository extends BaseRepository {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  async findByEmail(
    email: string,
    options?: IQueryOptions,
  ): Promise<any> {
    const { db } = this.parseOptions(options);
    return db.user.findUnique({ where: { email } });
  }

  async findAll(options?: IQueryOptions): Promise<UserReadModel[]> {
    const { db } = this.parseOptions(options);
    const users = await db.user.findMany({
    });
    return users.map((u) => UserReadModel.fromPrisma(u));
  }

  async create(
    model: RegisterModel,
    options?: IQueryOptions,
  ): Promise<UserReadModel> {
    const { db } = this.parseOptions(options);

    try {
      const existingUser = await this.findByEmail(model.email);
      if (existingUser) {
        throw new BadRequestException('Email already in use');
      }

      if (!model.password) {
        throw new BadRequestException('Password is required');
      }

      const hashedPassword = await bcrypt.hash(model.password, 10);

      const result = await db.user.create({
        data: {
          name: model.name,
          email: model.email,
          password: hashedPassword,
          role: model.role,
        },
      });

      return UserReadModel.fromPrisma(result);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create user', {
        cause: new Error(`Error creating user: ${error instanceof Error ? error.message : String(error)}`),
      });
    }
  }

  async validatePassword(
    user: PrismaUserWithPassword,
    plainPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, user.password);
  }
}