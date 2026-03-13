import { Module } from "@nestjs/common";
import { PaymentRepository } from "./repositories/payments.repository";


@Module({
  providers: [PaymentRepository],
  exports: [PaymentRepository],
})
export class DatabasePaymentModule {}