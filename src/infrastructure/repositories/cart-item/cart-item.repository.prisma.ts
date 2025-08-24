import { CartItem } from "@/domain/model/cart-item/entity/cart-item";
import { CartItemGateway } from "@/domain/model/cart-item/gateway/cart-item.gateway";
import { PrismaClient } from "@/generated/prisma";
import { CartRepositoryPrisma } from "../cart/cart.repository.prisma";
import { Product } from "@/domain/model/product/entity/product";
import { ProductImage } from "@/domain/model/product-image/entity/product-image";

export class CartItemRepositoryPrisma implements CartItemGateway{
    private constructor(private readonly prismaClient: PrismaClient){}

    public static create(prismaClient : PrismaClient){
        return new CartItemRepositoryPrisma(prismaClient)
    }

    public async listCartItemsByUserId(userId: string): Promise<CartItem[]> {
        const cartRepo = CartRepositoryPrisma.create(this.prismaClient)
        const cart = await cartRepo.getByUserId(userId);
        if(!cart) return [];
        
        const items = await this.prismaClient.cartItem.findMany({
            where: { cartId: cart.id },
            include: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        price: true, // Prisma.Decimal
                        description: true,
                        quantity: true,
                        images: {
                            select: { id: true, url: true, order: true, alt: true },
                            orderBy: [{ order: "asc" }, { createdAt: "asc" }],
                        },
                    },
                },
            },
        });
        
        const cartItems = items.map(i  => {
            const cartItem = CartItem.with({
                cartId: i.cartId,
                quantity: i.quantity,
                product: Product.with({
                    id: i.product.id,
                    name: i.product.name,
                    price: i.product.price.toNumber(),
                    quantity: i.product.quantity,
                    images: i.product.images.map(img => {
                        const image = ProductImage.with({
                            id: img.id,
                            alt: img.alt ?? "",
                            order: img?.order ?? 0 ,
                            productId: i.productId,
                            url: img.url
                        })
                        return image
                    })
                }),
            })
            return cartItem
        })
        return cartItems;
    }
}