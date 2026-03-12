import { Prisma } from '@prisma/client';
import { CreateRequestProductDto } from '../dto/request/create-product-request.dto';


export class CreateProductModel {
  static fromDto(dto: CreateRequestProductDto): CreateProductModel {
    const model = new CreateProductModel();
    model.name = dto.name;
    model.description = dto.description;
    model.price = dto.price;
    model.stock = dto.stock ?? 0;
    model.categoryId = dto.categoryId;
    return model;
  }

  toCreateInput(): Prisma.ProductCreateInput {
    return {
      name: this.name,
      description: this.description,
      price: this.price,
      stock: this.stock,
      category: { connect: { id: this.categoryId } },
    };
  }

  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
}