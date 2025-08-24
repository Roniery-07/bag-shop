import { CartItemGateway } from "@/domain/model/cart-item/gateway/cart-item.gateway";
import { Usecase } from "../usecases";
import { CartItem } from "@/domain/model/cart-item/entity/cart-item";
import { Product } from "@/domain/model/product/entity/product";

export type CreateCartItemInputDto = {
    cartId: string,
    product: Product,
    quantity: number
}

export type CreateCartItemOutputDto = void;


export class CreateCartItemUsecase implements Usecase<CreateCartItemInputDto, CreateCartItemOutputDto>{
    private constructor(private readonly cartItemGateway : CartItemGateway){}

    public static create(cartItemGateway : CartItemGateway){
        return new CreateCartItemUsecase(cartItemGateway);
    }

    public async execute({
        cartId,
        product,
        quantity
    }: CreateCartItemInputDto): Promise<void> {
        

        const cartItem = CartItem.create(cartId, product, quantity)
        await this.cartItemGateway.save(cartItem);
    }
}