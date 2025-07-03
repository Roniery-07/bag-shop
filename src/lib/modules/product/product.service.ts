import * as repo from "./product.repository"
import { jsonify } from "@/lib/shared/mapper.utils"
import { ProductDTO } from "./product.dto"

export async function getProduct(id: number): Promise<ProductDTO | null>{
    const entity = await repo.getProduct(id);
    return entity ? jsonify(entity) : null
}

export async function listProducts() : Promise<ProductDTO[]>{
    const entities = await repo.listProducts();
    return jsonify(entities);
}