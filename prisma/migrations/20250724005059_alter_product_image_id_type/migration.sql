/*
  Warnings:

  - The primary key for the `ProductImages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ProductImages` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ProductImages" DROP CONSTRAINT "ProductImages_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "ProductImages_pkey" PRIMARY KEY ("id");
