import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { DatabasePaymentModule } from '../common/database/payments/database.payments.module';

@Module({
  imports: [DatabasePaymentModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentModule {}