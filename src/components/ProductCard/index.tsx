'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { ProductDTO } from '@/types/product';

interface Props {
  product: ProductDTO;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex w-64 flex-col gap-3 rounded-xl bg-white p-4 shadow hover:shadow-lg transition-shadow"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-neutral-200">
        <Image
          src={product.images[0].url}
          alt={product.name}
          fill
          sizes="(min-width: 768px) 256px, 45vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>

      <h3 className="line-clamp-2 text-center text-sm font-medium text-neutral-800">
        {product.name}
      </h3>

      <span className="text-center text-base font-semibold text-primary-600">
        {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </span>
    </Link>
  );
}
