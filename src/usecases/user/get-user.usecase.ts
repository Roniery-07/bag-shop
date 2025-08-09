import { UserGateway } from "@/domain/model/user/gateway/user.gateway";
import { Usecase } from "../usecases";
import { User } from "@/domain/model/user/entity/user";

export type GetUserInputDto = {
    entityId : string
}
export type GetUserOutputDto = {
    id : string,
    name : string,
    email : string,
}

export class GetUserUsecase implements Usecase<GetUserInputDto, GetUserOutputDto> {
    private constructor(private readonly userGateway : UserGateway){}

    public static create(userGateway : UserGateway){
        return new GetUserUsecase(userGateway)
    }

    public async execute({entityId}: GetUserInputDto): Promise<GetUserOutputDto> {
        const user = await this.userGateway.get(entityId);
        return this.presentOutput(user)
    }

    private presentOutput(user : User) : GetUserOutputDto{
        return {
            id: user.id,
            email: user.email,
            name: user.name
        }
    }
}
