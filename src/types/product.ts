import { type ProductImagesDTO  } from "./productImages";

export type ProductDTO = {
  id: number;
  name: string;
  price: number;        // PRIMITIVO
  description: string;
  images: ProductImagesDTO[];
};