"use client";

import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductImageProps {
  product: Pick<Product, "name" | "imageUrl">;
}

export function ProductImage({ product }: ProductImageProps) {
  const router = useRouter();

  const handleGoBack = () => router.back();

  return (
    <div className="relative z-10 h-[360px] w-full">
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className="object-cover"
      />
      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
        size="icon"
        onClick={handleGoBack}
      >
        <ChevronLeft />
      </Button>
    </div>
  );
}
