import { ProductImage } from "@/domain/product-image/entity/product-image";
import { Product } from "@/domain/product/entity/product";
import { ProductGateway } from "@/domain/product/gateway/product.gateway";
import { PrismaClient } from "@/generated/prisma";

export class ProductRepositoryPrisma implements ProductGateway{
    private constructor(private readonly prismaClient : PrismaClient){}

    public static create(prismaClient: PrismaClient){
        return new ProductRepositoryPrisma(prismaClient)
    }
    
    public async save(product: Product): Promise<void> {
        const data = {
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            images: {
                create: product.images.map(img => ({
                    id: img.id,
                    url: img.url,
                    alt: img.alt,
                    order: img.order,
                    productId: img.productId
                }))               
            }
        }

        await this.prismaClient.product.create({data})
    }

    public async list(): Promise<Product[]> {
        const products = await this.prismaClient.product.findMany({include: {images: true}});

        const productList = products.map(p => {
            const product = Product.with({
                id: p.id,
                name: p.name,
                price: p.price.toNumber(),
                quantity: p.quantity,
                images: p.images.map(img => 
                    ProductImage.with({
                        id: img.id,
                        alt: img.alt ?? "",
                        url: img.url,
                        order: img.order ?? 1,
                        productId: img.productId
                    })
                )
            })
            return product
        })

        return productList;
    }

    public async get(id: string): Promise<Product> {
        const product = await this.prismaClient.product.findUnique({
            where: {
                id: id
            },
            include: {
                images: true
            }
        })
        
        if (!product) {
            // lance erro de domínio ou retorne undefined (sua preferência)
            throw new Error(`Product with id: ${id} not found!`);
        }

        return Product.with({
                id: product.id,
                name: product.name,
                price: product.price.toNumber(),
                quantity: product.quantity,
                images: product.images.map(img => 
                    ProductImage.with({
                        id: img.id,
                        alt: img.alt ?? "",
                        url: img.url,
                        order: img.order ?? 1,
                        productId: img.productId
                    })
                )
            })
    }
}