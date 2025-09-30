import { Product } from '@/domain/model/product/entity/product';
import { GetProductOutputDto } from './get-product.usecases';

export const productToDto = (p: Product): GetProductOutputDto => {
  console.log("Product Mapper: " + p.description)

  return ({
  id: p.id,
  name: p.name,
  price: p.price,
  description: p.description ?? "",
  quantity: p.quantity,
  images: p.images.map((img) => ({
    id: img.id,
    url: img.url,
    alt: img.alt,
    order: img.order,
  })),
});
}
