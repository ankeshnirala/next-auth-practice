"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { signIn } from "next-auth/react"

export default function SigninForm() {

    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if(!email || !password) {
            toast.error("All feilds are required")
            return
        }

        try{
            await signIn("credentials", { email, password, redirect: false })
            toast.success("SignIn success")
            router.push("/dashboard")
        }catch(error: any){
            toast.error(error.message)
        }
    }

    return <div className="grid place-content-center h-screen">
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
            <h1 className="text-xl font-bold my-4 text-center">Enter Details</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" />
                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                <button className="bg-green-600 text-white py-2 font-semibold">SignIn</button>

                <Link className="text-center mt-3 text-sm" href={"/signup"}>
                    Dont't have an account? <span className="underline">SignUp</span>
                </Link>
            </form>
        </div>
    </div>
}