"use client"

import { useEffect, useState, useRef } from 'react'

export default function TagsPage() {
    const tagValues = ["Javascript", "C++", "Go", "Rust", "Python"]
    const [selectedTags, setSelectedTags] = useState<Map<string, boolean>>(new Map<string, boolean>())

    useEffect(() => {
        const initTags = new Map(selectedTags) // set all tags to selected initially
        for (let tag of tagValues) {
          initTags.set(tag, true);
        }
        setSelectedTags(initTags)
    }, [])

    function handleTagSelection(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        // @ts-ignore
        const tagToAdd: string = e.target.id
        setSelectedTags((prevSelectedTags) => {
          const updatedSelectedTags = new Map(prevSelectedTags);
          updatedSelectedTags.set(tagToAdd, !prevSelectedTags.get(tagToAdd));
          return updatedSelectedTags;
        });
    }
    
    const tagOptions = tagValues.map((tagOption) =>
    <button key={tagOption} id={tagOption} onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleTagSelection(e)}
        className={`border dark:border-[#282828] rounded-lg text-sm px-2 py-1 hover:opacity-50 hover:border-lime-600 ` + (selectedTags.get(tagOption) ? "bg-lime-400 dark:text-black" : "dark:text-white")}>{tagOption}</button>
    )
    
    return (
        <main className="h-[90vh] w-full flex justify-center items-center px-6 py-2 dark:bg-primary rounded bg-slate-50 dark:text-white">
            {tagOptions}
        </main>
    )
}