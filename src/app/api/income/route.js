// import Income from "@/Models/Income";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";

export const GET = auth(async function(request){
    if(!request.auth) return Response.json(
        {
            message: "Unauthorised, please login."
        },
        {
            status: 401
        }
    ) 
    await dbConnect();

    const userId = request.auth.user.id
    console.error({userId})
    return Response.json(
        {
            hey: "hey",
            userId: userId || ''
        }
    )
})