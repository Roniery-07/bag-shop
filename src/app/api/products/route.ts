// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ProductRepositoryPrisma } from '@/infrastructure/repositories/product/product.repository.prisma';
import { prisma } from '@/lib/db/prisma';
import { ListProductUsecase } from '@/usecases/product/list-product.usecases';

export async function GET(req: NextRequest) {
  const body = req.body;
  const search = req.nextUrl.searchParams.get('search');

  const repo = ProductRepositoryPrisma.create(prisma);
  const listProducts = ListProductUsecase.create(repo);

  if (search) {
    const products = await listProducts.execute({ search });
    if (products) {
      console.log(products);
      return NextResponse.json(products);
    }
  }

  const products = await listProducts.execute();

  return NextResponse.json(products);
}
