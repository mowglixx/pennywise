import User from "@/Models/User";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect"
import BCrypt from 'bcrypt'


export const GET = auth(async function(req){

        try{
            
            await dbConnect();
            console.log('DB Connected from GET::api/users')
        } catch(e){
            console.log(e)
        }
        
        const users = await User.find().select(['_id'])
        
        return Response.json({result: users})
 })

export const PATCH = auth(async function(request){
    const {data, operation} = await request.json()
    return Response.json({message: 'User updated', request: {data, operation}})
})