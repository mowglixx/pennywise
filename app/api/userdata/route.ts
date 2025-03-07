import { auth } from "@/auth";
import { calculateAllPaydaysThisMonth, calculateNextPayday, compareDates, getNextDate } from "@/lib/helpers/calcDates";
import { prisma as p } from "@/prisma";
import { Frequency } from "@/lib/infrastructure/prismaRepository";


export const GET = async () => {

    const authSession = await auth();

    if (!authSession?.user?.email) {

        return Response.json({ message: "Not authenticated" }, { status: 401 })

    }

    try {
        const userData = (await p.user.findUnique({
            where: {
                email: authSession.user.email
            },
            include: {
                incomes: true,
                expenses: true,
                bills: true,
                shopping: true,
            }
        })) || {
            incomes: [],
            expenses: [],
            bills: [],
            shopping: [],
        }

        const userDataWithPaydays = {
            ...userData,
            incomes: calculateAllPaydaysThisMonth(userData?.incomes),
            expenses: calculateAllPaydaysThisMonth(userData?.expenses),
            bills: calculateAllPaydaysThisMonth(userData?.bills),
            shopping: calculateAllPaydaysThisMonth(userData?.shopping),

        }
        console.log(JSON.stringify(userDataWithPaydays, null, 2))

        return Response.json(userDataWithPaydays)


    } catch (error) {
        return Response.json({ error })
    }

};