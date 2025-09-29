import { CartItemRepositoryPrisma } from "@/infrastructure/repositories/cart-item/cart-item.repository.prisma";
import { CartRepositoryPrisma } from "@/infrastructure/repositories/cart/cart.repository.prisma";
import { ProductRepositoryPrisma } from "@/infrastructure/repositories/product/product.repository.prisma";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { UpdateQuantityCartItemUsecase } from "@/usecases/cart-item/update-quantity-cart-item.usecase";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    try{
        const {newQuantity, productId} = await req.json();

        console.log("Quantidade na rota: " + newQuantity)
        const session = await auth.api.getSession({
            headers: await headers(), 
        });
        if (!session) {
            return NextResponse.redirect("/auth/login");
        }

        const user = session.user;
        const cartRepo = CartRepositoryPrisma.create(prisma)
        const cart = await cartRepo.getByUserId(user.id)

        if(!cart)
            throw new Error("User does not have a cart!")

        const cartItemRepo = CartItemRepositoryPrisma.create(prisma)
        const productRepo = ProductRepositoryPrisma.create(prisma)
        const updateQuantityCartItemUsecase = UpdateQuantityCartItemUsecase.create(cartItemRepo, productRepo)

        const quantityPersisted = await updateQuantityCartItemUsecase.execute({
            newQuantity,
            cartId: cart.id,
            productId
        })

        return NextResponse.json({quantityPersisted}, { status: 201 });
    }
    catch (err) {
        console.error("POST /api/products/add-to-cart error:", err);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}