import { ProductGateway } from "@/domain/product/gateway/product.gateway";
import { Usecase } from "../usecases"
import { Product } from "@/domain/product/entity/product";
import { productToDto } from "./product-mapper";

export type GetProductInputDto = {
    id: string
}

export type GetProductOutputDto = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  images: {
    id: string;
    url: string;
    alt?: string;
    order: number;
  }[];
};
export class GetProductUsecase implements Usecase<GetProductInputDto, GetProductOutputDto>{

    private constructor(private readonly productGateway: ProductGateway){}

    public static create(productGateway: ProductGateway){
        return new GetProductUsecase(productGateway)
    }

    public async execute({id} : GetProductInputDto) : Promise<GetProductOutputDto>{
        const product = await this.productGateway.get(id)

        return this.presentOutput(product)
    }

    private presentOutput(product: Product) : GetProductOutputDto{
        return productToDto(product)
    }
}