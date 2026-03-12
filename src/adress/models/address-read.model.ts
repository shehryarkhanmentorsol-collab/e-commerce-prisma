interface PrismaAddress {
  id: string;
  street1: string;
  street2: string | null;
  city: string;
  state: string | null;
  postalCode: string;
  country: string;
  isDefault: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class AddressReadModel {
  static fromPrisma(data: PrismaAddress): AddressReadModel {
    const model = new AddressReadModel();
    model.id = data.id;
    model.street1 = data.street1;
    model.street2 = data.street2;
    model.city = data.city;
    model.state = data.state;
    model.postalCode = data.postalCode;
    model.country = data.country;
    model.isDefault = data.isDefault;
    model.userId = data.userId;
    model.createdAt = data.createdAt;
    return model;
  }

  id: string;
  street1: string;
  street2: string | null;
  city: string;
  state: string | null;
  postalCode: string;
  country: string;
  isDefault: boolean;
  userId: string;
  createdAt: Date;
}