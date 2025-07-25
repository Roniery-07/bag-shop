import { User } from "@/domain/model/user/entity/user";
import { UserGateway } from "@/domain/model/user/gateway/user.gateway";
import { PrismaClient } from "@/generated/prisma";

export class UserRepositoryPrisma implements UserGateway{
    private constructor(private readonly prismaClient : PrismaClient){}

    public static create(prismaClient: PrismaClient){
        return new UserRepositoryPrisma(prismaClient)
    }

    public async save(user: User) : Promise<void>{
        const data = {
            id: user.id,
            name: user.name,
            email: user.email,
        }

        await this.prismaClient.user.create({data})
    }

    public async list() : Promise<User[]> {
        const users = await this.prismaClient.user.findMany();

        const usersList = users.map(u => {
            const user = User.with({
                id: u.id,
                email: u.email,
                name: u.name ?? "",
            })
            return user;
        })

        return usersList
    }
}