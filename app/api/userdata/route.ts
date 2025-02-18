import { auth } from "@/auth";
import { prisma as p } from "@/prisma";

export const GET = async () => {

    const authSession = await auth();

    if (!authSession?.user?.email) {

        return Response.json({ message: "Not authenticated" }, { status: 401 })

    }

    try {
        if (authSession?.user) {
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