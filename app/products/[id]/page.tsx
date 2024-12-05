import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import ProductDetails from "./_components/product-details";
import ProductList from "@/app/_components/product-list";
import { Prisma } from "@prisma/client";
import Header from "@/app/_components/header";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: product?.restaurant.id,
      },
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <div className="mx-auto max-w-[1224px] max-lg:max-w-full max-lg:pb-6">
      <div className="mb-6 block max-lg:hidden">
        <Header withSearch />
      </div>
      <div className="flex items-center justify-start max-lg:flex-col lg:px-5 min-[1024px]:gap-8 xl:px-0">
        <ProductImage product={product} />
        <ProductDetails product={product} />
      </div>

      <div className="my-6 space-y-3">
        <h3 className="px-5 font-semibold">Sucos</h3>
        <ProductList products={juices} />
      </div>
    </div>
  );
};

export default ProductPage;
