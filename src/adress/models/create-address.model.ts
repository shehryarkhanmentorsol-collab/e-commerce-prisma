import { Prisma } from "@prisma/client";
import { CreateAddressRequestDto } from "../dto/request/create-address-request.dto";

export class CreateAddressModel {
  static fromDto(dto: CreateAddressRequestDto, userId: string): CreateAddressModel {
    const model = new CreateAddressModel();
    model.street1 = dto.street1;
    model.street2 = dto.street2;
    model.city = dto.city;
    model.state = dto.state;
    model.postalCode = dto.postalCode;
    model.country = dto.country;
    model.isDefault = dto.isDefault ?? false;
    model.userId = userId;
    return model;
  }

  toCreateInput(): Prisma.AddressCreateInput {
    return {
      street1: this.street1,
      street2: this.street2 ?? null,
      city: this.city,
      state: this.state ?? null,
      postalCode: this.postalCode,
      country: this.country,
      isDefault: this.isDefault ?? false,
      user: { connect: { id: this.userId } },
    };
  }

  street1: string;
  street2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
  userId: string;
}
