/*
  Warnings:

  - You are about to drop the column `incurredAt` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `shoppingDate` on the `FoodBudget` table. All the data in the column will be lost.
  - Added the required column `frequency` to the `Bill` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AltFrequency" AS ENUM ('SECOND', 'MINUTE', 'HOUR', 'DAY', 'WEEK', 'MONTH', 'YEAR');

-- AlterTable
ALTER TABLE "Bill" DROP COLUMN "incurredAt",
ADD COLUMN     "dueDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "frequency" "Frequency" NOT NULL;

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "category";

-- AlterTable
ALTER TABLE "FoodBudget" DROP COLUMN "shoppingDate",
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
