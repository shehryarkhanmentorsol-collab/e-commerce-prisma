import { OrderStatus } from "../../enums/order.enum";
import { OrderAddressModel, OrderItemModel, OrderPaymentModel, OrderReadModel } from "../../models/order-read.model";

export class OrderResponseDto {
  static fromModel(model: OrderReadModel): OrderResponseDto {
    const dto = new OrderResponseDto();
    dto.id = model.id;
    dto.userId = model.userId;
    dto.status = model.status;
    dto.total = model.total;
    dto.items = model.items;
    dto.address = model.address;
    dto.payment = model.payment;
    dto.createdAt = model.createdAt;
    return dto;
  }

  id: string;
  userId: string;
  status: OrderStatus;
  total: number;
  items: OrderItemModel[];
  address: OrderAddressModel;
  payment: OrderPaymentModel | null;
  createdAt: Date;
}