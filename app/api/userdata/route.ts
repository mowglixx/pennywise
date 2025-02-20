import { auth } from "@/auth";
import { calculateNextPayday } from "@/lib/helpers/calcDates";
import { prisma as p } from "@/prisma";

export const GET = async () => {

    const authSession = await auth();

    if (!authSession?.user?.email) {

        return Response.json({ message: "Not authenticated" }, { status: 401 })

    }

    try {
        const userData = await p.user.findUnique({
            where: {
                email: authSession.user.email
            },
            include: {
                incomes: true,
                expenses: true,
                bills: true,
                shopping: true,
            }
        })

        // sorts all paydays by nearest first
        const userDataSorted = {
            ...userData,
            incomes: userData?.incomes.sort((a, b) => {
                return calculateNextPayday({ startDate: a.receivedAt, interval: a.frequency }).getTime() - calculateNextPayday({ startDate: b.receivedAt, interval: b.frequency }).getTime();
            }),
            expenses: userData?.expenses.sort((a, b) => {
                return calculateNextPayday({ startDate: a.dueDate, interval: a.frequency }).getTime() - calculateNextPayday({ startDate: b.dueDate, interval: b.frequency }).getTime();

            }),
            bills: userData?.bills.sort((a, b) => {
                return calculateNextPayday({ startDate: a.dueDate, interval: a.frequency }).getTime() - calculateNextPayday({ startDate: b.dueDate, interval: b.frequency }).getTime();

            }),
            shopping: userData?.shopping.sort((a, b) => {
                return calculateNextPayday({ startDate: a.dueDate, interval: a.frequency }).getTime() - calculateNextPayday({ startDate: b.dueDate, interval: b.frequency }).getTime();

            }),

        }


        return Response.json(userDataSorted)

    } catch (error) {
        return Response.json({ error })
    }
};