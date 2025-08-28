
import { CartItem } from "@/domain/model/cart-item/entity/cart-item";
import { Usecase } from "../usecases";
import { CartItemGateway } from "@/domain/model/cart-item/gateway/cart-item.gateway";

export type ListCartItemByUserIdInputDto = {
    userId: string
}

export type ListCartItemByUserIdOutputDto = {
    cartId: string,
    quantity: number,
    product: {
        id: string;
        name: string;
        price: number;
        quantity: number;
        image: {
            id: string;
            url: string;
            alt: string;
            order: number;
        }
    }
}[]

export class ListCartItemByUserIdUsecase implements Usecase<ListCartItemByUserIdInputDto, ListCartItemByUserIdOutputDto>{
    private constructor(private readonly cartItemGateway: CartItemGateway){}

    public static create(cartItemGateway: CartItemGateway){
        return new ListCartItemByUserIdUsecase(cartItemGateway)
    }

    public async execute({userId}: ListCartItemByUserIdInputDto): Promise<ListCartItemByUserIdOutputDto> {
        const data = await this.cartItemGateway.listCartItemsByUserId(userId);
        
        return this.presentOutput(data);
    }

    private presentOutput(data: CartItem[]) : ListCartItemByUserIdOutputDto{
        return data.map(i => ({
            cartId: i.cartId,
            quantity: i.quantity,
            product: {
                id: i.product.id,
                name: i.product.name,
                price: i.product.price,
                quantity: i.product.quantity,
                image: {
                    id: i.product.images.at(0)!.id,
                    url: i.product.images.at(0)!.url,
                    alt: i.product.images.at(0)!.alt,
                    order: i.product.images.at(0)!.order,
                }, 
            }
        })        
    )}

}