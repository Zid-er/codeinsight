"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { userStore } from "~/stores/general";
import { Button } from "~/ui/Button";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
}

const loginUser = async (data: Inputs) => {
  try {
    const response = await axios.post("/api/login", {
      ...data
    }, { withCredentials: true })
    return response.data
  } catch (error) {
    throw error
  }
}

const Login = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const updateUser = userStore((state) => state.updateUser)
  const router = useRouter()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await loginUser(data)
      if (response) {
        updateUser(response.user.payload)
      }
      router.replace("/")
    } catch (error: any) {
      console.log('error', error.response)
    }
  }

  return (
    <form className="flex flex-col justify-center items-center translate-y-[50%] dark:text-[#ffffff]" onSubmit={handleSubmit(onSubmit)}>
      <div className="dark:bg-primary bg-slate-50 p-12 rounded min-w-[30%] gap-4 flex flex-col">
        <p className="text-xl font-medium pb-4">Login</p>
        <div className="flex flex-col">
          <label>Email</label>
          <input {...register("email", { required: true })} className="border border-[#858585] outline-none px-2 py-2 rounded dark:border-[#2d2d2d] bg-transparent" />
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <input {...register("password", { required: true })} className="border border-[#858585] outline-none px-2 py-2 rounded dark:border-[#2d2d2d] bg-transparent" type="password" />
        </div>
        <Button>Save</Button>
        <Link href="/signup" className="text-xs text-blue-500">Signup</Link>
      </div>
    </form>
  );
}

export default Login;
