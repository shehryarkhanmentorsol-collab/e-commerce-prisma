import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AddressRepository } from '../common/database/adress/repositories/address.repository';
import { AddressReadModel } from './models/address-read.model';
import { CreateAddressModel } from './models/create-address.model';
import { UpdateAddressModel } from './models/update-address.model';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}

  async create(model: CreateAddressModel): Promise<AddressReadModel> {
    try { return await this.addressRepository.create(model); }
    catch (error) { throw new InternalServerErrorException('Failed to create address'); }
  }

  async findByUser(userId: string): Promise<AddressReadModel[]> {
    try { return await this.addressRepository.findByUser(userId); }
    catch (error) { throw new InternalServerErrorException('Failed to retrieve addresses'); }
  }

  async update(model: UpdateAddressModel, userId: string): Promise<AddressReadModel> {
    try { return await this.addressRepository.update(model, userId); }
    catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) throw error;
      throw new InternalServerErrorException('Failed to update address');
    }
  }

  async delete(id: string, userId: string): Promise<void> {
    try { await this.addressRepository.delete(id, userId); }
    catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) throw error;
      throw new InternalServerErrorException('Failed to delete address');
    }
  }
}