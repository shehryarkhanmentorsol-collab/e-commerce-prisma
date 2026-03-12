import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { BaseRepository, IQueryOptions } from '../../base.repository';
import { CartReadModel } from '../../../../cart/models/cart-read.model';
import { AddToCartModel } from '../../../../cart/models/add-to-cart.model';
import { RemoveCartItemModel } from '../../../../cart/models/remove-cart.model';
import { UpdateCartItemModel } from '../../../../cart/models/update-cart.model';



const cartInclude = {
  items: {
    include: {
      product: {
        select: { id: true, name: true, price: true, stock: true },
      },
    },
  },
};


@Injectable()
export class CartRepository extends BaseRepository {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  async getOrCreateCart(userId: string, options?: IQueryOptions): Promise<any> {
    const { db } = this.parseOptions(options);
    let cart = await db.cart.findUnique({ where: { userId }, include: { items: { include: { product: true } } } });
    if (!cart) {
      cart = await db.cart.create({ data: { userId }, include: { items: { include: { product: true } } } });
    }
    return cart;
  }

  async findByUser(userId: string, options?: IQueryOptions): Promise<CartReadModel> {
    const { db } = this.parseOptions(options);
    const cart = await this.getOrCreateCart(userId, options);
    return CartReadModel.fromPrisma(cart);
  }

  async addItem(model: AddToCartModel, options?: IQueryOptions): Promise<CartReadModel> {
    const { db } = this.parseOptions(options);
    try {
      const product = await db.product.findUnique({ where: { id: model.productId } });
      if (!product) throw new NotFoundException(`Product not found`);
      if (product.stock < model.quantity) throw new BadRequestException('Insufficient stock');

      const cart = await this.getOrCreateCart(model.userId, options);
      const existingItem = await db.cartItem.findUnique({
        where: { cartId_productId: { cartId: cart.id, productId: model.productId } },
      });

      if (existingItem) {
        await db.cartItem.update({
          where: { cartId_productId: { cartId: cart.id, productId: model.productId } },
          data: { quantity: existingItem.quantity + model.quantity },
        });
      } else {
        await db.cartItem.create({
          data: { cartId: cart.id, productId: model.productId, quantity: model.quantity },
        });
      }

      return this.findByUser(model.userId, options);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Failed to add item to cart', {
        cause: new Error(`${(error as any)?.message}`),
      });
    }
  }

  
  async updateItem(model: UpdateCartItemModel, options?: IQueryOptions): Promise<CartReadModel> {
    const { db } = this.parseOptions(options);
    const item = await db.cartItem.findUnique({
      where: { cartId_productId: { cartId: model.cartId, productId: model.productId } },
    });
    if (!item) throw new NotFoundException('Cart item not found');
    await db.cartItem.update({
      where: { cartId_productId: { cartId: model.cartId, productId: model.productId } },
      data: { quantity: model.quantity },
    });
    const cart = await db.cart.findUnique({ where: { id: model.cartId }, include: cartInclude });
    if (!cart) throw new NotFoundException('Cart not found');
    return CartReadModel.fromPrisma(cart);
  }
 
  async removeItem(model: RemoveCartItemModel, options?: IQueryOptions): Promise<CartReadModel> {
    const { db } = this.parseOptions(options);
    const item = await db.cartItem.findUnique({
      where: { cartId_productId: { cartId: model.cartId, productId: model.productId } },
    });
    if (!item) throw new NotFoundException('Cart item not found');
    await db.cartItem.delete({
      where: { cartId_productId: { cartId: model.cartId, productId: model.productId } },
    });
    const cart = await db.cart.findUnique({ where: { id: model.cartId }, include: cartInclude });
    if (!cart) throw new NotFoundException('Cart not found');
    return CartReadModel.fromPrisma(cart);
  }
 
//   async clearCart(userId: string, options?: IQueryOptions): Promise<void> {
//     const { db } = this.parseOptions(options);
//     const cart = await db.cart.findUnique({ where: { userId } });
//     if (cart) await db.cartItem.deleteMany({ where: { cartId: cart.id } });
//   }
}