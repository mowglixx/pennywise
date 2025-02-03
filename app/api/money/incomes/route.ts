import { auth } from "@/auth"
import { PrismaClient } from "@prisma/client"
import Error from "next/error"

const p = new PrismaClient()

export const GET = auth(async (request) => {

    // const name = request.nextUrl.searchParams.get("name")
    // const email = request.nextUrl.searchParams.get("email")
    // const image = request.nextUrl.searchParams.get("image")

    // if (request.auth) {

    //     const user = await p.user.create({
    //         data: {
    //             name: name || "",
    //             email: email || "",
    //             image: image || ""
    //         }
    //     })

    try{
        // p.income.create({})
        return Response.json({
            data: {},
            message: ""
        })
    }catch(e: Error){

        return Response.json({
            message: e.message
        }, {status: 401})

    }

        
    }
})