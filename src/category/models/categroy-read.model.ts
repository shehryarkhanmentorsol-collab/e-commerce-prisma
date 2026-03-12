interface PrismaCategory {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class CategoryReadModel {
  static fromPrisma(data: PrismaCategory): CategoryReadModel {
    const model = new CategoryReadModel();
    model.id = data.id;
    model.name = data.name;
    model.description = data.description;
    model.createdAt = data.createdAt;
    return model;
  }

  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
}