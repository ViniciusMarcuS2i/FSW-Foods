import { db } from "../_lib/prisma";
import { ProductItem } from "./product-item";

export async function ProductList() {
  const products = await db.product.findMany({
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
  });

  return (
    <div className="flex gap-6 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {products.map((products) => (
        <ProductItem key={products.id} product={products} />
      ))}
    </div>
  );
}
