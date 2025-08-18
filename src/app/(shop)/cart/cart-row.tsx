"use client"

import { Trash2, Heart, Minus, Plus} from "lucide-react";
import { CartItem } from "./page";
import {BRL} from "@/lib/utils/BRL"

export function CartRow({
  item,
  onUpdateQuantity,
  onRemove,
  onMoveToWishlist,
}: {
  item: CartItem;
  onUpdateQuantity?: (id: string, qty: number) => void;
  onRemove?: (id: string) => void;
  onMoveToWishlist?: (id: string) => void;
}) {
  return (
    <li className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-6">
      <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-neutral-100 sm:h-24 sm:w-24">
        {/* Substitua por <Image/> do Next no seu projeto */}
        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
      </div>

      <div className="flex w-full flex-col gap-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm font-medium leading-tight sm:text-base">{item.name}</h3>
            {item.variant && (
              <p className="mt-1 text-xs text-neutral-500">{item.variant}</p>
            )}
          </div>

          <div className="text-right">
            <span className="text-sm font-semibold sm:text-base">{BRL(item.price)}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <Quantity
            value={item.quantity}
            onChange={(q) => onUpdateQuantity?.(item.id, q)}
          />

          <div className="flex items-center gap-2">
            <button
              onClick={() => onMoveToWishlist?.(item.id)}
              className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-neutral-600 transition hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              <Heart className="h-4 w-4" />
              Favoritar
            </button>

            <button
              onClick={() => onRemove?.(item.id)}
              className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-rose-600 transition hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
            >
              <Trash2 className="h-4 w-4" />
              Remover
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}


function Quantity({ value, onChange }: { value: number; onChange?: (n: number) => void }) {
  const dec = () => onChange?.(Math.max(1, value - 1));
  const inc = () => onChange?.(value + 1);

  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-2 py-1 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <button
        aria-label="Diminuir quantidade"
        onClick={dec}
        className="rounded-lg p-1 transition hover:bg-neutral-100 active:scale-95 dark:hover:bg-neutral-800"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-6 text-center text-sm tabular-nums">{value}</span>
      <button
        aria-label="Aumentar quantidade"
        onClick={inc}
        className="rounded-lg p-1 transition hover:bg-neutral-100 active:scale-95 dark:hover:bg-neutral-800"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
