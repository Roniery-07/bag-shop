import { AuthGateway, SignInProps } from "@/domain/auth/auth.gateway";
import { Usecase } from "../usecases";

export type SignInInputDto = SignInProps;
export type SignInOutputDto = object;


export class SignInUsecase implements Usecase<SignInInputDto, SignInOutputDto>{
    private constructor(private readonly authGateway: AuthGateway){}

    public static create(authGateway: AuthGateway){
        return new SignInUsecase(authGateway)
    }

    public execute(props: SignInProps): Promise<object> {
        return this.authGateway.signIn(props)
    }
}