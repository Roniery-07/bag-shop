import { CartGateway } from '@/domain/model/cart/gateway/cart.gateway';
import { CartItemGateway } from '@/domain/model/cart-item/gateway/cart-item.gateway';
import { ProductGateway } from '@/domain/model/product/gateway/product.gateway';

import { Usecase } from '../usecases';

export type AddProductInputDto = {
  userId: string;
  productId: string;
  quantity: number;
};

export type AddProductOutputDto = void;

export class AddToCartUsecase
  implements Usecase<AddProductInputDto, AddProductOutputDto>
{
  private constructor(
    private readonly cartGateway: CartGateway,
    private readonly productGateway: ProductGateway,
    private readonly cartItemGateway: CartItemGateway,
  ) {}

  public static create(
    cartGateway: CartGateway,
    productGateway: ProductGateway,
    cartItemGateway: CartItemGateway,
  ) {
    return new AddToCartUsecase(cartGateway, productGateway, cartItemGateway);
  }

  public async execute({
    userId,
    productId,
    quantity,
  }: AddProductInputDto): Promise<AddProductOutputDto> {
    try {
      if (!Number.isInteger(quantity))
        throw new Error('Quantity must be a integer');

      if (quantity == 0) {
        throw new Error('Quantity must be a number greater than 0');
      }

      const availableStockQuantity =
        await this.productGateway.getAvailableStockQuantity(productId);

      if (availableStockQuantity < quantity)
        throw new Error("We don't have this quantity available");

      let cart = await this.cartGateway.getByUserId(userId);
      if (!cart) cart = await this.cartGateway.createForUser(userId);

      const cartItem = await this.cartItemGateway.get(cart.id, productId);

      if (!cartItem) {
        await this.cartGateway.addProduct(cart.id, productId, quantity);
        return;
      }

      const newQuantity = cartItem.quantity + quantity;

      console.log(`this is the new quantity ${newQuantity}`);
      await this.cartGateway.addProduct(cart.id, productId, newQuantity);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
