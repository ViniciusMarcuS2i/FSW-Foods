-- CreateTable
CREATE TABLE "UserFavoriteResttaurant" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFavoriteResttaurant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserFavoriteResttaurant" ADD CONSTRAINT "UserFavoriteResttaurant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteResttaurant" ADD CONSTRAINT "UserFavoriteResttaurant_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
