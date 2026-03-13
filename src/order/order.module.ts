import { Module } from '@nestjs/common';
import { OrderCOntroller } from './order.controller';
import { OrderService } from './order.service';
import { DatabaseOrderModule } from '../common/database/order/database-order.module';

@Module({
  imports: [DatabaseOrderModule],
  controllers: [OrderCOntroller],
  providers: [OrderService],
})
export class OrderModule {}