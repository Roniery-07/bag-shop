import { Cart } from "../entity/cart"

export interface CartGateway{
    save(cart : Cart) : Promise<void>;
    createForUser(userId : string) : Promise<Cart>
    get(cartId: string) : Promise<Cart | null>
    getByUserId(userId : string) : Promise<Cart | null>
    addProduct(userId: string, productId: string, quantity: number) : Promise<void>     
}