import { Cart } from "@domain/model/cart/entity/cart"

export type UserProps = {
    id: string
    name: string;
    email: string;
    cart?: Cart
}


export class User{
    private constructor(private props: UserProps){}

    public static create(name: string, email: string){
        const id = crypto.randomUUID().toString()
        return new User({
            id,
            name, 
            email,
        })
    }

    public static with(props : UserProps) : User{
        return new User(props)
    }

    public get id() : string {
        return this.props.id;
    }

    public get name() : string{
        return this.props.name
    }

    public get email() : string {
        return this.props.email
    }
}