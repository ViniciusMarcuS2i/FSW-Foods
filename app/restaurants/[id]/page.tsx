import { notFound } from "next/navigation";
import { db } from "../../_lib/prisma";
import RestaurantImage from "./_components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/product-list";
import CartBanner from "./_components/cart-banner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import Header from "@/app/_components/header";
import SectionTitle from "@/app/_components/section-title";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const session = await getServerSession(authOptions);

  const userFavoriteRestaurants = await db.userFavoriteResttaurant.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <>
      <div className="mb-6 block max-lg:hidden">
        <Header withSearch />
      </div>
      <div className="mx-auto max-w-[1224px] pb-6 max-lg:max-w-full">
        <div className="flex gap-8 max-lg:flex-col">
          <RestaurantImage
            restaurant={restaurant}
            userFavoriteRestaurants={userFavoriteRestaurants}
          />
          <div className="flex-1">
            <div className="relative z-10 -mt-[1.5rem] flex items-center justify-between rounded-t-lg bg-white pt-5 max-xl:px-5">
              <div className="flex items-center gap-[0.375rem]">
                <div className="relative h-8 w-8">
                  <Image
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>

                <h1 className="text-xl font-semibold">{restaurant.name}</h1>
              </div>

              <div className="flex items-center gap-1 rounded-lg bg-foreground px-[10px] py-[7px] text-white">
                <StarIcon
                  size={12}
                  className="fill-yellow-500 text-yellow-400"
                />
                <span className="text-xs font-semibold">5.0</span>
              </div>
            </div>
            <div className="max-xl:px-5">
              <DeliveryInfo restaurant={restaurant} />
            </div>
            <div className="mt-3 flex gap-4 overflow-scroll max-xl:px-5 [&::-webkit-scrollbar]:hidden">
              {restaurant.categories.map((category) => (
                <div
                  key={category.id}
                  className="min-w-[164px] rounded-sm bg-[#f4f4f4] text-center"
                >
                  <span className="truncate text-xs text-muted-foreground">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 max-lg:hidden">
              <h2 className="mt-6 font-semibold">Sobre</h2>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                voluptatum accusantium repellendus similique alias praesentium
                sed? Nemo labore suscipit deleniti laudantium debitis, neque
                ipsa itaque excepturi sit culpa fugiat perferendis.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <h2 className="font-semibold max-xl:px-5">Mais pedidos</h2>
          <ProductList products={restaurant.products} />
        </div>

        {restaurant.categories.map((category) => (
          <div key={category.id} className="mt-6 space-y-4">
            <h2 className="font-semibold max-xl:px-5">{category.name}</h2>
            <ProductList products={category.products} />
          </div>
        ))}

        <CartBanner restaurant={restaurant} />
      </div>
    </>
  );
};

export default RestaurantPage;
