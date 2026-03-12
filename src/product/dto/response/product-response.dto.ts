import { ProductCategoryModel, ProductImageModel, ProductReadModel } from "../../model/product-read.model";

export class ProductResponseDto {
  static fromModel(model: ProductReadModel): ProductResponseDto {
    const dto = new ProductResponseDto();
    dto.id = model.id;
    dto.name = model.name;
    dto.description = model.description;
    dto.price = model.price;
    dto.stock = model.stock;
    dto.categoryId = model.categoryId;
    dto.category = model.category;
    dto.images = model.images;
    dto.createdAt = model.createdAt;
    return dto;
  }

  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  category: ProductCategoryModel | null;
  images: ProductImageModel[];
  createdAt: Date;
}