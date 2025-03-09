import { auth } from "@/auth";
import { prisma as p } from "@/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";

//update
export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

  const authSession = await auth();
  const data = await req.json();
  const id = (await params).id;

  if (!authSession?.user?.email) {

    return Response.json({ message: "Not authenticated" }, { status: 401 })

  }
  try {

    const updatedIncome = await p.income.update({
      where: { id },
      data: {
        source: data.source,
        description: data.description,
        amount: new Prisma.Decimal(data.amount),
        frequency: data.frequency,
        tags: data.tags,
        dueDate: new Date(data.dueDate),
        user: {
          connect: {
            email: `${authSession.user.email}`
          }
        }
      }
    })

    return Response.json(updatedIncome)

  } catch (error) {

    return Response.json({ error })

  }


};


// // delete
export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

  const authSession = await auth();
  const id = (await params).id;

  if (!authSession?.user?.email) {

    return Response.json({ message: "Not authenticated" }, { status: 401 })

  }
  try {

    const updatedIncome = await p.income.delete({
      where: { id }
    })

    return Response.json(updatedIncome)

  } catch (error) {

    return Response.json({ error })

  }


};