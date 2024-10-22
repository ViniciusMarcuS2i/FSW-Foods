import { Prisma } from "@prisma/client";
import { db } from "../_lib/prisma";
import { ProductItem } from "./product-item";

interface PruductListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>[];
}

export async function ProductList({ products }: PruductListProps) {
  return (
    <div className="flex gap-6 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {products.map((products) => (
        <ProductItem key={products.id} product={products} />
      ))}
    </div>
  );
}
