import { auth } from "@/auth";
// import { IncomeModel } from "@/infrastructure/prismaRepository";
import { prisma as p } from "@/prisma";
import { Prisma } from "@prisma/client";

// create
export const POST = auth(async (req) => {

  const data = await req.json()

  if (!req.auth?.user?.email) {

    return Response.json({ message: "Not authenticated" }, { status: 401 })

  }
  try {

    const createdIncome = await p.income.create({
      data: {
        source: data.source,
        amount: new Prisma.Decimal(data.amount),
        frequency: data.frequency,
        receivedAt: new Date(data.receivedAt),
        user: {
          connect: {
            email: `${req.auth.user.email}`
          }
        }
      }
    })

    return Response.json(createdIncome)

  } catch (error) {

    return Response.json({ error })

  }


})


// read
export const GET = auth(async (req) => {
  try {
    if (req?.auth?.user) {

      console.log(`Incomes pulled for ${req.auth.user.name}`)

      return Response.json(await p.income.findMany({
        where: {
          user: {
            email: `${req.auth.user.email}`
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
  return Response.json({ message: "Not authenticated" }, { status: 401 })
})
