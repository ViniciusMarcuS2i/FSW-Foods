"use client";

import { DeliveryInfo } from "@/app/_components/delivery-info";
import { DiscountBadge } from "@/app/_components/discount-badge";
import { ProductList } from "@/app/_components/product-list";
import { Button } from "@/app/_components/ui/button";
import {
  calculateProdutTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";

import { Prisma } from "@prisma/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

export function ProductDetails({
  product,
  complementaryProducts,
}: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantityClick = () => setQuantity((state) => state + 1);
  const handleDecreaseQuantityClick = () => setQuantity((state) => state - 1);

  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5">
      <div className="flex items-center gap-[0.375rem] px-5">
        <div className="relative h-6 w-6">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>
      <h1 className="mb-1 mt-1 px-5 text-xl font-semibold">{product.name}</h1>
      <div className="flex justify-between px-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">
              {formatCurrency(calculateProdutTotalPrice(product))}
            </h2>
            {product.discountPercentage > 0 && (
              <DiscountBadge product={product} />
            )}
          </div>
          <span className="text-sm text-muted-foreground">
            De: {formatCurrency(Number(product.price))}
          </span>
        </div>
        <div className="flex items-center gap-3 text-center">
          <Button
            disabled={quantity === 1}
            size="icon"
            variant="ghost"
            className="border border-solid border-muted-foreground"
            onClick={handleDecreaseQuantityClick}
          >
            <ChevronLeft />
          </Button>
          <span className="w-4">{quantity}</span>
          <Button size="icon" onClick={handleIncreaseQuantityClick}>
            <ChevronRight />
          </Button>
        </div>
      </div>
      <DeliveryInfo restaurant={product.restaurant} />
      <div className="mt-6 space-y-3 px-5">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>
      <div className="mt-6 space-y-3">
        <h3 className="px-5 font-semibold">Sucos</h3>
        <ProductList products={complementaryProducts} />
      </div>

      <div className="mt-6 px-5">
        <Button className="w-full font-semibold">Adicionar à sacola</Button>
      </div>
    </div>
  );
}
