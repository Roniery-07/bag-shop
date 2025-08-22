import { CartGateway } from "@/domain/model/cart/gateway/cart.gateway";
import { Usecase } from "../usecases";
import { Cart } from "@/domain/model/cart/entity/cart";

export type CreateCartInputDto = {
    userId: string
}

export type CreateCartOutputDto = {
    id: string,
    userId: string
}

export class CreateCartUsecase implements Usecase<CreateCartInputDto, CreateCartOutputDto>{
    private constructor(private readonly cartGateway: CartGateway){}

    public static create(cartGateway: CartGateway){
        return new CreateCartUsecase(cartGateway)
    }

    public async execute({userId}: CreateCartInputDto): Promise<CreateCartOutputDto> {
        const cart = Cart.create(userId)
        await  this.cartGateway.save(cart)

        return this.presentOutput(cart)
    }

    private presentOutput(cart: Cart) : CreateCartOutputDto{
        return {
            id: cart.id,
            userId: cart.userId
        }
    }
}