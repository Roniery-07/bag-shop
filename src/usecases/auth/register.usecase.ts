import { AuthGateway, RegisterProps } from "@/domain/auth/auth.gateway";
import { Usecase } from "../usecases";

export type RegisterInputDto = RegisterProps
export type RegisterOutputDto = object

export class RegisterUsecase implements Usecase<RegisterInputDto, RegisterOutputDto>{
    private constructor(private readonly authGateway : AuthGateway){}

    public static create(authGateway : AuthGateway){
        return new RegisterUsecase(authGateway)
    }

    public async execute(props: RegisterInputDto) : Promise<RegisterOutputDto>{
        return this.authGateway.register(props)
    }
}