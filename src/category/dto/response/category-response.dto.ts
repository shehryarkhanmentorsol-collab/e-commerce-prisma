export class CategoryResponseDto {
  id: string;

  static fromId(id: string): CategoryResponseDto {
    const dto = new CategoryResponseDto();
    dto.id = id;
    return dto;
  }
}
