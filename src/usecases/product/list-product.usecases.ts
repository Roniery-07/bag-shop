import { ProductGateway } from "@/domain/product/gateway/product.gateway";
import { Usecase } from "../usecases";
import { Product } from "@/domain/product/entity/product";

export type ListProductInputDto = void

export type ListProductOutputDto = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  images: {
    id: string;
    url: string;
    alt: string;
    order: number;
  }[];
}[];


export class ListProductUsecase implements Usecase<ListProductInputDto, ListProductOutputDto>{

    private constructor(private productGateway: ProductGateway){}

    public static create(productGateway : ProductGateway){
        return new ListProductUsecase(productGateway)
    }

    public async execute(): Promise<ListProductOutputDto> {
        const products = await this.productGateway.list();

        return this.presentOutput(products);
    }

    private presentOutput(products: Product[]) : ListProductOutputDto{
        return products.map(p => ({
            
            id: p.id,
            name: p.name,
            price: p.price,
            quantity: p.quantity,
            images: p.images.map((img) => ({
                id: img.id,
                url: img.url,
                alt: img.alt,
                order: img.order,
            })),  
        })
    )}
}