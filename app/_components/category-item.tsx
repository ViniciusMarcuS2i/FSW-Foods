import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link
      href={`/categories/${category.id}/products`}
      className="flex min-w-40 items-center justify-center gap-1 rounded-sm border border-muted bg-white px-4 py-3 min-[1024px]:w-60"
    >
      <Image
        src={category.imageUrl}
        alt={category.name}
        width={30}
        height={30}
      />

      <span className="truncate text-sm font-semibold">{category.name}</span>
    </Link>
  );
};

export default CategoryItem;
