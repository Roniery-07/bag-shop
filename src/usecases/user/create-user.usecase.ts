import { User } from "@/domain/model/user/entity/user";
import { Usecase } from "../usecases";
import { UserGateway } from "@/domain/model/user/gateway/user.gateway";
import { Cart } from "@/domain/model/cart/entity/cart";
import { CartGateway } from "@/domain/model/cart/gateway/cart.gateway";

export type CreateUserInputDto = {
    name: string;
    email: string;
    password: string
}

export type CreateUserOutputDto = {
    id: string
}

export class CreateUserUsecase implements Usecase<CreateUserInputDto, CreateUserOutputDto>{
    private constructor(
        private readonly userGateway : UserGateway,
        private readonly cartGateway : CartGateway
    ){}

    public static create(userGateway : UserGateway, cartGateway : CartGateway){
        return new CreateUserUsecase(userGateway, cartGateway)
    }

    public async execute({
        name,
        email,
    } : CreateUserInputDto) : Promise<CreateUserOutputDto> {

        const user = User.create(name, email);
        const cart = Cart.create(user.id);

        await this.cartGateway.save(cart)
        await this.userGateway.save(user)
        
        return this.presentOutput(user);
    }

    private presentOutput(user: User) : CreateUserOutputDto{
        const output : CreateUserOutputDto = {
            id: user.id
        }
        return output
    }

}