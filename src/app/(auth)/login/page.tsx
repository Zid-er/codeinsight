"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/ui/Button";

const Login = () => {
    const router = useRouter()

    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const handleSubmit = async  (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (!password || !email) throw Error("Empty fields!")
        try {
            const res = await axios(`/api/login`, {
                method: "POST",
                withCredentials: true,
                data: { email: email, password: password},
            });
            console.log(res)
            // document.cookie = `token=${res.data.token}`
            router.replace("/")
        } catch(_) {
            router.replace("/signin")
        }
    }
    return (
        <form className="flex flex-col justify-center items-center translate-y-[50%] dark:text-[#ffffff]" onSubmit={handleSubmit}>
            <div className="dark:bg-primary bg-slate-50 p-12 rounded min-w-[30%] gap-4 flex flex-col">
                <p className="text-xl font-medium pb-4">Login</p>
                <div className="flex flex-col">
                    <label>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)}  className="border border-[#858585] outline-none px-2 py-2 rounded dark:border-[#2d2d2d] bg-transparent" />
                </div>
                <div className="flex flex-col">
                    <label>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)}  className="border border-[#858585] outline-none px-2 py-2 rounded dark:border-[#2d2d2d] bg-transparent" type="password" />
                </div>
                <Button>Save</Button>
                <Link href="/signup" className="text-xs text-blue-500">Signup</Link>
            </div>
        </form>
    );
}
 
export default Login;