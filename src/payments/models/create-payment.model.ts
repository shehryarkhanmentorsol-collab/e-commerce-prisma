import { CreatePaymentRequestDto } from "../dto/request/create-payment-request.dto";

export class CreatePaymentModel {
  static fromDto(dto: CreatePaymentRequestDto): CreatePaymentModel {
    const model = new CreatePaymentModel();
    model.orderId = dto.orderId;
    model.method = dto.method;
    return model;
  }
  orderId: string;
  method?: string;
}