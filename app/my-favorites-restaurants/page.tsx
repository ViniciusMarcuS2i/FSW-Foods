import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const MyFavoritesRestaurants = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const userFavoritesRestaurants = await db.userFavoriteResttaurant.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      restaurant: true,
    },
  });
  return (
    <>
      <Header />

      <div className="mx-auto max-w-[1224px] py-6 max-xl:px-5">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes favoritos</h2>
        <div className="grid w-full grid-cols-3 gap-6 max-lg:flex max-lg:flex-col">
          {userFavoritesRestaurants.length > 0 ? (
            userFavoritesRestaurants.map(({ restaurant }) => (
              <RestaurantItem
                className="min-w-full max-w-full"
                key={restaurant.id}
                restaurant={restaurant}
                userFavoriteRestaurants={userFavoritesRestaurants}
              />
            ))
          ) : (
            <h3 className="text-left font-medium text-muted-foreground">
              Você ainda não adicionou nenhum restaurante aos favoritos.
            </h3>
          )}
        </div>
      </div>
    </>
  );
};

export default MyFavoritesRestaurants;
