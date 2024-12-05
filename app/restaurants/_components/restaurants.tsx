"use client";

import { Restaurant, UserFavoriteResttaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import searchForRestaurants from "../_actions/search";
import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";

interface RestaurantProps {
  userFavoriteRestaurants: UserFavoriteResttaurant[];
}

const Restaurants = ({ userFavoriteRestaurants }: RestaurantProps) => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return;
      const foundRestaurants = await searchForRestaurants(searchFor);
      setRestaurants(foundRestaurants);
    };

    fetchRestaurants();
  }, [searchFor]);

  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="mx-auto max-w-[1224px] py-6 max-xl:px-5">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Encontrados</h2>
        <div className="grid w-full grid-cols-3 gap-6 max-lg:flex max-lg:flex-col">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full max-w-full"
              userFavoriteRestaurants={userFavoriteRestaurants}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
