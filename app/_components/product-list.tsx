"use client";

import { Prisma } from "@prisma/client";

import ProductItem from "./product-item";
import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface ProductListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>[];
}

const ProductList = ({ products }: ProductListProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 2.3, spacing: 16 },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 3.5, spacing: 16 },
      },
      "(min-width: 748px)": {
        slides: { perView: 4.5, spacing: 16 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 5, spacing: 16 },
        initial: 0,
        slideChanged(slider) {
          setCurrentSlide(slider.track.details.rel);
        },
      },
      "(min-width: 1280px)": {
        slides: { perView: 6, spacing: 16 },
        initial: 0,
        slideChanged(slider) {
          setCurrentSlide(slider.track.details.rel);
        },
      },
    },
  });

  return (
    <div className="space-y-2">
      <div
        ref={sliderRef}
        className="keen-slider mx-auto flex max-w-[1224px] overflow-x-scroll max-xl:px-5 max-lg:max-w-full [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <div key={product.id} className="keen-slider__slide">
            <ProductItem product={product} />
          </div>
        ))}
      </div>
      <div className="mx-auto flex max-w-[1224px] items-center justify-end gap-2 max-xl:px-5">
        <Button
          className="z-10 hidden rounded-lg disabled:bg-primary/90 lg:block"
          onClick={(e: any) =>
            e.stopPropagation() || instanceRef.current?.prev()
          }
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="w-full text-white hover:brightness-125" />
        </Button>
        <Button
          className="z-10 hidden rounded-lg disabled:bg-primary/90 lg:block"
          onClick={(e: any) =>
            e.stopPropagation() || instanceRef.current?.next()
          }
          disabled={
            currentSlide ===
            instanceRef?.current?.track.details.slides.length! - 1
          }
        >
          <ChevronRight className="w-full text-white hover:brightness-125" />
        </Button>
      </div>
    </div>
  );
};

export default ProductList;
