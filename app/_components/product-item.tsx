"use client";

import { Prisma, Product } from "@prisma/client";
import Image from "next/image";
import { calculateProdutTotalPrice } from "../_helpers/price";
import { ArrowDown, ArrowDown01Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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

export function ProductItem({ product, className }: ProductItemProps) {
  return (
    <Link
      className={cn("w-[150px] min-w-[150px] space-y-2", className)}
      href={`/products/${product.id}`}
    >
      <div className="w-full space-y-2">
        <div className="relative aspect-square w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="rounded-lg object-cover shadow-md"
          />
          <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary px-2 py-[2px] text-white">
            <ArrowDown size={12} />
            <span className="text-xs font-semibold">
              {" "}
              {product.discountPercentage}%
            </span>
          </div>
        </div>
        <div>
          <h2 className="truncate text-sm">{product.name}</h2>
          <div className="flex items-center gap-1">
            <h3 className="font-semibold">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
              }).format(Number(calculateProdutTotalPrice(product)))}
            </h3>
            {product.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {Intl.NumberFormat("pt-BR", {
                  currency: "BRL",
                  style: "currency",
                  minimumFractionDigits: 2,
                }).format(Number(product.price))}
              </span>
            )}
          </div>
          <span className="block text-xs text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>
      </div>
    </Link>
  );
}
