"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import {BetterAuthAuthenticator} from "@/infrastructure/auth/BetterAuthAuthenticator";
import { SignInUsecase } from "@/usecases/auth/sign-in.usecase";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export type LoginData = z.infer<typeof loginSchema>;

export async function signInEmailAction(data: LoginData) {
  const parse = loginSchema.safeParse(data);
  if (!parse.success) {
    return {  error: parse.error.errors[0].message };
  }

  const authenticator = BetterAuthAuthenticator.create(auth);
  const usecase = SignInUsecase.create(authenticator)

  try {
    await usecase.execute(parse.data);
    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      const code = err.body?.code ?? "UNKNOWN";
      if (code === "UNAUTHORIZED") {
        return { error: "Invalid email or password!" };
      }
      return { error: err.message };
    }
    return { error: "Internal Server Error" };
  }
}
