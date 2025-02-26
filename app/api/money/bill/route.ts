import { auth } from "@/auth";
import { prisma as p } from "@/prisma";
import { Bill, Prisma } from "@prisma/client";
import { Session } from "next-auth";
import { NextRequest } from "next/server";


export const POST = async (req: NextRequest) => {

  const authSession: Session | null = await auth();
  const data: Bill = await req.json()

  if (!authSession?.user?.email) {

    return Response.json({ message: "Not authenticated" }, { status: 401 })

  }
  try {

    const createdBill = await p.bill.create({
      data: {
        source: data.source,
        description: data.description,
        amount: new Prisma.Decimal(data.amount),
        frequency: data.frequency,
        tags: data.tags,
        dueDate: new Date(data.dueDate),
        paid: data.paid,
        user: {
          connect: {
            email: `${authSession.user.email}`
          }
        }
      }
    })

    return Response.json(createdBill)

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

      return Response.json(await p.bill.findMany({
        where: {
          user: {
            email: `${authSession?.user?.email}`
          }
        },
        orderBy: {
          dueDate: "asc"
        },
        select: {
          id: true,
          source: true,
          amount: true,
          tags: true,
          dueDate: true,
          updatedAt: true
        }
      })
      )
    }
  } catch (error) {
    return Response.json({ error })
  }
};
