"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

export const toggleFavoriteRestaurant = async (
  userId: string,
  restaurantId: string,
) => {
  const isFavorite = await db.userFavoriteResttaurant.findFirst({
    where: {
      userId,
      restaurantId,
    },
  });

  if (isFavorite) {
    await db.userFavoriteResttaurant.delete({
      where: {
        userId_restaurantId: {
          userId,
          restaurantId,
        },
      },
    });
    revalidatePath("/");
    return;
  }

  await db.userFavoriteResttaurant.create({
    data: {
      userId,
      restaurantId,
    },
  });
  revalidatePath("/");
};
