import { Product } from "../../product/entity/product"

export type Props = {
    cartId: string,
    product: Product,
    quantity: number,
}

export class CartItem{
    private constructor(private props : Props){}

    public static create(cartId: string, product: Product, quantity: number){
        if(!Number.isInteger(quantity) || quantity <= 0)
            throw new Error("Quantity must be a positive integer.")

        return new CartItem({
            cartId,
            product,
            quantity,
        })
    }
    //geralmente usado quando buscamos o item do banco, e transformamos em uma entidade
    public static with(props: Props){
        return new CartItem(props)
    }

    public increaseQuantity(value : number){
        if(!Number.isInteger(value) || value < 0){
            throw new Error("Quantity must be a positive integer.")                
        }

        this.props.quantity = this.props.quantity + value;
    }

    public decreaseQuantity(value: number){
        if(!Number.isInteger(value) || value < 0 ){
            throw new Error("Quantity must be a positive integer.")                
        }

        this.props.quantity = this.props.quantity - value;
    }

    public get cartId(){
        return this.props.cartId;
    }
    public get product(){
        return this.props.product;
    }
    public get quantity(){
        return this.props.quantity;
    }

    public set quantity(newQt: number){
        if(!Number.isInteger(newQt) || newQt < 0 ){
            throw new Error("Quantity must be a positive integer.")                
        }
        this.props.quantity = newQt
    }
}