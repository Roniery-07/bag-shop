import { Product } from "../entity/product";

export interface ProductGateway {
    save(product: Product): Promise<void>;
    list(): Promise<Product[]>;
    get(id: string): Promise<Product>;
    getAvailableStockQuantity(productId: string) : Promise<number>;
    decreaseStockQuantity(product: Product) : Promise<void>;
}