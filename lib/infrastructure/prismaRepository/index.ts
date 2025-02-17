import { Income, Expense, FoodBudget, Bill, Prisma, User } from '@prisma/client';

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

export class UserDataModel {
    name?: string
    email: string
    image?: string
    incomes: IncomeModel[]
    expenses: Expense[]
    bills: Bill[]
    food_shop: FoodBudget[]
    emailVerified?: Date

    constructor(user: User & { incomes: IncomeModel[], expenses: Expense[], bills: Bill[], food_shop: FoodBudget[] }) {
        this.name = user.name || undefined
        this.email = user.email
        this.image = user.image || undefined
        this.incomes = user.incomes || []
        this.expenses = user.expenses || []
        this.bills = user.bills || []
        this.food_shop = user.food_shop || []

        this.emailVerified = user.emailVerified || undefined
    }
}