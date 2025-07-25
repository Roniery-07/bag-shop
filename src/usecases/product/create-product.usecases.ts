import { ProductGateway } from "@/domain/model/product/gateway/product.gateway";
import { Usecase } from "../usecases";
import { Product } from "@/domain/model/product/entity/product";
import { ProductImage } from "@/domain/model/product-image/entity/product-image";

export type CreateProductInputDto = {
    name: string;
    price: number;
    quantity: number;
    images: ProductImage[]
}

export type CreateProductOutputDto = {
    id: string;
}

export class CreateProductUsecase implements Usecase<CreateProductInputDto, CreateProductOutputDto>{

    private constructor(private readonly productGateway: ProductGateway){}

    public static create(productGateway: ProductGateway){
        return new CreateProductUsecase(productGateway)
    }

    public async execute({
        name,
        price,
        quantity,
        images
    }: CreateProductInputDto) : Promise<CreateProductOutputDto>{

        // criamos o product dentro da logica do codigo
        const product = Product.create(name, price, quantity, images)
        // salvamos o product dentro do banco
        await this.productGateway.save(product)

        return this.presentOutput(product)
    }
    
    // 'formata' a saida
    private presentOutput(product : Product) : CreateProductOutputDto{
        return {
            id: product.id
        }
    }
}