import { betterAuth } from "better-auth"
import { headers } from "next/headers"

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
    signOut: () => Promise<{success: boolean}>
    // isSignedIn: () => Promise<
}

export class BetterAuthAuthenticator implements Authenticator {

    private constructor(private betterAuth : BetterAuthType){}

    public static create(betterAuth : BetterAuthType){
        return new BetterAuthAuthenticator(betterAuth)
    }

    public async register(props : RegisterPropsBody){
        return await this.betterAuth.api.signUpEmail({
            body: props
        })
    }

    public async signIn (props : SignInPropsBody) {
        return await this.betterAuth.api.signInEmail({
            body: props
        })
    }

    public async signOut(){
        return await this.betterAuth.api.signOut({
            headers: await headers()
        });
    }
}