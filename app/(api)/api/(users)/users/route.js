import User from "@/Models/User";
import dbConnect from "@/lib/dbConnect";
import BCrypt from "bcrypt";

const projection = {
  username: 1,
};

// get all users
export async function GET() {
  await dbConnect();
  const filter = {};
  let result = [];
  try {
    result = await User.find(filter, projection).lean();
  } catch (e) {
    return Response.json({ e });
  }
  return Response.json({ result });
}

// Search for a User with a username
export async function POST(request) {
  await dbConnect();
  const { username, email } = await request.json();
  let result = [];
  try {
    result = await User.find().byUsername(username).lean();
  } catch (e) {
    return Response.json({ error: e.code });
  }

  const filteredResult = result.map(({ _id, username }) => ({ _id, username }));

  return Response.json({
    result: filteredResult,
    count: filteredResult?.length,
  });
}
