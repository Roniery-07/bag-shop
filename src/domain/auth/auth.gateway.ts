export type SignInProps = {
    email: string,
    password: string
}

export type RegisterProps = {
    name: string,
    email: string,
    password: string
}

export interface AuthGateway{
    register(props : RegisterProps) : Promise<object>;
    signIn(props : SignInProps): Promise<object>;
    signOut() : Promise<void>;
    isSignedIn() : Promise<boolean>
}