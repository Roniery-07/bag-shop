import { CartItemRepositoryPrisma } from "@/infrastructure/repositories/cart-item/cart-item.repository.prisma";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { ListCartItemByUserIdUsecase } from "@/usecases/cart-item/list-cart-item-by-user-id.usecase";
import { headers } from "next/headers";
import {NextResponse } from "next/server";

export async function GET(){

    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session) return NextResponse.json({status: 401});
    
    const userId = session.user.id;
    
    const cartRepo = CartItemRepositoryPrisma.create(prisma)
    const listCartItemsByUserIdUsecase = ListCartItemByUserIdUsecase.create(cartRepo)

    const cartItems = await listCartItemsByUserIdUsecase.execute({userId})
    return NextResponse.json({entities: cartItems}, {status: 200})
}