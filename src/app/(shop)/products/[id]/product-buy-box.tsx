"use client"

import { DropdownList } from "@/components/dropdown-list"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ShoppingCart } from "lucide-react"
import { useState } from "react"

type ProductBuyBoxProps = {
    productId: string,
    formattedPrice: string
}

export const ProductBuyBox = ({
    productId,
    formattedPrice
} : ProductBuyBoxProps) => {

    const [quantity, setQuantity] = useState("")

    const handleAddToCart = async(productId: string) => {
			console.log("Quantidade: " + quantity)
      const res = await fetch("/api/cart/add-product", {
        method: "POST",
        body: JSON.stringify({
          quantity: Number(quantity),
          productId
        })
      }) 
      const resJson = await res.json();
			if(resJson.ok != true){
				console.log("Selecione a quantidade")
			}
      console.log(resJson)
    }


    return (
        <aside className="md:col-span-4 lg:col-span-3 ">
          <div className="sticky top-24 flex flex-col gap-4 rounded-3xl border border-pink-200 bg-white/70 p-6 shadow-sm backdrop-blur-md md:max-w-xs md:self-start">
            <p className="text-center text-2xl font-bold text-pink-900">
              {formattedPrice}
            </p>

            <div className="w-40">
              <DropdownList className="w-full" value={quantity} setValue={setQuantity}/>
            </div>

            <Button 
              className="flex w-full items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500"
              onClick={() => handleAddToCart(productId)}
              >
              <ShoppingCart className="h-5 w-5" />
              Adicionar ao carrinho
            </Button>

            <Button 
              className="w-full bg-green-500 hover:bg-green-600"
              onClick={() => console.log("comprando")}
              >
              Comprar agora
            </Button>

            <hr className="border-pink-200" />

            <label className="flex items-center gap-2 text-sm text-pink-800">
              <Checkbox id="gift" /> Comprar como presente?
            </label>
          </div>
        </aside>
    )
}