import { ProductGateway } from '@/domain/model/product/gateway/product.gateway';
import { Usecase } from '../usecases';
import { Product } from '@/domain/model/product/entity/product';
import { GetProductOutputDto } from './get-product.usecases';

export type ListProductInputDto = {
  search?: string;
};

export type ListProductOutputDto = GetProductOutputDto[];

export class ListProductUsecase
  implements Usecase<ListProductInputDto, ListProductOutputDto>
{
  private constructor(private productGateway: ProductGateway) {}

  public static create(productGateway: ProductGateway) {
    return new ListProductUsecase(productGateway);
  }

  public async execute(
    props: ListProductInputDto = {},
  ): Promise<ListProductOutputDto> {
    const products = await this.productGateway.list(props.search);

    return this.presentOutput(products);
  }

  private presentOutput(products: Product[]): ListProductOutputDto {
    return products.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      description: p.description || '',
      quantity: p.quantity,
      images: p.images.map((img) => ({
        id: img.id,
        url: img.url,
        alt: img.alt,
        order: img.order,
      })),
    }));
  }
}
