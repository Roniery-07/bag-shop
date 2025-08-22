import { AuthGateway, SignInProps, RegisterProps } from "@/domain/auth/auth.gateway"
import { User } from "@/domain/model/user/entity/user"
import { betterAuth } from "better-auth"
import { headers } from "next/headers"

export type BetterAuthType = ReturnType< typeof betterAuth>

export class BetterAuthAuthenticator implements AuthGateway {

    private constructor(private betterAuth : BetterAuthType){}

    public static create(betterAuth : BetterAuthType){
        return new BetterAuthAuthenticator(betterAuth)
    }

    public async register(props : RegisterProps) : Promise<object>{
        const data = await this.betterAuth.api.signUpEmail({
            body: props
        })
        try{

            const user = User.with({
                id: data.user.id,
                email: data.user.email,
                name: data.user.name,
            })
            return user;
        }
        catch{
            return {};
        }
    }

    public async signIn (props : SignInProps) : Promise<object> {
        return await this.betterAuth.api.signInEmail({
            body: props
        })
    }

    public async signOut() : Promise<void>{
        await this.betterAuth.api.signOut({
            headers: await headers()
        });
    }

    public async isSignedIn(): Promise<boolean> {
        const session = await this.betterAuth.api.getSession({
            headers: await headers()
        })

        return !!session ;
    }
}