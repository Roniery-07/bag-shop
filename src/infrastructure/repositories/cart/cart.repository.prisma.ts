import { Cart } from "@/domain/model/cart/entity/cart";
import { CartGateway } from "@/domain/model/cart/gateway/cart.gateway";
import { PrismaClient } from "@/generated/prisma";

export class CartRepositoryPrisma implements CartGateway{
    private constructor(private readonly prismaClient : PrismaClient){}

    public static create(prismaClient : PrismaClient){
        return new CartRepositoryPrisma(prismaClient)
    }

    public async save(cart : Cart) : Promise<void>{
        const data = {
            id: cart.id,
            userId: cart.userId
        }

       await this.prismaClient.cart.create({data})
    }

      async createForUser(userId: string): Promise<Cart> {
        const cart = Cart.create(userId)
        const created = await this.prismaClient.cart.create({
            data: { id: cart.id, userId }, 
        })
        return Cart.with({ id: cart.id, userId: cart.userId, cartItems: [] })
    }

    public async get(cartId : string) : Promise<Cart | null>{
        const data = await this.prismaClient.cart.findUnique({where: {id: cartId}})
        if (data == null) return null;
        const cart = Cart.with({id: data.id, userId: data.userId})
        return cart;
    }
    
    public async getByUserId(userId: string): Promise<Cart | null> {
        const data = await this.prismaClient.cart.findUnique({where: {userId: userId}})
        if (data == null) return null

        const cart = Cart.with({id: data.id, userId: data.userId})

        return cart;
    }

    public async addProduct(cartId: string, productId: string, quantity: number): Promise<void> {
        await this.prismaClient.cartItem.upsert({
            where: {cartId_productId: {cartId, productId}},
            update: {quantity: quantity},
            create: {cartId: cartId, productId: productId, quantity: quantity}
        })
    }
}