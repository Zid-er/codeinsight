"use client"

import { useState } from "react";

const Login = () => {
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const handleSubmit = async  (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (!password || !email || !username) throw Error("Empty fields!")
        await fetch(`/api/signin`, {
            method: "POST",
            credentials: "include",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
                username: username,
            }),
        });
    }
    return (
        <form className="flex flex-col justify-center items-center translate-y-[50%] dark:text-[#ffffff]" onSubmit={handleSubmit}>
            <div className="dark:bg-primary bg-slate-50 p-12 rounded min-w-[30%] gap-4 flex flex-col">
                <p className="text-xl font-medium pb-4">Signin</p>
                <div className="flex flex-col">
                    <label>Username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)}  className="border border-primary outline-none px-2 py-2 rounded dark:border-[#2d2d2d] bg-transparent" />
                </div>
                <div className="flex flex-col">
                    <label>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)}  className="border border-primary outline-none px-2 py-2 rounded dark:border-[#2d2d2d] bg-transparent" />
                </div>
                <div className="flex flex-col">
                    <label>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)}  className="border border-primary outline-none px-2 py-2 rounded dark:border-[#2d2d2d] bg-transparent" type="password" />
                </div>
                <button type="submit" className="bg-blue-600 rounded px-6 py-2">Save</button>
            </div>
        </form>
    );
}
 
export default Login;