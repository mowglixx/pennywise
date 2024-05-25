// import Income from "@/Models/Income";
import Income from "@/Models/Income";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";

// Create a new Income
export const PUT = auth(async function (request) {
  if (!request.auth)
    return Response.json(
      {
        message: "Unauthorised, please login.",
      },
      {
        status: 401,
      }
    );

  const userId = request.auth.user.id;
  

  let newIncome = [];

  try {
    await dbConnect();
    newIncome = await Income.create({
    ...request.body,
      user: {
        $oid: userId,
      },
    }).save();
  } catch (e) {
    console.error(e);
    return Response.json({ newIncome });
  }
  return Response.json([...newIncome]);
});

// Read all incomes from auth user
export const GET = auth(async function (request) {
  if (!request.auth)
    return Response.json(
      {
        message: "Unauthorised, please login.",
      },
      {
        status: 401,
      }
    );

  const userId = request.auth.user.id;

  await dbConnect();
  let Incomes = (await Income.find().where("user").equals(userId)) ?? [];
  return Response.json(Incomes);
});
