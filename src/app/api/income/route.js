import Income from "@/Models/Income";
import { auth } from "@/lib/auth";

export const GET = auth(async function PUT(request){
    if(!request.auth) return Response.json(
        {
            message: "Unauthorised, please login."
        },
        {
            status: 401
        }
    ) 
    return Response.json(
        {
            hey: "hey"
        }
    )
})