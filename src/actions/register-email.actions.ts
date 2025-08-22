"use server";

// server action sao funcoes executadas diretamente no servidor, impedindo que dados vazem para o cliente

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { z } from "zod";
import { BetterAuthAuthenticator } from "@/infrastructure/auth/BetterAuthAuthenticator";
import { RegisterUsecase } from "@/usecases/auth/register.usecase";
import { prisma } from "@/lib/db/prisma";
import { CartRepositoryPrisma } from "@/infrastructure/repositories/cart/cart.repository.prisma";
import { CreateCartUsecase } from "@/usecases/cart/create-cart.usecase";
import { User } from "@/domain/model/user/entity/user";


const registerSchema = z.object({
  name: z.string().min(4, {message: 'Mín. 4 caracteres'}),
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(6, { message: 'Mín. 6 caracteres' }),
});

type RegisterData = z.infer<typeof registerSchema>;

export async function registerEmailAction(data: RegisterData) {
  const parse = registerSchema.safeParse(data)
  if (!parse.success) {
    return { error: parse.error.errors[0].message };
  }
  
  const authenticator = BetterAuthAuthenticator.create(auth);
  const regUsecase = RegisterUsecase.create(authenticator)

  const cartRepo = CartRepositoryPrisma.create(prisma)
  const createCartUsecase = CreateCartUsecase.create(cartRepo)
  try {
    const user = await regUsecase.execute(parse.data) as User;
    await createCartUsecase.execute({userId: user.id})
    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code) : "UNKNOWN";

      switch (errCode) {
        case "USER_ALREADY_EXISTS":
          return { error: "Oops! Something went wrong. Please try again." };
        default:
          return { error: err.message };
      }
    }
    return { error: "Internal Server Error" };
  }
}