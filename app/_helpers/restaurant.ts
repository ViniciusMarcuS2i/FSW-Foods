import { UserFavoriteResttaurant } from "@prisma/client";

const isRestaurantFavorited = (
  restaurantId: string,
  userFavoriteRestaurants: UserFavoriteResttaurant[],
) => {
  userFavoriteRestaurants?.some(
    (favorite) => favorite.restaurantId === restaurantId,
  );
};

export default isRestaurantFavorited;
