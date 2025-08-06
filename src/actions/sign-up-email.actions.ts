"use server";

// server action sao funcoes executadas diretamente no servidor, impedindo que dados vazem para o cliente

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { BetterAuthAuthenticator, RegisterPropsBody } from "@/infrastructure/auth/BetterAuthAuthenticator";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(4, {message: 'Mín. 4 caracteres'}),
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(6, { message: 'Mín. 6 caracteres' }),
});

type RegisterData = z.infer<typeof registerSchema>;

export async function signUpEmailAction(data: RegisterData) {
  const parse = registerSchema.safeParse(data)
  if (!parse.success) {
    return { error: parse.error.errors[0].message };
  }

  const authenticator = BetterAuthAuthenticator.create(auth);

  const props: RegisterPropsBody = parse.data;
  try {
    await authenticator.register(props);

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