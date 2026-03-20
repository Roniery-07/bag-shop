import { GetProductOutputDto } from '@/usecases/product/get-product.usecases';

interface Props {
  product: GetProductOutputDto;
}
export const ProductGrid = ({ product }: Props) => {
  console.log(product);
  return (
    <div className="w-full rounded-md">
      <img src={product?.images[0].url} />
      <div>
        <h1>{product.name}</h1>
        <span>{product.quantity}</span>
      </div>
    </div>
  );
};
