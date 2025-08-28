import { ProductGateway } from "@/domain/model/product/gateway/product.gateway";
import { Usecase } from "../usecases";

export type DecreaseProductQuantityInputDto = {
    id: string,
    removeQuantity: number
}

export type DecreaseProductQuantityOutputDto = void;

export class DecreaseProductQuantityUsecase implements Usecase<DecreaseProductQuantityInputDto, DecreaseProductQuantityOutputDto>{
    private constructor(private readonly productGateway : ProductGateway){}

    public static create(productGateway : ProductGateway){
        return new DecreaseProductQuantityUsecase(productGateway)
    }

    public async execute({
        id,
        removeQuantity
    }: DecreaseProductQuantityInputDto): Promise<void> {
        const product = await this.productGateway.get(id);
        console.log(product)
        product.decreaseQuantity(removeQuantity)
        await this.productGateway.decreaseStockQuantity(product)
    }
}