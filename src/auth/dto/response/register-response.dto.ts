export class RegisterResponseDto {
  static fromModel(model: { id: string }): RegisterResponseDto {
    const dto = new RegisterResponseDto();
    dto.id = model.id;
    return dto;
  }

  id: string;
}