import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { DatabaseAddressModule } from '../common/database/adress/database-address.module';

@Module({
  imports: [DatabaseAddressModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}