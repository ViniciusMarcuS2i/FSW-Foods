"use client";

import { Restaurant, UserFavoriteResttaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "../_lib/utils";
import { toggleFavoriteRestaurant } from "../_actions/restaurant";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import isRestaurantFavorited from "../_helpers/restaurant";

interface RestaurantItemProps {
  restaurant: Restaurant;
  className?: string;

  userFavoriteRestaurants?: UserFavoriteResttaurant[];
}

export const RestaurantItem = ({
  restaurant,
  className,

  userFavoriteRestaurants,
}: RestaurantItemProps) => {
  const { data } = useSession();

  const isFavorite = userFavoriteRestaurants?.some(
    (favorite) => favorite.restaurantId === restaurant.id,
  );

  const handleFavoriteClick = async () => {
    if (!data?.user.id) return;
    try {
      await toggleFavoriteRestaurant(data.user.id, restaurant.id);
      toast.success(
        isFavorite
          ? "Restaurante removido dos favoritos!"
          : "Restaurante favoritado com sucesso!",
      );
    } catch (e) {
      toast.error("Não foi possível favoritar o restaurante");
    }
  };

  return (
    <div>
      <div className={cn("min-w-[266px] max-w-[266px] space-y-3", className)}>
        <div className="relative h-[136px] w-full">
          <Link href={`/restaurants/${restaurant.id}`}>
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-lg object-cover"
            />
          </Link>
          <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-white px-2 py-[2px] text-black">
            <StarIcon size={12} className="fill-yellow-500 text-yellow-500" />
            <span className="text-xs font-semibold">5.0</span>
          </div>
          {data?.user.id && (
            <Button
              size="icon"
              className={`absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-700 ${isFavorite && "bg-primary hover:bg-gray-700"}`}
              onClick={handleFavoriteClick}
            >
              <HeartIcon className="h-fit w-fit fill-white" size={16} />
            </Button>
          )}
        </div>
        <div>
          <h3 className="text-sm font-semibold">{restaurant.name}</h3>
          <div className="flex items-center gap-3">
            {" "}
            <div className="flex items-center gap-1">
              <BikeIcon className="text-primary" size={14} />
              <span className="text-xs text-muted-foreground">
                {Number(restaurant.deliveryFee) === 0
                  ? "Entrega grátis"
                  : `R$${Number(restaurant.deliveryFee).toFixed(2)}`}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <TimerIcon className="text-primary" size={14} />
              <span className="text-xs text-muted-foreground">
                {restaurant.deliveryTimeMinutes}min
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
