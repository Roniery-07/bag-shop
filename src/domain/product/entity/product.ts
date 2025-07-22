export type ProductProps = {
    id: number;
    name: string;
    price: number;
    quantity: number;
}


export class Product{
    private constructor(private props : ProductProps){}

    // public static create(name: string, price: number){
    //     return new Product({
    //         id: 
    //     })
    // }
}