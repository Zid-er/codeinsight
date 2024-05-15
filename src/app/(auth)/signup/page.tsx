"use client"
import Link from "next/link";
import { Button } from "~/ui/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

type Inputs = {
  email: string;
  password: string;
  username: string;
}

const registerUser = async (data: Inputs) => {
  try {
    const response = await axios.post("/api/signup", {
      ...data
    }, { withCredentials: true })
    return response.data
  } catch (error) {
    throw error
  }
}

const Signup = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await registerUser(data)
      console.log(response)
    } catch (error: any) {
      console.log('error', error.response)
    }
  }
  return (
    <form className="flex flex-col justify-center items-center translate-y-[30%] dark:text-[#ffffff]" onSubmit={handleSubmit(onSubmit)}>
      <div className="dark:bg-primary bg-slate-50 p-12 rounded min-w-[30%] gap-4 flex flex-col">
        <p className="text-xl font-medium pb-4">Signup</p>
        <div className="flex flex-col">
          <label>Username</label>
          <input {...register("username", { required: true })} className="border border-[#858585] outline-none px-2 py-2 rounded dark:border-[#2d2d2d] bg-transparent" />
        </div>
        <div className="flex flex-col">
          <label>Email</label>
          <input {...register("email", { required: true })} className="border border-[#858585] outline-none px-2 py-2 rounded dark:border-[#2d2d2d] bg-transparent" />
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <input {...register("password", { required: true })} className="border border-[#858585] outline-none px-2 py-2 rounded dark:border-[#2d2d2d] bg-transparent" type="password" />
        </div>
        <Button>Save</Button>
        <Link href="/login" className="text-xs text-blue-500">Login</Link>
      </div>
    </form>
  );
}

export default Signup;
