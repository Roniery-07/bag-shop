"use server";

// server action sao funcoes executadas diretamente no servidor, impedindo que dados vazem para o cliente

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { BetterAuthAuthenticator, RegisterPropsBody } from "@/infrastructure/auth/BetterAuthAuthenticator";

export async function signUpEmailAction(formData: FormData) {
  const name = String(formData.get("name"));
  if (!name) return { error: "Please enter your name" };

  const email = String(formData.get("email"));
  if (!email) return { error: "Please enter your email" };

  const password = String(formData.get("password"));
  if (!password) return { error: "Please enter your password" };

  const authenticator = BetterAuthAuthenticator.create(auth)  
  const props : RegisterPropsBody = {
    name,
    email,
    password
  }

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