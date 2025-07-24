import { Product } from '@/domain/product/entity/product';
import { GetProductOutputDto } from './get-product.usecases';

export const productToDto = (p: Product): GetProductOutputDto => ({
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
});
