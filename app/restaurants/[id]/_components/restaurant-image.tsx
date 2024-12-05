"use client";

import { Button } from "@/app/_components/ui/button";
import isRestaurantFavorited from "@/app/_helpers/restaurant";
import UseToggleFavoriteRestaurant from "@/app/_hooks/use-toggle-favorite-restaurant";

import { Restaurant, UserFavoriteResttaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "id" | "name" | "imageUrl">;
  userFavoriteRestaurants: UserFavoriteResttaurant[];
}

const RestaurantImage = ({
  restaurant,
  userFavoriteRestaurants,
}: RestaurantImageProps) => {
  const { data } = useSession();

  const router = useRouter();

  const isFavorite = isRestaurantFavorited(
    restaurant.id,
    userFavoriteRestaurants,
  );

  const { handleFavoriteClick } = UseToggleFavoriteRestaurant({
    restaurantId: restaurant.id,
    userId: data?.user.id,
    restaurantIsFavorited: isFavorite,
  });

  const handleBackClick = () => router.back();

  return (
    <div className="relative h-[380px] w-full max-lg:h-[250px]">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        sizes="100%"
        className="rounded-sm object-cover max-lg:rounded-none"
      />

      <Button
        className="absolute left-4 top-4 hidden rounded-full bg-white text-foreground hover:text-white max-lg:flex"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        size="icon"
        className={`absolute right-4 top-4 hidden rounded-full bg-gray-700 max-lg:flex ${
          (isFavorite as any) && "bg-primary hover:bg-gray-700"
        }`}
        onClick={handleFavoriteClick}
      >
        <HeartIcon size={20} className="fill-white" />
      </Button>
    </div>
  );
};

export default RestaurantImage;
