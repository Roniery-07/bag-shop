"use client";

import React, { useState, useRef } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/product-card";
import { ListProductOutputDto } from "@/usecases/product/list-product.usecases";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props {
  products: ListProductOutputDto;
  itemsPerPage?: number;
  gap?: string; // ex.: "px-4" ou "pr-2"
}

export  function ProductSection({
  products,
  itemsPerPage = 4,
  gap = "px-4",
}: Props) {
  /* ---------- estado / refs ---------- */
  const sliderRef = useRef<Slider | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);

  /* ---------- configurações slick ---------- */
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: itemsPerPage,
    slidesToScroll: itemsPerPage, // “vai” um bloco inteiro
    draggable: false,
    afterChange: () => setUpdateCount((c) => c + 1),
    beforeChange: (_current: number, next: number) => setSlideIndex(next),
  };

  /* ---------- helpers ---------- */
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const goTo = (idx: number) => sliderRef.current?.slickGoTo(idx);

  const prev = () => {
    if (slideIndex > 0) goTo(slideIndex - itemsPerPage);
  };

  const next = () => {
    if (slideIndex < (pageCount - 1) * itemsPerPage)
      goTo(slideIndex + itemsPerPage);
  };

  return (
    <div className="relative w-4xl">
      {/* contador (exemplo do original) */}
      <p className="sr-only">Total updates: {updateCount}</p>

      {/* setas */}
      <button
        aria-label="Página anterior"
        onClick={prev}
        disabled={slideIndex === 0}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow
                   disabled:opacity-30 disabled:pointer-events-none"
      >
        <ChevronLeft />
      </button>

      <button
        aria-label="Próxima página"
        onClick={next}
        disabled={slideIndex >= (pageCount - 1) * itemsPerPage}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow
                   disabled:opacity-30 disabled:pointer-events-none"
      >
        <ChevronRight />
      </button>

      {/* slider */}
      <Slider ref={sliderRef} {...settings} className="overflow-hidden">
        {products.map((p) => (
          <div key={p.id} className={gap}>
            <ProductCard product={p} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
