import { User } from "@/domain/model/user/entity/user"
import { betterAuth } from "better-auth"

export type SignInPropsBody = {
    email: string,
    password: string
}

export type RegisterPropsBody = {
    name: string,
    email: string,
    password: string
}

export type SignOutProps = void;

export type BetterAuthType = ReturnType< typeof betterAuth>

export interface Authenticator {
    // user: User
    register: (registerProps: RegisterPropsBody) => Promise<object>
    signIn: (signInProps : SignInPropsBody) => Promise<object>
    // signOut: () => Promise<void>
    // isSignedIn: () => Promise<
}

export class BetterAuthAuthenticator implements Authenticator {

    private constructor(private betterAuth : BetterAuthType){}

    public static create(betterAuth : BetterAuthType){
        return new BetterAuthAuthenticator(betterAuth)
    }

    public async register(props : RegisterPropsBody){
        const x  = await this.betterAuth.api.signUpEmail({
            body: props
        })

        return x
    }

    public async signIn (props : SignInPropsBody) {
        const x = await this.betterAuth.api.signInEmail({
            body: props
        })

        return x
    }
}