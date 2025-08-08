import { AuthGateway } from "@/domain/auth/auth.gateway";
import { Usecase } from "../usecases";

export type SignOutInputDto = void
export type SignOutOutputDto = void

export class SignOutUsecase implements Usecase<SignOutInputDto, SignOutOutputDto>{
    private constructor(private readonly authGateway : AuthGateway){}

    public static create(authGateway : AuthGateway){
        return new SignOutUsecase(authGateway)
    }

    public async execute(): Promise<void> {
        this.authGateway.signOut();
    }
}