"use client";

import RestaurantItem from "./restaurant-item";

import { Prisma } from "@prisma/client";
import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface RestaurantListProps {
  restaurants: Prisma.RestaurantGetPayload<{}>[];
  userFavoriteRestaurants: Prisma.UserFavoriteResttaurantGetPayload<{}>[];
}

const RestaurantList = ({
  restaurants,
  userFavoriteRestaurants,
}: RestaurantListProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 1.2, spacing: 16 },
    breakpoints: {
      "(min-width: 748px)": {
        slides: { perView: 2.5, spacing: 16 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 16 },
        initial: 0,
        slideChanged(slider) {
          setCurrentSlide(slider.track.details.rel);
        },
      },
      "(min-width: 1280px)": {
        slides: { perView: 4, spacing: 16 },
        initial: 0,
        slideChanged(slider) {
          setCurrentSlide(slider.track.details.rel);
        },
      },
    },
  });

  return (
    <>
      <div
        ref={sliderRef}
        className="keen-slider relative mx-auto flex max-w-[1224px] overflow-x-scroll max-xl:px-5 max-lg:max-w-full [&::-webkit-scrollbar]:hidden"
      >
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="keen-slider__slide">
            <RestaurantItem
              restaurant={restaurant}
              userFavoriteRestaurants={userFavoriteRestaurants}
            />
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
    </>
  );
};

export default RestaurantList;
