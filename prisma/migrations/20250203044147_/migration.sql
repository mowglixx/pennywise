/*
  Warnings:

  - You are about to drop the column `refundId` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `refundId` on the `Income` table. All the data in the column will be lost.
  - You are about to drop the `AdHocExpense` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Refund` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WeeklyFoodShopping` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `paid` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AdHocExpense" DROP CONSTRAINT "AdHocExpense_refundId_fkey";

-- DropForeignKey
ALTER TABLE "AdHocExpense" DROP CONSTRAINT "AdHocExpense_userId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_refundId_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_refundId_fkey";

-- DropForeignKey
ALTER TABLE "Refund" DROP CONSTRAINT "Refund_userId_fkey";

-- DropForeignKey
ALTER TABLE "WeeklyFoodShopping" DROP CONSTRAINT "WeeklyFoodShopping_refundId_fkey";

-- DropForeignKey
ALTER TABLE "WeeklyFoodShopping" DROP CONSTRAINT "WeeklyFoodShopping_userId_fkey";

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "refundId",
ADD COLUMN     "paid" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Income" DROP COLUMN "refundId";

-- DropTable
DROP TABLE "AdHocExpense";

-- DropTable
DROP TABLE "Refund";

-- DropTable
DROP TABLE "WeeklyFoodShopping";

-- CreateTable
CREATE TABLE "FoodBudget" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "paid" BOOLEAN NOT NULL,
    "shoppingDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "frequency" "Frequency" NOT NULL,

    CONSTRAINT "FoodBudget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bill" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "paid" BOOLEAN NOT NULL,
    "incurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FoodBudget" ADD CONSTRAINT "FoodBudget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
