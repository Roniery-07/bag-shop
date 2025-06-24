import Link from "next/link"
import { Product } from "@/types/product"

interface Props{
  product: Product
}

export function ProductCard({product}: Props) {
  return (
    <Link className="w-60 h-70 bg-white rounded-md p-4 flex flex-col gap-2" href={'products/1'}>
        <div className="rounded-md h-30 bg-neutral-200 ">imagem</div> 

        <section className="flex flex-col gap-5 items-center">
            <span className="text-xs">{product.name}</span>

            <span> <b>R$ {product.price}</b></span>

        </section>
    </Link>
  )
}
