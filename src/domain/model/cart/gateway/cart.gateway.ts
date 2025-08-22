import { Cart } from "../entity/cart"

export interface CartGateway{
    save(cart : Cart) : Promise<void>;
    getByUserId(userId : string) : Promise<Cart | null>
}