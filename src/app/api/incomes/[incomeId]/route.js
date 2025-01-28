import Income from "@/Models/Income";
import dbConnect from "@/lib/dbConnect";

import { auth } from "@/lib/auth";
import { ObjectId } from "mongodb";

// get an income by id
export const GET = auth(async function( request, params){
    // check the user is logged in
    if(!request.auth) return Response.json("Not Authorised", {status: 401});   
    
    // get the document using findOne to search by owner and ObjectId
    await dbConnect();
    const {incomeId} = params;
    console.log(JSON.stringify(request.auth.user, null, 2))
    const foundIncome = await Income.findOne({
        _id: new ObjectId(incomeId), 
        owner: request.auth.user.id
    })
    
    // if the user is allowed, return a status of the request and the result
    return Response.json({
        status: 'ok',
        message: "Income Found",
        result: foundIncome
    })


})

// Update an Income
export const PUT = auth(async function( request, {params}){
    if (!request.auth) return Response.json("Not Authorised", {status: 401});
    
    const content = await request.json();
    const {incomeId} = params;
    
    await dbConnect();
    const updatedIncome = await Income.findOneAndUpdate({ 
        _id: new ObjectId(incomeId), 
        owner: request.auth.user.id 
    }, content, { new: true })
    // console.log({updatedIncome, content, incomeId})
    return Response.json({
        status: 'ok',
        message: "Income Updated",
        result: updatedIncome
    })  
})


// Delete an income
export const DELETE = auth(async function( request, {params}){
    if (!request.auth) return Response.json("Not Authorised", {
        status: 401
    });
    
    const {incomeId} = params;
    
    await dbConnect();
    const deletedIncome = await Income.findOneAndDelete({ 
        _id: new ObjectId(incomeId), 
        owner: request.auth.user.id 
    }, { new: false })
    return Response.json({
        status: 'ok',
        message: "Income Deleted",
        result: deletedIncome
    })  
})
