import { prisma } from "@/lib/prisma";
import { ProductWithImages } from "./product.types";

export async function listProducts(): Promise<ProductWithImages[]> {
    return await prisma.product.findMany({include: {images: true}})
}

export async function getProduct(id: number) : Promise<ProductWithImages | null>{
    const product = prisma.product.findUnique({
        where: {id},
        include: {images: true}
    })
    return product;
}