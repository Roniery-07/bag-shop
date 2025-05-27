"use client"
import { ProductItem } from "../ProductCard"
import Slider  from "react-slick"


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const ProductSection = () => {
  const settings = {
    className: "center",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    centerPadding: "50px",
    arrows: false,
  };
  return (
    <div className="slide-container">
      <Slider {...settings}>
        {[1,2,3,4,5,6,7].map((item, i) => (
          <ProductItem key={i}/>
        ))}
      </Slider>
    </div>
  )
}
