interface PrismaCartProduct {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface PrismaCartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  product: PrismaCartProduct;
}

interface PrismaCart {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  items: PrismaCartItem[];
}

export class CartProductModel {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export class CartItemModel {
  id: string;
  productId: string;
  quantity: number;
  product: CartProductModel;
}

export class CartReadModel {
  static fromPrisma(data: PrismaCart): CartReadModel {
    const model = new CartReadModel();
    model.id = data.id;
    model.userId = data.userId;
    model.items = data.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      product: {
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        stock: item.product.stock,
      },
    }));
    model.total = model.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
    return model;
  }

  id: string;
  userId: string;
  items: CartItemModel[];
  total: number;
}