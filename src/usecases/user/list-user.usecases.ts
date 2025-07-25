import { User } from "@/domain/model/user/entity/user"
import { Usecase } from "../usecases"
import { UserGateway } from "@/domain/model/user/gateway/user.gateway"

export type ListUserInputDto = void

export type ListUserOutputDto = {
    users: {
        id: string;
        name: string;
        email: string;
    }[];
}

export class ListUserUsecases implements Usecase<ListUserInputDto, ListUserOutputDto>{
    private constructor(private readonly userGateway : UserGateway){}

    public static create(userGateway: UserGateway){
        return new ListUserUsecases(userGateway)
    }

    public async execute() : Promise<ListUserOutputDto>{

        // faz sentido que o metodo list não tenha envolvimento do dominio User
        // já que não faz sentido no sentido de regra de negocio do user fazer um list
        // dele mesmo, já que ele é apenas a representacao de um indivíduo

        const users = await this.userGateway.list();

        return this.presentOutput(users)
    }


    // em presentOutput estou transformando a entidade em DTO que será exposta para as camadas
    // mais externas
    private presentOutput(users: User[]) : ListUserOutputDto{
        return {
            users: users.map(u => {
                return {
                    id: u.id,
                    name: u.name,
                    email: u.email
                }
            })
        }   
    }
}
