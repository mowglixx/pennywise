/*
  Warnings:

  - Made the column `description` on table `Bill` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Expense` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Income` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Shopping` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Bill" ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "Income" ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "Shopping" ALTER COLUMN "description" SET NOT NULL;
