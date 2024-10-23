import { Product } from "@prisma/client";
import { ArrowDown } from "lucide-react";

interface ProductItemProps {
  product: Pick<Product, "discountPercentage">;
}

export function DiscountBadge({ product }: ProductItemProps) {
  return (
    <div className="left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary px-2 py-[2px] text-white">
      <ArrowDown size={12} />
      <span className="text-xs font-semibold">
        {" "}
        {product.discountPercentage}%
      </span>
    </div>
  );
}
