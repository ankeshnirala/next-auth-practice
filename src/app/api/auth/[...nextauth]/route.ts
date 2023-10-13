import NextAuth from "next-auth/next";
import CredentialsProvider from 'next-auth/providers/credentials';

import User from "@/lib/models/users";
import { connectMongoDb } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            
            async authorize(credentials) {
                const cred: any = credentials
                
                try{
                    await connectMongoDb()
                    const user = await User.findOne({email: cred.email})

                    if(!user) {
                        return null
                    }

                    if(!(await user.correctPassword(cred.password, user.password))){
                        console.log(user);
                        
                        return null
                    }

                    return user
                }catch(err){
                    console.log(err);
                    
                    return null
                }
            }
        })
    ],
    session: {strategy: "jwt"},
    secret: process.env.NEXTAUTH_SECRET,
    pages: { signIn: "/" }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }