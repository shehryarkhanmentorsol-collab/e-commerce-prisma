interface PrismaProductImage {
  id: string;
  url: string;
  altText: string | null;
  productId: string;
  createdAt: Date;
}

interface PrismaProductCategory {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface PrismaProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
  images: PrismaProductImage[];
  category: PrismaProductCategory;
}

export class ProductImageModel {
  id: string;
  url: string;
  altText: string | null;
  productId: string;
  createdAt: Date;
}

export class ProductCategoryModel {
  id: string;
  name: string;
  description: string | null;
}

export class ProductReadModel {
  static fromPrisma(data: PrismaProduct): ProductReadModel {
    const model = new ProductReadModel();
    model.id = data.id;
    model.name = data.name;
    model.description = data.description;
    model.price = data.price;
    model.stock = data.stock;
    model.categoryId = data.categoryId;
    model.category = data.category
      ? { id: data.category.id, name: data.category.name, description: data.category.description }
      : null;
    model.images = data.images.map((img) => ({
      id: img.id,
      url: img.url,
      altText: img.altText,
      productId: img.productId,
      createdAt: img.createdAt,
    }));
    model.createdAt = data.createdAt;
    return model;
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