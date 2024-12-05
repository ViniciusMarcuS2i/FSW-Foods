import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";

interface CategoriesPageProps {
  params: {
    id: string;
  };
}

const CategoriesPage = async ({ params: { id } }: CategoriesPageProps) => {
  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      products: {
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
  return (
    <>
      <div className="max-lg:hidden">
        <Header withSearch />
      </div>

      <div className="hidden max-lg:block">
        <Header />
      </div>

      <div className="mx-auto max-w-[1224px] py-6 max-xl:px-5">
        <h2 className="mb-6 text-lg font-semibold">{category?.name}</h2>
        <div className="grid grid-cols-6 gap-6 max-lg:grid-cols-2">
          {category?.products.map((product) => (
            <ProductItem
              className="min-w-full"
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
