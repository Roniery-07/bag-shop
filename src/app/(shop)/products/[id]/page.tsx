// app/(store)/products/[id]/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { ChevronLeft, Heart, ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownList } from '@/components/dropdown-list';
// import { ProductSection } from '@/components/product-section-slick';

import { prisma } from '@/lib/db/prisma';
import { ProductRepositoryPrisma } from '@/infrastructure/repositories/product/product.repository.prisma';
import { GetProductUsecase } from '@/usecases/product/get-product.usecases';
import { ProductBuyBox } from './product-buy-box';

interface PageProps {
  params: { id: string };
}

export const money = (value: number) =>
  (value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });


export default async function ProductPage({ params }: PageProps) {
  const p = await params
  const productRepo = ProductRepositoryPrisma.create(prisma);
  const getProduct = GetProductUsecase.create(productRepo);
  const product = await getProduct.execute({ id: p.id });
  
  if (!product) notFound();
  console.log("Description: " + product.description)

  const cover =
    product.images.find((i) => i.order === 1)?.url ?? product.images[0].url;

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      {/* voltar */}
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-pink-600 transition hover:underline"
      >
        <ChevronLeft className="h-4 w-4" />
        Continuar comprando
      </Link>

      <div className="grid gap-10 md:grid-cols-12 ">
        <section className="md:col-span-5">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-pink-100">
            <Image
              src={cover}
              alt={product.name}
              fill
              sizes='720px 720px'
              priority
              className="object-cover"
            />

            <button className="absolute right-4 top-4 rounded-full bg-white/70 p-2 backdrop-blur-md transition hover:bg-white">
              <Heart className="h-5 w-5 stroke-pink-500" />
            </button>
          </div>

          <div className="mt-4 flex gap-3 overflow-x-auto">
            {product.images.slice(0, 6).map((img) => (
              <div
                key={img.url}
                className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-pink-50"
              >
                <Image
                  src={img.url}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6 md:col-span-4">
          <header>
            <h1 className="text-2xl font-semibold text-pink-900">
              {product.name}
            </h1>
            {product.description && (
              <p className="mt-2 text-sm text-pink-700 line-clamp-4">
                {product.description}
              </p>
            )}
          </header>

          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-pink-900">
              {money(product.price)}
            </span>
          </div>

          <ul className="flex list-disc flex-col gap-1 pl-4 text-sm text-pink-700">
            <li>Envio imediato • estoque no Brasil</li>
            <li>Até 6x sem juros</li>
            <li>Primeira troca grátis</li>
          </ul>

        </section>

          <ProductBuyBox productId={product.id} formattedPrice={money(product.price)}/>
      </div>

      {/* ------ Produtos relacionados (opcional) ------
      <section className="mt-20">
        <h2 className="mb-8 text-center text-2xl font-semibold">
          Você também pode gostar
        </h2>
        <ProductSection products={related} itemsPerPage={4} />
      </section>
      */}
    </main>
  );
}
