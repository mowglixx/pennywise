
import Income from "@/Models/Income";
import dbConnect from "@/lib/dbConnect";

import { auth } from "@/lib/auth";



/////////////////////////////////////////////////////////////////////////////////////////////
// Read all incomes from auth user
export const GET = auth(async function (request) {
  if (!request.auth) return Response.json("Unauthorised.", { status: 401 });
  
  const userId = request.auth.user.id;

  await dbConnect();
  let Incomes = (await Income.find().where("owner").equals(userId)) ?? [];
  return Response.json(Incomes);
});



/////////////////////////////////////////////////////////////////////////////////////////////
// Create a new Income
export const POST = auth(async function (request) {
  if (!request.auth) return Response.json("Unauthorised.", {status: 401});
  const userId = request.auth.user.id;

  const body = await request.json();
  // console.log({ API: body });

  let newIncome = [];

  try {
    await dbConnect();
    newIncome = await Income.create({
      ...body,
      owner: userId,
    });
  } catch (e) {
    return Response.json(e, {status: 500});
  }
  return Response.json({
    message: 'ok',
    result: newIncome
  }, {status: 200});
});