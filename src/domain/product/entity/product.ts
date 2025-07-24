import { ProductImage } from "@/domain/product-image/entity/product-image";


export type ProductProps = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    images: ProductImage[]
}


export class Product{
    private constructor(private props : ProductProps){}

    public static create(name: string, price: number, quantity: number, images: ProductImage[]){
        return new Product({
            id : crypto.randomUUID().toString(),
            name,
            price,
            quantity,
            images
        })
    }

    public static with(props: ProductProps){
        return new Product(props)
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
}