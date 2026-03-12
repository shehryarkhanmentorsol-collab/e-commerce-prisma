import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CartRepository } from '../common/database/cart/repositories/cart.repository';
import { CartReadModel } from './models/cart-read.model';
import { AddToCartModel } from './models/add-to-cart.model';
import { UpdateCartItemModel } from './models/update-cart.model';
import { RemoveCartItemModel } from './models/remove-cart.model';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async getCart(userId: string): Promise<CartReadModel> {
    try { return await this.cartRepository.findByUser(userId); }
    catch (error) { throw new InternalServerErrorException('Failed to retrieve cart'); }
  }

  async addItem(model: AddToCartModel): Promise<CartReadModel> {
    try { return await this.cartRepository.addItem(model); }
    catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Failed to add item to cart');
    }
  }



  async updateItem(model: UpdateCartItemModel): Promise<CartReadModel> {
    try {
      return await this.cartRepository.updateItem(model);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to update cart item');
    }
  }
 
  async removeItem(model: RemoveCartItemModel): Promise<CartReadModel> {
    try {
      return await this.cartRepository.removeItem(model);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to remove cart item');
    }
  }
}