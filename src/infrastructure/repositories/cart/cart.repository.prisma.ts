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
    
    public async getByUserId(userId: string): Promise<Cart | null> {
        const data = await this.prismaClient.cart.findUnique({where: {id: userId}})
        if (data == null) return null

        const cart = Cart.with({id: data.id, userId: data.userId})

        return cart;
    }
}