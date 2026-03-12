import { Prisma } from '@prisma/client';
import { UpdateAddressRequestDto } from '../dto/request/update-address-request.dto';

export class UpdateAddressModel {
  static fromDto(dto: UpdateAddressRequestDto, id: string): UpdateAddressModel {
    const model = new UpdateAddressModel();
    model.id = id;
    model.street1 = dto.street1;
    model.street2 = dto.street2;
    model.city = dto.city;
    model.state = dto.state;
    model.postalCode = dto.postalCode;
    model.country = dto.country;
    model.isDefault = dto.isDefault;
    return model;
  }

  toUpdateInput(): Prisma.AddressUpdateInput {
    return {
      ...(this.street1 !== undefined && { street1: this.street1 }),
      ...(this.street2 !== undefined && { street2: this.street2 }),
      ...(this.city !== undefined && { city: this.city }),
      ...(this.state !== undefined && { state: this.state }),
      ...(this.postalCode !== undefined && { postalCode: this.postalCode }),
      ...(this.country !== undefined && { country: this.country }),
      ...(this.isDefault !== undefined && { isDefault: this.isDefault }),
    };
  }

  id: string;
  street1?: string;
  street2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  isDefault?: boolean;
}