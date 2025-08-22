export type CartProps = {
    id: string,
    userId: string
}

export class Cart{
    private constructor(private props : CartProps){}

    public static create(userId: string){
        return new Cart({
            id: crypto.randomUUID().toString(),
            userId
        });
    }
    // usado dentro do dominio da aplicacao
    public static with(props : CartProps){
        return new Cart(props)
    }
    
    public get id(){
        return this.props.id
    }

    public get userId(){
        return this.props.userId
    }

}