/*
  Warnings:

  - Made the column `dueDate` on table `Bill` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Bill" ALTER COLUMN "dueDate" SET NOT NULL;

-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "dueDate" SET DEFAULT CURRENT_TIMESTAMP;
