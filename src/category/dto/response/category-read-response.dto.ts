import { CategoryReadModel } from "../../models/categroy-read.model";

export class CategoryReadResponseDto {
  id: string;
  name: string;
  description?: string;

  static fromModel(model: CategoryReadModel): CategoryReadResponseDto {
    const dto = new CategoryReadResponseDto();
    dto.id = model.id;
    dto.name = model.name;
    dto.description = model.description ?? undefined;
    return dto;
  }
}