import { Module } from '@nestjs/common';
import { ProductRepository } from './repositories/product.repositories';

@Module({
  providers: [ProductRepository],
  exports: [ProductRepository],
})
export class DatabaseProductModule {}