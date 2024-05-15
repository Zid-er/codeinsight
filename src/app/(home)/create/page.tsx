"use client";
import { useState } from "react";
import { Button } from "~/ui/Button";


const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

  const create = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log("Hi: ", title, description, tag)
    if (!title || !description || !tag) throw Error("Empty fields!")
    await fetch(`/api/post/create`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag,
        projectId: 1
      }),
    });
  };
  return (
    <form className="flex flex-col justify-center items-center translate-y-[5%] dark:text-[#ffffff]" onSubmit={create}>
      <div className="dark:bg-primary bg-slate-50 p-12 rounded w-[50%] gap-4 flex flex-col">
        <p className="text-xl font-medium pb-4">Create Insight</p>
        <div className="flex flex-col">
          <label className="dark:text-[#b5b5b5] text-sm">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="border border-[#858585] outline-none px-2 py-2 rounded dark:border-[#2d2d2d] bg-transparent" />
        </div>
        <div className="flex flex-col">
          <label className="dark:text-[#b5b5b5] text-sm">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="border border-[#858585] outline-none px-2 py-2 rounded dark:border-[#2d2d2d] bg-transparent min-h-[20rem]" ></textarea>
        </div>
        <div className="flex flex-col">
          <label className="dark:text-[#b5b5b5] text-sm">Tag</label>
          <input value={tag} onChange={(e) => setTag(e.target.value)} className="border border-[#858585] outline-none px-2 py-2 rounded dark:border-[#2d2d2d] bg-transparent" />
        </div>
        <Button>Save</Button>
      </div>
    </form>
  )
}

export default Create
