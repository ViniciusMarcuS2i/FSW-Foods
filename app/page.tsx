import Image from "next/image";
import Header from "./_components/header";
import Search from "./_components/search";
import CategoryList from "./_components/caterory-list";
import { BannerPromo } from "./_components/banner-promo";
import ProductList from "./_components/product-list";
import SectionTitle from "./_components/section-title";
import { db } from "./_lib/prisma";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";
import MainBanner from "./_components/main-banner";
import { getServerSession } from "next-auth";
import { authOptions } from "./_lib/auth";

const fetch = async () => {
  const getProducts = db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
    distinct: "name",
    orderBy: {
      name: "asc",
    },
  });

  const session = await getServerSession(authOptions);
  const getRestaurants = await db.restaurant.findMany({ take: 10 });
  const getUserFavoriteRestaurants = await db.userFavoriteResttaurant.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  const getBurgersCategory = db.category.findFirst({
    where: {
      name: "Hambúrgueres",
    },
  });

  const getPizzasCategory = db.category.findFirst({
    where: {
      name: "Pizzas",
    },
  });

  const [
    products,
    restaurants,
    userFavoriteRestaurants,
    burgersCategory,
    pizzasCategory,
  ] = await Promise.all([
    getProducts,
    getRestaurants,
    getUserFavoriteRestaurants,
    getBurgersCategory,
    getPizzasCategory,
  ]);

  return {
    products,
    restaurants,
    userFavoriteRestaurants,
    burgersCategory,
    pizzasCategory,
  };
};

const Home = async () => {
  const {
    products,
    restaurants,
    userFavoriteRestaurants,
    burgersCategory,
    pizzasCategory,
  } = await fetch();

  return (
    <>
      <Header />
      <div className="hidden px-5 pt-6 max-lg:block">
        <Search />
      </div>

      <div className="block max-lg:hidden">
        <MainBanner />
      </div>

      <div className="mx-auto max-w-[1224px] pt-6 max-lg:max-w-full">
        <CategoryList />
      </div>

      <div className="hidden px-5 pt-6 max-lg:block">
        <Link href={`/categories/${pizzasCategory?.id}/products`}>
          <BannerPromo
            src="/promo-banner.png"
            alt="Até 30% de desconto em pizzas"
          />
        </Link>
      </div>

      <div className="space-y-4 pt-6">
        <div className="px-5">
          <SectionTitle title="Pedidos recomendados" route="products" />
        </div>
        <ProductList products={products} />
      </div>

      <div className="hidden px-5 pt-6 max-lg:block">
        <Link href={`/categories/${burgersCategory?.id}/products`}>
          <BannerPromo
            src="/banner-promo-01.png"
            alt="A partir de 17,90 em lanches"
          />
        </Link>
      </div>

      <div className="mx-auto flex max-w-[1224px] gap-5 pt-6 max-xl:px-5 max-lg:hidden">
        <Link href={`/categories/${pizzasCategory?.id}/products`}>
          <BannerPromo
            src="/promo-banner.png"
            alt="Até 30% de desconto em pizzas"
          />
        </Link>

        <Link href={`/categories/${burgersCategory?.id}/products`}>
          <BannerPromo
            src="/banner-promo-01.png"
            alt="A partir de 17,90 em lanches"
          />
        </Link>
      </div>

      <div className="space-y-4 py-6">
        <div className="px-5">
          <SectionTitle title="Restaurantes recomendados" route="restaurants" />
        </div>
        <RestaurantList
          restaurants={restaurants}
          userFavoriteRestaurants={userFavoriteRestaurants}
        />
      </div>
    </>
  );
};

export default Home;
