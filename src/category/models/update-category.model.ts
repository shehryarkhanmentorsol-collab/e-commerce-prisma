import { Prisma } from "@prisma/client";
import { UpdateCategoryRequestDto } from "../dto/request/update-category-request.dto";

export class UpdateCategoryModel {
  static fromDto(dto: UpdateCategoryRequestDto, id: string): UpdateCategoryModel {
    const model = new UpdateCategoryModel();
    model.id = id;
    model.name = dto.name;
    model.description = dto.description;
    return model;
  }

  toUpdateInput(): Prisma.CategoryUpdateInput {
    return {
      ...(this.name !== undefined && { name: this.name }),
      ...(this.description !== undefined && { description: this.description }),
    };
  }

  id: string;
  name?: string;
  description?: string;
}