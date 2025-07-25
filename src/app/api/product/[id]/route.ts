import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { ProductRepositoryPrisma } from '@/infrastructure/repositories/product/product.repository.prisma';
import { GetProductUsecase } from '@/usecases/product/get-product.usecases';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params;
    const productRepo       = ProductRepositoryPrisma.create(prisma);
    const getProductUsecase = GetProductUsecase.create(productRepo);

    const dto = await getProductUsecase.execute({ id });

    return NextResponse.json(dto, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: 'Product not found' },
      { status: 404 }
    );
  }
}