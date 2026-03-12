import { Prisma } from "@prisma/client";
import { CreateCategoryRequestDto } from "../dto/request/create-category-request.dto"

export class CreateCategoryModel {
  static fromDto(dto: CreateCategoryRequestDto): CreateCategoryModel {
    const model = new CreateCategoryModel();
    model.name = dto.name;
    model.description = dto.description ?? null;
    return model;
  }

  toCreateInput(): Prisma.CategoryCreateInput {
    return {
      name: this.name,
      description: this.description ?? null,
    };
  }

  name: string;
  description?: string | null;
}

