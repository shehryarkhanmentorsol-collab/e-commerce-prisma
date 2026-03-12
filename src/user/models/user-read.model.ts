import { UserRole } from '../enums/user.enum';

interface PrismaUser {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}

export class UserReadModel {
  static fromPrisma(data: PrismaUser): UserReadModel {
    const model = new UserReadModel();
    model.id = data.id;
    model.name = data.name;
    model.email = data.email;
    model.role = data.role as UserRole;
    model.createdAt = data.createdAt;
    return model;
  }

  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}