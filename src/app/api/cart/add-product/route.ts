import { CartRepositoryPrisma } from "@/infrastructure/repositories/cart/cart.repository.prisma";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { AddToCartUsecase } from "@/usecases/cart/add-product.usecase";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest){
    console.log("adding to cart")
    try {
        const { productId, quantity } = await req.json();
        const session = await auth.api.getSession({
            headers: await headers(), 
        });
        if (!session) {
            return NextResponse.redirect("/auth/login");
        }

        const userId = session.user.id;

        const cartRepo = CartRepositoryPrisma.create(prisma);
        const addToCartUsecase = AddToCartUsecase.create(cartRepo)
        await addToCartUsecase.execute({userId: userId, productId: productId, quantity})
        
        return NextResponse.json({ ok: true }, { status: 201 });
    }catch (err) {
        console.error("POST /api/products/add-to-cart error:", err);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}