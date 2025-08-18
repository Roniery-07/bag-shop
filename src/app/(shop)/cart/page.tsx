"use client"

import { CartRow } from "./cart-row";
import { useAuth } from "@/lib/context/authContext";
import { EmptyState } from "./empty-state";

//Remover depois
export type CartItem = {
  id: string;
  name: string;
  image: string;
  price: number; // preço unitário
  quantity: number;
  variant?: string; // cor/tamanho
};

export default function CartPage(){
    
    // items to be fetched
    const {user} = useAuth()
    const items : Array<object> = []
    console.log(user)

    return(
        <div className="mx-auto max-w-6xl w-full px-4 py-6">
            <header className="mb-4">
                <h1 className="text-2xl font-semibold">Seu carrinho</h1>
                <p className="text-sm text-neutral-500">Revise seus itens e finalize a compra</p>
            </header>

            {items.length === 0 ? (
                <EmptyState/>
            ) : 
            

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">

                    <section className="col-span-2 ">
                        <div className="space-y-4 p-1 border border-neutral-200/70 rounded-2xl shadow-sm ">
                            <ul className="divide-y divide-neutral-200/70">
                                {/* <CartRow item={item}/>
                                <CartRow item={item}/> */}
                            </ul>
                        </div>
                    </section>

                    <aside className="sticky top-6 h-fit space-y-4">
                        <div className="border border-neutral-200/70 rounded-2xl shadow-sm p-5">
                            <h2 className=" text-lg">Resumo</h2>
                            {/* <div className="flex items-center gap-2">
                                <input 
                                    type="text"
                                    placeholder="Inserir cupom"
                                    className="h-10 flex-1 rounded-xl border border-neutral-200 bg-white px-3 text-sm outline-none transition placeholder:text-neutral-400"
                                />
                                <button className="h-10 min-w-24 p-2 bg-green-300 rounded-md text-sm">Aplicar</button>
                            </div> */}

                            <div className="my-4 h-px bg-neutral-200 dark:bg-neutral-800" />

                            <dl>
                                <div className="flex items-center justify-between text-base">
                                    <dt className="text-neutral-600">Subtotal</dt>
                                    <dd className="font-medium">R$ 110</dd>
                                </div>

                                <div className="flex items-center justify-between text-base">
                                    <dt className="font-semibold">Total</dt>
                                    <dd className="font-semibold">R$ 110</dd>
                                </div>
                            </dl>

                        </div>
                    </aside>
                </div>
            }
        </div>
    )
}