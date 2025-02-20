import { auth } from "@/auth";
import { prisma as p } from "@/prisma";
import { Shopping, Prisma } from "@prisma/client";
import { Session } from "next-auth";
import { NextRequest } from "next/server";

//update
export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

  const session: Session | null = await auth();
  const data: Shopping = await req.json();
  const id = (await params).id;

  if (!session?.user?.email) return Response.json({ message: "Not authenticated" }, { status: 401 })

  try {

    const updatedShopping = await p.shopping.update({
      where: { id },
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
            email: `${session?.user?.email}`
          }
        }
      }
    })

    return Response.json(updatedShopping)

  } catch (error) {

    return Response.json({ error })

  }


};


// // delete
export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

  const session: Session | null = await auth();
  const id = (await params).id;

  if (!session?.user?.email) return Response.json({ message: "Not authenticated" }, { status: 401 })

  try {

    const deletedShopping = await p.shopping.delete({
      where: {
        id, user: {
          email: session.user?.email
        }
      }
    })

    return Response.json(deletedShopping)

  } catch (error) {

    return Response.json({ error })

  }


};