import { Product } from "@prisma/client";

export const calculateProdutTotalPrice = (product: Product): number => {
  if (product.discountPercentage === 0) {
    Number(product.price);
  }

  const discount = Number(product.price) * (product.discountPercentage / 100);

  return Number(product.price) - discount;
};

export const formatCurrency = (value: number): string => {
  return `R$${Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value)}`;
};
