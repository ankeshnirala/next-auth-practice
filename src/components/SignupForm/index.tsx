"use client"

import axios from "axios"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function SignupForm() {
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if(!name || !email || !password) {
            toast.error("All fields are neccessary.")
            return
        }

        try {
            await axios.post("api/signup", {name, email, password})
            const form = e.target;
            form.reset()
            router.push("/")
        }catch(err: any) {
            toast.error(err.response.data.message)
        }
    }

    return <div className="grid place-content-center h-screen">
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
            <h1 className="text-xl font-bold my-4 text-center">Enter Details</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input onChange={(event) => setName(event.target.value)} name="name" type="text" placeholder="Name" />
                <input onChange={(event) => setEmail(event.target.value)} name="email" type="text" placeholder="Email" />
                <input onChange={(event) => setPassword(event.target.value)} name="password" type="password" placeholder="Password" />
                <button className="bg-green-600 text-white py-2 font-semibold">SignUp</button>

                <Link className="text-center mt-3 text-sm" href={"/"}>
                    Already have an account? <span className="underline">SignIn</span>
                </Link>
            </form>
        </div>
    </div>
}