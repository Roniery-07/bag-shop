import NextAuth from "next-auth";
import {authConfig} from "@/infrastructure/auth/auth.config"
import {PrismaAdapter} from "@auth/prisma-adapter"
import { prisma } from "@/lib/db/prisma";

 
export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})

