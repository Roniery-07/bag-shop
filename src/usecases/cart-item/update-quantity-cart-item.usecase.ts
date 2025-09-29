import { CartItemGateway } from "@/domain/model/cart-item/gateway/cart-item.gateway";
import { ProductGateway } from "@/domain/model/product/gateway/product.gateway";
import { Usecase } from "../usecases";

export type UpdateQuantityCartItemInputDto = {
    newQuantity: number;
    productId: string,
    cartId: string
}

export type UpdateQuantityCartItemOutputDto = number;


export class UpdateQuantityCartItemUsecase implements 
    Usecase<UpdateQuantityCartItemInputDto, UpdateQuantityCartItemOutputDto>
{
    private constructor(
        private readonly cartItemGateway : CartItemGateway,
        private readonly productGateway : ProductGateway
    ){}

    public static create(cartItemGateway : CartItemGateway, productGateway : ProductGateway){
        return new UpdateQuantityCartItemUsecase(cartItemGateway, productGateway);
    }

    public async execute({
        newQuantity,
        productId,
        cartId
    }: UpdateQuantityCartItemInputDto) : Promise<UpdateQuantityCartItemOutputDto> {
        console.log("Quantidade no usecase: "+ newQuantity)
        if(newQuantity < 0){
            throw new Error("Quantity must be positive!");
        }

        const [stockQuantity, cartItem ] = await Promise.all([
            this.productGateway.getAvailableStockQuantity(productId),
            this.cartItemGateway.get(cartId, productId)
        ]);

        if(!cartItem)
            throw new Error("Cart item does not exists!");

        if(newQuantity > stockQuantity)
            throw new Error("Stock insufficient for this product!")

        const quantityPersisted = await this.cartItemGateway.updateQuantity(newQuantity, cartId, productId)

        return quantityPersisted;
    }
}
