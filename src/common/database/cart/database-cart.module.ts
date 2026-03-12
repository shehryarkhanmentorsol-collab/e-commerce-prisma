import { Module } from '@nestjs/common';
import { CartRepository } from './repositories/cart.repository';

@Module({
  providers: [CartRepository],
  exports: [CartRepository],
})
export class DatabaseCartModule {}