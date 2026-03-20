import { ProductRepositoryPrisma } from '@/infrastructure/repositories/product/product.repository.prisma';
import { prisma } from '@/lib/db/prisma';
import { ListProductUsecase } from '@/usecases/product/list-product.usecases';
import { ProductGrid } from './product-grid';

export default async function ProductsPage() {
  const repo = ProductRepositoryPrisma.create(prisma);
  const usecase = ListProductUsecase.create(repo);

  const products = await usecase.execute();
  console.log(products);

  return (
    <div className="h-full mx-auto">
      {products.map((p) => (
        <ProductGrid key={p.id} product={p} />
      ))}
    </div>
  );
}
