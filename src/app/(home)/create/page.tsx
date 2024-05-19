"use client";
import { Button } from "~/ui/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

type Inputs = {
  title: string;
  description: string;
  tag: string;
}

const createPost = async (data: Inputs) => {
  try {
    const response = await axios.post("/api/post/create", {
      ...data,
      projectId: 1
    }, { withCredentials: true })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const Create = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await createPost(data)
    console.log(response)
  };
  return (
    <form className="flex flex-col justify-center items-center translate-y-[5%] dark:text-[#ffffff]" onSubmit={handleSubmit(onSubmit)}>
      <div className="dark:bg-primary bg-slate-50 p-12 rounded w-[50%] gap-4 flex flex-col">
        <p className="text-xl font-medium pb-4">Create Insight</p>
        <div className="flex flex-col">
          <label className="dark:text-[#b5b5b5] text-sm">Title</label>
          <input {...register("title")} className="border border-[#858585] outline-none px-2 py-2 rounded dark:border-[#2d2d2d] bg-transparent" />
        </div>
        <div className="flex flex-col">
          <label className="dark:text-[#b5b5b5] text-sm">Description</label>
          <textarea {...register("description")} className="border border-[#858585] outline-none px-2 py-2 rounded dark:border-[#2d2d2d] bg-transparent min-h-[20rem]" ></textarea>
        </div>
        <div className="flex flex-col">
          <label className="dark:text-[#b5b5b5] text-sm">Tag</label>
          <input {...register("tag")} className="border border-[#858585] outline-none px-2 py-2 rounded dark:border-[#2d2d2d] bg-transparent" />
        </div>
        <Button>Save</Button>
      </div>
    </form>
  )
}

export default Create
