export type UserProps = {
    id: string
    name: string;
    email: string;
}


export class User{
    private constructor(private props: UserProps){}

    public static create(name: string, email: string){
        return new User({
            id: crypto.randomUUID().toString(),
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