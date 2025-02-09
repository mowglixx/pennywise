// import { prisma } from '@/prisma';
import { Income, Expense, FoodBudget, Bill, Prisma } from '@prisma/client';
// import { PrismaClient } from '@prisma/client/extension';

// import { Income } from '@prisma/client';


// class PrismaRepository {

//     private client: PrismaClient= prisma




// }
// Workaround for Decimals in Postgres so react-hook-form is easier to work with
export type IncomeInputs = Income & {
    amount: number;
}

export type Frequency = "ONEOFF"
    | "DAILY"
    | "WEEKLY"
    | "FORTNIGHTLY"
    | "FOURWEEKLY"
    | "MONTHLY"
    | "QUARTERLY"
    | "ANNUALLY";

export class IncomeModel {
    id: string;
    userId: string;
    source: string;
    amount: number | string;
    tags?: string[];
    receivedAt: Date;      // @default(now())
    createdAt?: Date;      // @default (now())
    updatedAt?: Date;      // @updatedAt
    frequency: Frequency;

    constructor(income: Income) {
        this.id = income.id
        this.userId = income.userId
        this.source = income.source
        this.amount = income.amount.toNumber()
        this.tags = income.tags
        this.receivedAt = income.receivedAt
        this.createdAt = income.createdAt || undefined
        this.updatedAt = income.updatedAt || undefined
        this.frequency = income.frequency
    }
}
