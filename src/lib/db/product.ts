// lib/db/product.ts
import { prisma } from '@/lib/prisma';
import { Decimal } from '@prisma/client/runtime/library';

export type ProductDTO = {
  id: number;
  name: string;
  price: number;        // PRIMITIVO
  description: string;
};

export async function listProducts(): Promise<ProductDTO[]> {
  const rows = await prisma.product.findMany({
    select: { id: true, name: true, price: true, description: true },
  });

  return rows.map(r => ({
    id: r.id,
    name: r.name ?? '',
    price: (r.price as Decimal).toNumber(),   // conversão única
    description: r.description ?? '',
  }));
}
