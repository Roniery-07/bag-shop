// app/actions/sign-out.actions.ts
"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { BetterAuthAuthenticator } from "@/infrastructure/auth/BetterAuthAuthenticator";
import { SignOutUsecase } from "@/usecases/auth/sign-out.usecase";

export async function signOutAction() {
  const authenticator = BetterAuthAuthenticator.create(auth)
  const usecase = SignOutUsecase.create(authenticator)

  try {
    await usecase.execute();

    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }
    return { error: "Internal Server Error" };
  }
}
