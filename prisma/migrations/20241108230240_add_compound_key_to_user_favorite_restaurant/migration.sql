/*
  Warnings:

  - The primary key for the `UserFavoriteResttaurant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserFavoriteResttaurant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,restaurantId]` on the table `UserFavoriteResttaurant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserFavoriteResttaurant" DROP CONSTRAINT "UserFavoriteResttaurant_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "UserFavoriteResttaurant_userId_restaurantId_key" ON "UserFavoriteResttaurant"("userId", "restaurantId");
