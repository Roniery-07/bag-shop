"use client";

import Link from "next/link";
import Image from "next/image";
import { ListProductOutputDto } from "@/usecases/product/list-product.usecases";

type ProductView = ListProductOutputDto[number];

interface Props {
  product: ProductView;
}

export default function ProductCard({ product }: Props) {
  const imageUrl =
    product.images.find((img) => img.order === 1)?.url ?? product.images[0].url;

  return (
    <Link
      href={`/products/${product.id}`}
      draggable={false}
      className="
        group flex w-40 md:w-44 flex-col overflow-hidden
        rounded-lg bg-white shadow-sm transition
        hover:shadow-md 
      "
    >
      {/* Imagem — mantém proporção quadrada */}
      <div className="relative aspect-square w-full bg-neutral-100">
        <Image
          src={imageUrl}
          alt={product.name ?? ""}
          fill
          sizes="(min-width: 768px) 176px, 40vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col gap-1 p-2">
        <h2 className="line-clamp-2 text-xs font-medium text-neutral-900">
          {product.name}
        </h2>

        <span className="text-sm font-bold text-primary-700">
          {product.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
    </Link>
  );
}
