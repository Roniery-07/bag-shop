'use client';

import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/product-card';
import { ListProductOutputDto } from '@/usecases/product/list-product.usecases';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Props {
  products: ListProductOutputDto;
  itemsPerPage?: number;
  gap?: string; // ex.: "px-4" ou "pr-2"
}

export function ProductSection({
  products,
  itemsPerPage = 4,
  gap = 'px-4',
}: Props) {
  const sliderRef = useRef<Slider | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="flex flex-col relative max-w-5xl w-full">
      <Slider ref={sliderRef} {...settings}>
        {products.map((p) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </Slider>
    </div>
  );
}
