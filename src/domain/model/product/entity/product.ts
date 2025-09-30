import { ProductImage } from "@/domain/model/product-image/entity/product-image";


export type ProductProps = {
    id: string;
    name: string;
    price: number;
    description?: string;
    quantity: number;
    images: ProductImage[]
}


export class Product{
    private constructor(private props : ProductProps){}

    public static create(name: string, price: number, quantity: number, images: ProductImage[], description = ""){
        return new Product({
            id : crypto.randomUUID().toString(),
            name,
            price,
            quantity,
            images,
            description
        })
    }

    public static with(props: ProductProps){
        return new Product(props)
    }

    public increaseQuantity() : void{
        //adds to stock    
    }

    public decreaseQuantity(removeQuantity : number) : void{
        //removes from stock
        if(removeQuantity < 0) throw new Error("Quantity to remove must be positive");
        if(this.props.quantity <= 0) throw new Error(`There is not ${this.props.name} in stock`)
        
        this.props.quantity -= removeQuantity
    }


    public get id(){
        return this.props.id
    }
    public get name(){
        return this.props.name
    }
    public get price(){
        return this.props.price
    }
    public get quantity(){
        return this.props.quantity
    }
    public get images(){
        return this.props.images;
    }
    public get description(){
        return this.props.description;
    }
}