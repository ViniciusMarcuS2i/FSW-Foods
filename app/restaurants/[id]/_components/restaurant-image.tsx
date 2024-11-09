"use client";

import { Button } from "@/app/_components/ui/button";
import isRestaurantFavorited from "@/app/_helpers/restaurant";
import UseToggleFavoriteRestaurant from "@/app/_hooks/use-toggle-favorite-restaurant";
import { Restaurant, UserFavoriteResttaurant } from "@prisma/client";
import { ChevronLeft, HeartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "id" | "name" | "imageUrl">;
  userFavoriteRestaurants: UserFavoriteResttaurant[];
}

export function RestaurantImage({
  restaurant,
  userFavoriteRestaurants,
}: RestaurantImageProps) {
  const router = useRouter();
  const { data } = useSession();
  const isFavorite = userFavoriteRestaurants?.some(
    (favorite) => favorite.restaurantId === restaurant.id,
  );

  const { handleFavoriteClick } = UseToggleFavoriteRestaurant({
    restaurantId: restaurant.id,
    userId: data?.user.id,
    restaurantIsFavorited: isFavorite,
  });

  const handleGoBack = () => router.back();

  return (
    <div className="relative z-10 h-[250px] w-full">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />
      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
        size="icon"
        onClick={handleGoBack}
      >
        <ChevronLeft />
      </Button>
      <Button
        size="icon"
        className={`absolute right-4 top-4 rounded-full bg-gray-700 ${isFavorite && "bg-primary hover:bg-gray-700"}`}
        onClick={handleFavoriteClick}
      >
        <HeartIcon className="fill-white" size={20} />
      </Button>
    </div>
  );
}
