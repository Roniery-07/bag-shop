import { CartItem } from "../entity/cart-item";

export interface CartItemGateway{
    // save(cart: CartItem) : Promise<void>;
    listCartItemsByUserId(userId: string) : Promise<CartItem[]>
    // get(cartId: string, productId: string) : Promise<CartItem>
}