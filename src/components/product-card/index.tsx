// components/product-card.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Heart } from 'lucide-react';

type ProductImage = { url: string; order?: number };
export interface Product {
  id: string | number;
  name: string;
  price: number;        // em centavos? ajuste conforme
  oldPrice?: number;
  images: ProductImage[];
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const cover =
    product.images.find((i) => i.order === 1)?.url || product.images[0]?.url;

  /* formata “R$ 129,90” */
  const format = (value: number) =>
    (value ).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

  return (
    <article className="group relative w-full max-w-[220px] overflow-hidden rounded-2xl bg-white shadow transition hover:shadow-lg">
      {/* FAVORITO */}
      <button
        aria-label="Favoritar"
        className="absolute right-3 top-3 z-10 rounded-full bg-white/60 p-1.5 backdrop-blur-md transition hover:bg-white"
      >
        <Heart className="h-4 w-4 stroke-pink-500" />
      </button>

      {/* IMAGEM */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square w-full bg-pink-100">
          {cover && (
            <Image
              src={cover}
              alt={product.name}
              fill
              sizes="220px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>
      </Link>

      {/* INFO */}
      <div className="flex flex-col gap-1 px-3 pb-4 pt-2">
        <h3 className="line-clamp-2 h-10 text-sm font-medium text-pink-950">
          {product.name}
        </h3>

        {/* preços */}
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-pink-900">
            {format(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-pink-600 line-through">
              {format(product.oldPrice)}
            </span>
          )}
        </div>
      </div>

      {/* ADD-TO-CART aparece no hover */}
      <button
        onClick={() => console.log('add to cart', product.id)}
        className="absolute bottom-3 right-3 hidden items-center gap-1 rounded-full bg-pink-400 px-3 py-1.5 text-xs font-semibold text-white shadow-md transition hover:bg-pink-500 group-hover:flex"
      >
        <ShoppingCart className="h-4 w-4" />
        Adicionar
      </button>
    </article>
  );
}
