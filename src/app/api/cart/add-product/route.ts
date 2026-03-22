import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { CartRepositoryPrisma } from '@/infrastructure/repositories/cart/cart.repository.prisma';
import { CartItemRepositoryPrisma } from '@/infrastructure/repositories/cart-item/cart-item.repository.prisma';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';
import { AddToCartUsecase } from '@/usecases/cart/add-product.usecase';
import { ProductRepositoryPrisma } from '@/infrastructure/repositories/product/product.repository.prisma';
import { QuantityError } from '@/domain/errors/quantity-error';

export async function POST(req: NextRequest) {
  console.log('adding to cart');
  try {
    const { productId, quantity } = await req.json();
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      return NextResponse.json({ error: 'Não Autorizado' }, { status: 401 });
    }

    const userId = session.user.id;

    const cartRepo = CartRepositoryPrisma.create(prisma);
    const productRepo = ProductRepositoryPrisma.create(prisma);
    const cartItemRepo = CartItemRepositoryPrisma.create(prisma);
    const addToCartUsecase = AddToCartUsecase.create(
      cartRepo,
      productRepo,
      cartItemRepo,
    );

    await addToCartUsecase.execute({
      userId,
      productId,
      quantity,
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    if (err instanceof QuantityError) {
      return NextResponse.json(err.format(), { status: 400 });
    }
    console.error('POST /api/products/add-to-cart error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
