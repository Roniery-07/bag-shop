export type ProductImageProps = {
    id: string;
    url: string;
    alt: string;
    order: number;
    productId: string;
}

export class ProductImage{
    private constructor(private props: ProductImageProps){}

    public static create(url: string, alt: string, order: number, productId: string){
        return new ProductImage({
            id: crypto.randomUUID().toString(),
            url,
            alt,
            order,
            productId
        })
    }

    public static with(props: ProductImageProps){
        return new ProductImage(props) 
    }

    public get id(){
        return this.props.id
    }
    public get url(){
        return this.props.url
    }
    public get alt(){
        return this.props.alt
    }
    public get order(){
        return this.props.order
    }
    public get productId(){
        return this.props.productId
    }
}