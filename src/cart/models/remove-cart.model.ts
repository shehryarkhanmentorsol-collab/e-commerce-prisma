export class RemoveCartItemModel {
  static from(cartId: string, productId: string): RemoveCartItemModel {
    const model = new RemoveCartItemModel();
    model.cartId = cartId;
    model.productId = productId;
    return model;
  }

  cartId: string;
  productId: string;
}