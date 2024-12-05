"use client";

import { Prisma, Product } from "@prisma/client";
import Image from "next/image";
import { calculateProdutTotalPrice, formatCurrency } from "../_helpers/price";
import Link from "next/link";
import DiscountBadge from "./discount-badge";
import { cn } from "../_lib/utils";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
  className?: string;
}

const ProductItem = ({ product, className }: ProductItemProps) => {
  return (
    <Link
      className={cn("min-w-[150px] max-w-[150px] space-y-2", className)}
      href={`/products/${product.id}`}
    >
      <div className="relative aspect-square w-full rounded-sm border border-muted">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-sm object-cover"
        />

        <div className="absolute left-2 top-2">
          <DiscountBadge product={product} />
        </div>
      </div>

      <div>
        <h2 className="truncate text-sm">{product.name}</h2>
        <div className="flex items-baseline gap-1">
          <span className="font-semibold">
            {formatCurrency(calculateProdutTotalPrice(product))}
          </span>

          {product.discountPercentage > 0 && (
            <span className="text-xs text-muted-foreground line-through">
              {formatCurrency(Number(product.price))}
            </span>
          )}
        </div>
        <span className="block text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>
    </Link>
  );
};

export default ProductItem;
