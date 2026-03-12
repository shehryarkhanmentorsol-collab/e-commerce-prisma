import { AddToCartRequestDto } from "../dto/request/add-to-cart-request.dto";

export class AddToCartModel {
  static fromDto(dto: AddToCartRequestDto, userId: string): AddToCartModel {
    const model = new AddToCartModel();
    model.productId = dto.productId;
    model.quantity = dto.quantity ?? 1;
    model.userId = userId;
    return model;
  }
  productId: string;
  quantity: number;
  userId: string;
}