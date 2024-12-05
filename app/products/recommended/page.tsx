import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";

const RecommendedProductsPage = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    include: {
      restaurant: {
        select: {
          name: true,
          id: true,
        },
      },
    },
    distinct: "name",
    orderBy: {
      categoryId: "desc",
    },
  });
  return (
    <>
      <Header />

      <div className="mx-auto max-w-[1224px] py-6 max-xl:px-5">
        <h2 className="mb-6 text-lg font-semibold">Pedidos recomendados</h2>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-5">
          {products.map((product) => (
            <ProductItem
              className="min-w-full max-w-full"
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedProductsPage;
