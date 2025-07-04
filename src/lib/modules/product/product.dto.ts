// Tipos expostos pela API
import { ProductWithImages } from "./product.types";
import { Jsonify } from "@/lib/shared/mapper.utils";

export type ProductDTO = Jsonify<ProductWithImages>