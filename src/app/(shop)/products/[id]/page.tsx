// app/(store)/products/[id]/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, Heart, ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownList } from '@/components/dropdown-list';
// import { ProductSection } from '@/components/product-section-slick';

import { prisma } from '@/lib/db/prisma';
import { ProductRepositoryPrisma } from '@/infrastructure/repositories/product/product.repository.prisma';
import { GetProductUsecase } from '@/usecases/product/get-product.usecases';

interface PageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: PageProps) {
  /* -------- obtenção do produto -------- */
  const productRepo = ProductRepositoryPrisma.create(prisma);
  const getProduct = GetProductUsecase.create(productRepo);
  const product = await getProduct.execute({ id: params.id });

  if (!product) notFound();

  /* -------- helpers -------- */
  const cover =
    product.images.find((i) => i.order === 1)?.url ?? product.images[0].url;

  const money = (value: number) =>
    (value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

  /* -------- layout -------- */
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

      <div className="grid gap-10 md:grid-cols-12">
        {/* ---------- Galeria ---------- */}
        <section className="md:col-span-5">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-pink-100">
            <Image
              src={cover}
              alt={product.name}
              fill
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

        {/* ---------- Detalhes ---------- */}
        <section className="flex flex-col gap-6 md:col-span-4">
          <header>
            <h1 className="text-2xl font-semibold text-pink-900">
              {product.name}
            </h1>
            {/* {product.description && (
              <p className="mt-2 text-sm text-pink-700 line-clamp-4">
                {product.description}
              </p>
            )} */}Description Template até implementar de verdade
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

          <div className="w-40">
            <DropdownList className="w-full" />
          </div>
        </section>

        {/* ---------- Buy-box ---------- */}
        <aside className="md:col-span-4 lg:col-span-3 ">
          <div className="sticky top-24 flex flex-col gap-4 rounded-3xl border border-pink-200 bg-white/70 p-6 shadow-sm backdrop-blur-md md:max-w-xs md:self-start">
            <p className="text-center text-2xl font-bold text-pink-900">
              {money(product.price)}
            </p>

            <Button className="flex w-full items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500">
              <ShoppingCart className="h-5 w-5" />
              Adicionar ao carrinho
            </Button>

            <Button className="w-full bg-green-500 hover:bg-green-600">
              Comprar agora
            </Button>

            <hr className="border-pink-200" />

            <label className="flex items-center gap-2 text-sm text-pink-800">
              <Checkbox id="gift" /> Comprar como presente?
            </label>
          </div>
        </aside>
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
