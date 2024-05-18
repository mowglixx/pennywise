import User from "@/Models/User";
import dbConnect from "@/lib/dbConnect"

export async function GET(request, {params}){
    const username = params.username;

    try{

        await dbConnect();
        console.log(`DB Connected from GET::api/users/${username}`)

    } catch(e){
        console.log(e)
    }

    const user = await User.findOne()
    .select(['username'])
    .where('username').equals(username)
    .exec()

    if(!user?.username) return Response.json({
        user_exists: false
    })

    return Response.json({
        user_exists: true,
        result: user
    })
}