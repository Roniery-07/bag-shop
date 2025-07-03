import { ProductImages } from "@/generated/prisma";
import { Jsonify } from "@/lib/shared/mapper.utils";

export type ProductImagesDTO = Jsonify<ProductImages>