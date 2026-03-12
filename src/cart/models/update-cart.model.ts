import { UpdateCartItemRequestDto } from '../dto/request/update-cart-item-request.dto';

export class UpdateCartItemModel {
  static fromDto(dto: UpdateCartItemRequestDto, cartId: string, productId: string): UpdateCartItemModel {
    const model = new UpdateCartItemModel();
    model.cartId = cartId;
    model.productId = productId;
    model.quantity = dto.quantity;
    return model;
  }

  cartId: string;
  productId: string;
  quantity: number;
}