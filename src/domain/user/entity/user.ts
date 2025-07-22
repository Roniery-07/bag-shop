export type UserProps = {
    name: string;
    email: string;
    password: string;
}


export class User{
    private constructor(private props: UserProps){}

    public create(name: string, email: string, password: string){
        return new User({
            name, 
            email,
            password
        })
    }

    
}