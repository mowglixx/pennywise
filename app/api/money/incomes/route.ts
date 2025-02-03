import { auth } from "@/auth"
// import { PrismaClient } from "@prisma/client"
import { NextRequest } from "next/server"

// const p = new PrismaClient()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = auth(async (_: NextRequest) => {

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
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (e: any) {

        return Response.json({
            message: e?.message
        }, {status: 401})

    }

        

})