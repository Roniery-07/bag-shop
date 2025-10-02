"use client";

import { useEffect, useMemo, useState } from "react";
import { CartRow } from "./cart-row";
import { EmptyState } from "./empty-state";
import { MobileStickyBar } from "./mobile-sticky-bar";
import { ListCartItemByUserIdOutputDto } from "@/usecases/cart-item/list-cart-item-by-user-id.usecase";

export type UIItem = {
  id: string;        // productId
  name: string;
  image: string;     // primeira imagem (ou placeholder)
  price: number;     // preço unitário
  quantity: number;  // quantidade no carrinho
  variant?: string;  // se quiser adicionar depois (cor/tamanho)
};

type UpdateQuantityResponse = {
  quantityPersisted: number
}

type RemoveItemResponse = {
  deleted: boolean
}


export default function CartPage() {
  const [items, setItems] = useState<UIItem[] | null>(null);
  const [loadingItems, setLoadingItems] = useState<Set<string>>(new Set())
  const [error, setError] = useState<string | null>(null);

  const brl = (v: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

  const handleQuantityUpdate = async(productId: string, newQuantity: number) => {
    if (loadingItems.has(productId)) return;
    try{

      setLoadingItems((prev) => new Set(prev).add(productId))
      const res = await fetch("/api/cart/update-quantity", {
        method: "POST",
        body: JSON.stringify({
          newQuantity,
          productId
        })
      });
      const resJson : UpdateQuantityResponse = await res.json();
      if(!resJson){
        throw new Error("Error on fetching to server")
      }

      setItems(currentItems =>
        resJson.quantityPersisted !== 0 ?
          currentItems!.map(item =>
            item.id === productId ? { ...item, quantity: resJson.quantityPersisted } : item
          )
        : currentItems!.filter(item => item.id !== productId )
      );
    }
    catch(err){
      console.log(err)
    }
    finally{
      setLoadingItems((prev) => {
        const next = new Set(prev)
        next.delete(productId)
        return next;
      })
    }
  }

  const handleRemove = async(productId: string) => {
    if (loadingItems.has(productId)) return;
    try{

      setLoadingItems((prev) => new Set(prev).add(productId))
      const res = await fetch("/api/cart/remove", {
        method: "DELETE",
        body: JSON.stringify({
          productId
        })
      });
      const resJson : RemoveItemResponse = await res.json();
      if(!resJson.deleted){
        return
      }
      setItems(currentItems =>
        currentItems!.filter(item => item.id !== productId )
      );
    }
    catch(err){
      console.log(err)
    }
    finally{
      setLoadingItems((prev) => {
        const next = new Set(prev)
        next.delete(productId)
        return next;
      })
    }
  }

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await fetch("/api/cart/list", { cache: "no-store" });

        if (res.status === 401) {
          // usuário não logado
          if (mounted) setItems([]);
          return;
        }

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err?.error ?? "Falha ao carregar o carrinho.");
        }

        const data = await res.json();

        console.log(data)
        const ui: UIItem[] =
          (data.entities as ListCartItemByUserIdOutputDto)?.map((i) => ({
            id: i.product.id,
            name: i.product.name,
            image: i.product.image.url ?? "/placeholder.png",
            price: i.product.price,
            quantity: i.quantity,
          })) ?? [];

          console.log("Logando a UI: " + ui)

        if (mounted) setItems(ui);
      } catch {
        if (mounted) setError("Erro inesperado");
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const subtotal = useMemo(
    () => (items ?? []).reduce((acc, it) => acc + it.price * it.quantity, 0),
    [items]
  );

  // Loading
  if (items === null && !error) {
    return (
      <div className="mx-auto max-w-6xl w-full px-4 py-6">
        <header className="mb-4">
          <h1 className="text-2xl font-semibold">Seu carrinho</h1>
          <p className="text-sm text-neutral-500">Carregando...</p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            <div className="h-28 rounded-2xl bg-neutral-200 animate-pulse" />
            <div className="h-28 rounded-2xl bg-neutral-200 animate-pulse" />
          </div>
          <div className="h-48 rounded-2xl bg-neutral-200 animate-pulse" />
        </div>
      </div>
    );
  }

  // Erro
  if (error) {
    return (
      <div className="mx-auto max-w-6xl w-full px-4 py-6">
        <h1 className="text-2xl font-semibold">Seu carrinho</h1>
        <p className="text-sm text-red-600 mt-2">{error}</p>
      </div>
    );
  }

  const hasItems = (items?.length ?? 0) > 0;

  return (
    <div className="mx-auto max-w-6xl w-full px-4 py-6">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">Seu carrinho</h1>
        <p className="text-sm text-neutral-500">Revise seus itens e finalize a compra</p>
      </header>

      {!hasItems ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
          <section className="col-span-2 ">
            <div className="space-y-4 p-1 border border-neutral-200/70 rounded-2xl shadow-sm ">
              <ul className="divide-y divide-neutral-200/70">
                {items!.map((item) => (
                  <CartRow key={item.id} item={item}
                    onUpdateQuantity={handleQuantityUpdate}
                    onRemove={handleRemove}
                    isLoading={loadingItems.has(item.id)}/>
                ))}
              </ul>
            </div>
          </section>

          <aside className="sticky top-6 h-fit space-y-4">
            <div className="border border-neutral-200/70 rounded-2xl shadow-sm p-5">
              <h2 className="text-lg">Resumo</h2>

              <div className="my-4 h-px bg-neutral-200" />

              <dl className="space-y-2">
                <div className="flex items-center justify-between text-base">
                  <dt className="text-neutral-600">Subtotal</dt>
                  <dd className="font-medium">{brl(subtotal)}</dd>
                </div>

                <div className="flex items-center justify-between text-base">
                  <dt className="font-semibold">Total</dt>
                  <dd className="font-semibold">{brl(subtotal)}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      )}
       {(items?.length ?? 0) > 0 && (
              <MobileStickyBar total={subtotal} onCheckout={() => {}} />
        )}
    </div>
  );
}
