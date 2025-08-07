// app/actions/sign-out.actions.ts
"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { BetterAuthAuthenticator } from "@/infrastructure/auth/BetterAuthAuthenticator";

export async function signOutAction() {
  const authenticator = BetterAuthAuthenticator.create(auth)
  try {
    // passa os headers p/ Better Auth identificar o cookie atual
    await authenticator.signOut();

    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }
    return { error: "Internal Server Error" };
  }
}
