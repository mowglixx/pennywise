/*
  Warnings:

  - Added the required column `source` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `FoodBudget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bill" ADD COLUMN     "source" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "description" TEXT,
ADD COLUMN     "source" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FoodBudget" ADD COLUMN     "description" TEXT,
ADD COLUMN     "source" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Income" ADD COLUMN     "description" TEXT;
