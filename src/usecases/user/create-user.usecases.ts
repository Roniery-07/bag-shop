import { User } from "@/domain/model/user/entity/user";
import { Usecase } from "../usecases";
import { UserGateway } from "@/domain/model/user/gateway/user.gateway";

export type CreateUserInputDto = {
    name: string;
    email: string;
    password: string
}

export type CreateUserOutputDto = {
    id: string
}

export class CreateUserUsecases implements Usecase<CreateUserInputDto, CreateUserOutputDto>{
    private constructor(private readonly userGateway : UserGateway){}

    public static create(userGateway: UserGateway){
        return new CreateUserUsecases(userGateway)
    }

    public async execute({
        name,
        email,
    } : CreateUserInputDto) : Promise<CreateUserOutputDto> {
        const user = User.create(name, email)

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