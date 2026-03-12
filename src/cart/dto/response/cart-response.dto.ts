import { CartReadModel } from '../../models/cart-read.model';

export class CartResponseDto {
  static fromModel(model: CartReadModel): CartResponseDto {
    const dto = new CartResponseDto();
    dto.id = model.id;
    dto.userId = model.userId;
    dto.items = model.items;
    dto.total = model.total;
    return dto;
  }
  id: string;
  userId: string;
  items: any[];
  total: number;
}