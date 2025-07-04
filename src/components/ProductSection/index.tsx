"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { ProductDTO } from "@lib/modules/product/product.dto"; 


interface Props {
  products: ProductDTO[];
  itemsPerPage?: number;   // quantos cards aparecem de cada vez
  gap?: string;            // espaçamento entre cards (classe tailwind)
}

export function ProductSection({
  products,
  itemsPerPage = 4,
  gap = "gap-4",
}: Props) {
  // total de páginas
  const pageCount = Math.ceil(products.length / itemsPerPage);

  // página atual (0-based)
  const [page, setPage] = useState(0);

  // impede navegar “além”
  const prev = () => setPage((p) => Math.max(p - 1, 0));
  const next = () => setPage((p) => Math.min(p + 1, pageCount - 1));

  // fatia visível
  const visible = useMemo(
    () =>
      products.slice(
        page * itemsPerPage,
        page * itemsPerPage + itemsPerPage
      ),
    [products, page, itemsPerPage]
  );

  return (
    <div className="relative">
      {/* setas */}
      <button
        onClick={prev}
        disabled={page === 0}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow
                   disabled:opacity-30 disabled:pointer-events-none"
        aria-label="Página anterior"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={next}
        disabled={page === pageCount - 1}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow
                   disabled:opacity-30 disabled:pointer-events-none"
        aria-label="Próxima página"
      >
        <ChevronRight />
      </button>

      {/* faixa de cards */}
      <div
        className={`overflow-hidden`} /* espaço p/ setas */
      >
        <ul
          // animação: desloca toda a faixa de acordo com a página
          className={`flex transition-transform duration-1000 ${gap}`}
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {products.map((p) => (
            <li
              key={p.id}
              className={`min-w-[calc(100%/${itemsPerPage})]`}
            >
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}