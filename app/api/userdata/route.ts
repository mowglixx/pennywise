import { auth } from "@/auth";
import { prisma as p } from "@/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async () => {

    const authSession = await auth();

    if (!authSession?.user?.email) {

        return Response.json({ message: "Not authenticated" }, { status: 401 })

    }

    try {
        if (authSession?.user) {

            console.log(`Incomes pulled for ${authSession?.user?.name}`)

            return Response.json(await p.user.findUnique({
                where: {
                    email: authSession.user.email
                },
                include: {
                    incomes: true,
                    expenses: true,
                    bills: true,
                    food_shop: true,
                }
            }))
        }
    } catch (error) {
        return Response.json({ error })
    }
};