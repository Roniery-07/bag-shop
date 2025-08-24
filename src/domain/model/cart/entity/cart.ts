import { CartItem } from "../../cart-item/entity/cart-item";
import { Product } from "../../product/entity/product";

export type CartProps = {
    id: string,
    userId: string
    cartItems? : CartItem[]
}

export class Cart{
    private constructor(private props : CartProps){}

    public static create(userId: string){
        return new Cart({
            id: crypto.randomUUID().toString(),
            userId,
            cartItems: []
        });
    }

    // usado dentro do dominio da aplicacao
    public static with(props : CartProps){
        return new Cart(props)
    }
    
    public addProduct(product: Product, quantity: number){
        const cartItem = CartItem.create(this.props.id, product, quantity)
        this.props.cartItems?.push(cartItem);
    }
    
    public get id(){
        return this.props.id
    }

    public get userId(){
        return this.props.userId
    }

}