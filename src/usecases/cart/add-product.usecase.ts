import { CartGateway } from "@/domain/model/cart/gateway/cart.gateway";
import { Usecase } from "../usecases";

export type AddProductInputDto = {
    userId : string,
    productId : string,
    quantity : number
}

export type AddProductOutputDto = void;

export class AddToCartUsecase implements Usecase<AddProductInputDto, AddProductOutputDto>{
    private constructor(private readonly cartGateway : CartGateway){}

    public static create(cartGateway : CartGateway){
        return new AddToCartUsecase(cartGateway)
    }

    public async execute({
        userId,
        productId,
        quantity
    }: AddProductInputDto): Promise<AddProductOutputDto> {
        if(!Number.isInteger(quantity)) throw new Error("Quantity must be a integer");
        let cart = await this.cartGateway.getByUserId(userId)
        if(!cart) cart = await this.cartGateway.createForUser(userId)

        await this.cartGateway.addProduct(cart.id, productId, quantity)
    }
}