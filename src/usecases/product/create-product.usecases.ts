import { ProductGateway } from "@/domain/product/gateway/product.gateway";
import { Usecase } from "../usecases";
import { Product } from "@/domain/product/entity/product";

export type CreateProductInputDto = {
    name: string;
    price: number;
}

export type CreateProductOutputDto = {
    id: string;
}

export class CreateProductUsecase implements Usecase<CreateProductInputDto, CreateProductOutputDto>{

    private constructor(private readonly productGateway: ProductGateway){}

    public create(productGateway: ProductGateway){
        return new CreateProductUsecase(productGateway)
    }

    public async execute({
        name,
        price
    }: CreateProductInputDto) : Promise<CreateProductOutputDto>{

        // criamos o product dentro da logica do codigo
        const product = Product.create(name, price)
        // salvamos o product dentro do banco
        await this.productGateway.save(product)

        return this.presentOutput(product)
    }
    
    // 'formata' a saida
    private presentOutput(product : Product){
        return {
            id: product.id
        }
    }
}