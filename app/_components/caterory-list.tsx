import { db } from "../_lib/prisma";
import { CategoryItem } from "./category-item";

export async function CategoryList() {
  const categories = await db.category.findMany({});

  return (
    <div className="grid grid-cols-2 gap-3">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}
