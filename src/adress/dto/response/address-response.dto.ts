import { AddressReadModel } from "../../models/address-read.model";

export class AddressResponseDto {
  static fromModel(model: AddressReadModel): AddressResponseDto {
    const dto = new AddressResponseDto();
    dto.id = model.id;
    dto.street1 = model.street1;
    dto.street2 = model.street2;
    dto.city = model.city;
    dto.state = model.state;
    dto.postalCode = model.postalCode;
    dto.country = model.country;
    dto.isDefault = model.isDefault;
    dto.createdAt = model.createdAt;
    return dto;
  }
  id: string;
  street1: string;
  street2: string | null;
  city: string;
  state: string | null;
  postalCode: string;
  country: string;
  isDefault: boolean;
  createdAt: Date;
}