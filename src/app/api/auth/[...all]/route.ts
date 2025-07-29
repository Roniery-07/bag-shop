import { auth } from "@/lib/auth";
import {toNextJsHandler} from "better-auth/next-js"

export const {GET, POST} = toNextJsHandler(auth)


//essa rota vai pegar todas as rotas contidas em /auth

//ex: /api/auth/login, /api/auth/register ....