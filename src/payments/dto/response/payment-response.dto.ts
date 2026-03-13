import { PaymentReadModel } from '../../models/payment-read.model';
import { PaymentStatus } from '../../enums/payments.enum';
export class PaymentResponseDto {
  static fromModel(model: PaymentReadModel): PaymentResponseDto {
    const dto = new PaymentResponseDto();
    dto.id = model.id;
    dto.orderId = model.orderId;
    dto.status = model.status;
    dto.amount = model.amount;
    dto.method = model.method;
    dto.createdAt = model.createdAt;
    return dto;
  }
  id: string;
  orderId: string;
  status: PaymentStatus;
  amount: number;
  method: string | null;
  createdAt: Date;
}