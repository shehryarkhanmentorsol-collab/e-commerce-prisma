import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guards';
import { CurrentUser } from '../common/decorators/current-user.decorators';
import { AddToCartRequestDto } from './dto/request/add-to-cart-request.dto';
import { UpdateCartItemRequestDto } from './dto/request/update-cart-item-request.dto';
import { CartResponseDto } from './dto/response/cart-response.dto';
import { AddToCartModel } from './models/add-to-cart.model';
import { RemoveCartItemModel } from './models/remove-cart.model';
import { UpdateCartItemModel } from './models/update-cart.model';

@ApiTags('Cart')
@ApiBearerAuth()
@UseGuards(JWTAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Get my cart' })
  async getCart(@CurrentUser() user: { id: string }): Promise<CartResponseDto> {
    const cart = await this.cartService.getCart(user.id);
    return CartResponseDto.fromModel(cart);
  }

  @Post('items')
  @ApiOperation({ summary: 'Add item to cart' })
  async addItem(@Body() dto: AddToCartRequestDto, @CurrentUser() user: { id: string }): Promise<CartResponseDto> {
    const model = AddToCartModel.fromDto(dto, user.id);
    const cart = await this.cartService.addItem(model);
    return CartResponseDto.fromModel(cart);
  }

   @Patch(':cartId/items/:productId')
  @ApiOperation({ summary: 'Update item quantity in cart' })
  async updateItem(
    @Param('cartId') cartId: string,
    @Param('productId') productId: string,
    @Body() dto: UpdateCartItemRequestDto,
  ): Promise<CartResponseDto> {
    const model = UpdateCartItemModel.fromDto(dto, cartId, productId);
    const cart = await this.cartService.updateItem(model);
    return CartResponseDto.fromModel(cart);
  }
 
  @Delete(':cartId/items/:productId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove item from cart' })
  async removeItem(
    @Param('cartId') cartId: string,
    @Param('productId') productId: string,
  ): Promise<CartResponseDto> {
    const model = RemoveCartItemModel.from(cartId, productId);
    const cart = await this.cartService.removeItem(model);
    return CartResponseDto.fromModel(cart);
  }
}