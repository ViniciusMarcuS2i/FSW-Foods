import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import { Header } from "../_components/header";
import { RestaurantItem } from "../_components/restaurant-item";

const MyFavoriteRestaurantsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const userFavoriteRestaurants = await db.userFavoriteResttaurant.findMany({
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
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">
          Restaurantes Recomendados
        </h2>
        {userFavoriteRestaurants.length > 0 ? (
          <>
            <div className="flex flex-col gap-6">
              {userFavoriteRestaurants.map(({ restaurant }) => (
                <RestaurantItem
                  key={restaurant.id}
                  restaurant={restaurant}
                  className="min-w-full max-w-full"
                  userFavoriteRestaurants={userFavoriteRestaurants}
                />
              ))}
            </div>
          </>
        ) : (
          <h2>Você ainda não favoritou nenhum restaurante.</h2>
        )}
      </div>
    </>
  );
};

export default MyFavoriteRestaurantsPage;
