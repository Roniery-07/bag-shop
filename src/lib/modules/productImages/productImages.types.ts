
import { Prisma } from "@/generated/prisma";

export type ProductImages = Prisma.ProductImagesGetPayload<{include: {product: true}}>;