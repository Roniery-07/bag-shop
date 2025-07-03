//Tipos Iguais ao Banco

import { Prisma } from "@/generated/prisma";

export type ProductWithImages = Prisma.ProductGetPayload<{
  include: { images: true };
}>;