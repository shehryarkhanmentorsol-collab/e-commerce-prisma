import { Module } from '@nestjs/common';
import { AddressRepository } from './repositories/address.repository';

@Module({
  providers: [AddressRepository],
  exports: [AddressRepository],
})
export class DatabaseAddressModule {}