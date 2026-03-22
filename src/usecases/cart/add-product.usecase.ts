import { CartGateway } from '@/domain/model/cart/gateway/cart.gateway';
import { CartItemGateway } from '@/domain/model/cart-item/gateway/cart-item.gateway';
import { ProductGateway } from '@/domain/model/product/gateway/product.gateway';

import { Usecase } from '../usecases';
import { QuantityError } from '@/domain/errors/quantity-error';

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
    if (!Number.isInteger(quantity))
      throw new QuantityError({
        name: 'QUANTITY_IS_NOT_POSITIVE_INTEGER_ERROR',
        message: 'Quantity must be a integer number!',
        cause: 'Quantity specified is not a integer number',
      });

    if (quantity == 0) {
      throw new QuantityError({
        name: 'QUANTITY_IS_NOT_POSITIVE_INTEGER_ERROR',
        message: 'Quantity must be a integer number greater than zero!',
        cause: 'Quantity equals zero',
      });
    }

    const availableStockQuantity =
      await this.productGateway.getAvailableStockQuantity(productId);

    let cart = await this.cartGateway.getByUserId(userId);
    if (!cart) cart = await this.cartGateway.createForUser(userId);

    const cartItem = await this.cartItemGateway.get(cart.id, productId);

    if (!cartItem) {
      await this.cartGateway.addProduct(cart.id, productId, quantity);
      return;
    }

    const newQuantity = cartItem.quantity + quantity;

    if (availableStockQuantity < newQuantity)
      throw new QuantityError({
        name: 'NOT_ENOUGH_PRODUCT_STOCK_ERROR',
        message: 'There is not enough available stock for this product',
        cause: 'Quantity is greater than the available stock',
      });
    console.log(`this is the new quantity ${newQuantity}`);
    await this.cartGateway.addProduct(cart.id, productId, newQuantity);
  }
}
