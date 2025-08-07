import {betterAuth} from "better-auth"
import {prismaAdapter} from "better-auth/adapters/prisma"
import { prisma } from "./db/prisma"
import { nextCookies } from "better-auth/next-js"

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6
  },
  plugins: [
    nextCookies()
  ]
})