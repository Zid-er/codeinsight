"use client";
import { useState } from "react";


const Create = () => {
    const [title, setTitle] = useState("CONST VS LET VS VAR");
    const [description, setDescription] = useState(`const:
    Variable declared using const keyword cannot be reassigned.
    It must be initialized during declaration.
    Block-scoped.
    let:
    Variable declared using let keyword can be reassigned.
    It must be initialized during declaration, but can be reassigned later.
    Block-scoped.
    var:
    Variables declared using var are function-scoped or globally-scoped.
    They can be reassigned and re-declared within the same scope.
    Hoisted to the top of their function or global scope.`);
    const [tag, setTag] = useState("javascript");

    const create = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        console.log("Hi: ", title, description, tag)
        if (!title || !description || !tag) throw Error("Empty fields!")
        await fetch(`/api/post`, {
            method: "POST",
            credentials: "include",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            title: title,
            description: description,
            tag: tag
            }),
        });
    };
    return (
        <form className="flex flex-col justify-center items-center translate-y-[5%] dark:text-[#ffffff]" onSubmit={create}>
            <div className="dark:bg-primary bg-slate-50 p-12 rounded w-[50%] gap-4 flex flex-col">
                <p className="text-xl font-medium pb-4">Create Insight</p>
                <div className="flex flex-col">
                    <label className="dark:text-[#b5b5b5] text-sm">Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)}  className="border border-primary outline-none px-2 py-2 rounded dark:border-[#2d2d2d] bg-transparent" />
                </div>
                <div className="flex flex-col">
                    <label className="dark:text-[#b5b5b5] text-sm">Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="border border-primary outline-none px-2 py-2 rounded dark:border-[#2d2d2d] bg-transparent min-h-[20rem]" ></textarea>
                </div>
                <div className="flex flex-col">
                    <label className="dark:text-[#b5b5b5] text-sm">Tag</label>
                    <input value={tag} onChange={(e) => setTag(e.target.value)}  className="border border-primary outline-none px-2 py-2 rounded dark:border-[#2d2d2d] bg-transparent" />
                </div>
                <button type="submit" className="bg-blue-600 rounded px-6 py-2">Save</button>
            </div>
        </form>
    )
}

export default Create