import { Module } from "@nestjs/common";
import { OrderRepository } from "./repositories/order.repository";



@Module({
  providers: [OrderRepository],
  exports: [OrderRepository],
})
export class DatabaseOrderModule {}