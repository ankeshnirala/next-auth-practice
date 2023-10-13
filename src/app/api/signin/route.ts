import User from "@/lib/models/users";
import { connectMongoDb } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

interface INextRequest extends NextRequest {
    email: string;
    password: string;
}

export async function POST(req: INextRequest) {
   try{
    const { email, password } = await req.json()

    console.log(email, password);
    

    // await connectMongoDb()
    // const userExists = await User.findOne({email}).select("_id")

    // if(userExists) {
    //     throw new Error("user already exists")
    // }

    // await User.create({name, email, password})

    return NextResponse.json({mesaage: "user registered successfully"}, {status: 201})
   }catch(err: any) {    
    return NextResponse.json({message: err.message}, {status: 500})
   }
}