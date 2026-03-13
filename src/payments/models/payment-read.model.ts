import { PaymentStatus } from "../enums/payments.enum";

interface PrismaPayment {
  id: string;
  orderId: string;
  status: string;
  amount: number;
  method: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class PaymentReadModel {
  static fromPrisma(data: PrismaPayment): PaymentReadModel {
    const model = new PaymentReadModel();
    model.id = data.id;
    model.orderId = data.orderId;
    model.status = data.status as PaymentStatus;
    model.amount = data.amount;
    model.method = data.method;
    model.createdAt = data.createdAt;
    return model;
  }

  id: string;
  orderId: string;
  status: PaymentStatus;
  amount: number;
  method: string | null;
  createdAt: Date;
}