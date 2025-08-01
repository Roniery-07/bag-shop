// app/api/products/route.ts
import { NextResponse } from 'next/server'
import { ProductRepositoryPrisma } from '@/infrastructure/repositories/product/product.repository.prisma'
import { prisma } from '@/lib/db/prisma'
import { ListProductUsecase } from '@/usecases/product/list-product.usecases'

export async function GET() {
  const repo = ProductRepositoryPrisma.create(prisma)
  const listProducts = ListProductUsecase.create(repo)
  const products = await listProducts.execute()

  return NextResponse.json(products)
}
