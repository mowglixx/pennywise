/*
  Warnings:

  - You are about to drop the `FoodBudget` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FoodBudget" DROP CONSTRAINT "FoodBudget_userId_fkey";

-- AlterTable
ALTER TABLE "Bill" ALTER COLUMN "tags" SET DEFAULT ARRAY[]::TEXT[];

-- DropTable
DROP TABLE "FoodBudget";

-- CreateTable
CREATE TABLE "Shopping" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "description" TEXT,
    "amount" MONEY NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "dueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "frequency" "Frequency" NOT NULL,

    CONSTRAINT "Shopping_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Shopping" ADD CONSTRAINT "Shopping_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
