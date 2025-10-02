import { CartItemRepositoryPrisma } from "@/infrastructure/repositories/cart-item/cart-item.repository.prisma";
import { CartRepositoryPrisma } from "@/infrastructure/repositories/cart/cart.repository.prisma";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest){
    try{
        const {productId} = await req.json()
        const session = await auth.api.getSession({
            headers: await headers(), 
        });
        if (!session) return NextResponse.redirect("/auth/login");

        const cartItemRepo = CartItemRepositoryPrisma.create(prisma)
        const cartRepo = CartRepositoryPrisma.create(prisma);
        const cart = await cartRepo.getByUserId(session.user.id);

        if(!cart) return NextResponse.json({}, {status: 500})

        const isDeleted = await cartItemRepo.delete(cart.id, productId)

        if(isDeleted) return NextResponse.json({deleted: true}, {status: 202});

        return NextResponse.json({deleted: false}, {status: 200})

    } catch(err){
        console.log(err)
    }
}