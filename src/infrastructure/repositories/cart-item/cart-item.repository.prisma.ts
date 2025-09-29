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

    public async get(cartId: string, productId: string ) : Promise<CartItem>{
        const cartRaw = await this.prismaClient.cartItem.findUnique({
            where: {
                cartId_productId: {
                    cartId,
                    productId
                }
            },
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
                            take: 1
                        },
                    },
                },
            },
        })

        if(!cartRaw)
            throw new Error("Cart item does not exists!")

        const cartItem = CartItem.with({
            cartId: cartRaw.cartId,
            quantity: cartRaw.quantity,
            product: Product.with({
                id: cartRaw.product.id,
                name: cartRaw.product.name,
                price: cartRaw.product.price.toNumber(),
                quantity: cartRaw.product.quantity,
                images: cartRaw.product.images.map(img => {
                    const image = ProductImage.with({
                        id: img.id,
                        alt: img.alt ?? "",
                        order: img?.order ?? 0 ,
                        productId: cartRaw.productId,
                        url: img.url
                    })
                    return image
                })
            }),
        })

        return cartItem;
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
                            take: 1
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

    public async updateQuantity(newQuantity: number, cartId: string, productId: string) : Promise<number> {
        const cartUpdate = await this.prismaClient.cartItem.update({
            where: {
                cartId_productId: {
                    cartId: cartId,
                    productId: productId
                }
            },
            data: {
                quantity: newQuantity
            }
        })
        console.log("New Quantity: " + cartUpdate.quantity)        
        return cartUpdate.quantity;
    }
}