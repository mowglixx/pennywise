import { auth } from "@/auth";
// import { IncomeModel } from "@/infrastructure/prismaRepository";
import { prisma as p } from "@/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";

// create
export const POST = async (req: NextRequest) => {

  const authSession = await auth();
  const data = await req.json()

  if (!authSession?.user?.email) {

    return Response.json({ message: "Not authenticated" }, { status: 401 })

  }
  try {

    const createdIncome = await p.income.create({
      data: {
        source: data.source,
        amount: new Prisma.Decimal(data.amount),
        frequency: data.frequency,
        tags: data.tags,
        receivedAt: new Date(data.receivedAt),
        user: {
          connect: {
            email: `${authSession.user.email}`
          }
        }
      }
    })

    return Response.json(createdIncome)

  } catch (error) {

    return Response.json({ error })

  }


};


// read
export const GET = async () => {

  const authSession = await auth();

  if (!authSession?.user?.email) {

    return Response.json({ message: "Not authenticated" }, { status: 401 })

  }

  try {
    if (authSession?.user) {

      console.log(`Incomes pulled for ${authSession?.user?.name}`)

      return Response.json(await p.income.findMany({
        where: {
          user: {
            email: `${authSession?.user?.email}`
          }
        },
        orderBy: {
          receivedAt: "asc"
        },
        select: {
          id: true,
          source: true,
          amount: true,
          tags: true,
          receivedAt: true,
          updatedAt: true
        }
      })
      )
    }
  } catch (error) {
    return Response.json({ error })
  }
};
