// lib/db/product.ts
import { prisma } from '@/lib/prisma';
import { Decimal } from '@prisma/client/runtime/library';

import { ProductDTO } from '@/types/product';
import { ProductImagesDTO } from '@/types/productImages';

export async function listProducts(): Promise<ProductDTO[]> {
  const rows = await prisma.product.findMany({
    select: { id: true, name: true, price: true, description: true, images: true },
  });

  return rows.map(r => ({
    id: r.id,
    name: r.name ?? '',
    price: (r.price as Decimal).toNumber(),   // conversão única
    description: r.description ?? '',
    images: r.images.map((i) : ProductImagesDTO => ({
      id: i.id,
      url: i.url,
      alt: i.alt ?? "",
      order: i.order ?? null,
      productId: i.productId
    }))
  }));
}

