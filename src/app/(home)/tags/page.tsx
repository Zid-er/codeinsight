"use client"

import { useEffect, useState } from 'react'

interface TagOption {
    title: string
    description: string
}

export default function TagsPage() {
    const tagValues: TagOption[] = [{
        title: "Javascript",
        description: "Javascript description"
    }, {
        title: "Go",
        description: "Go Description"
    }, {
        title: "C++",
        description: "C++ Description"
    }]
    const [selectedTags, setSelectedTags] = useState<Map<string, boolean>>(new Map<string, boolean>())

    useEffect(() => {
        const initTags = new Map(selectedTags) // set all tags to selected initially
        for (let tag of tagValues) {
          initTags.set(tag.title, true);
        }
        setSelectedTags(initTags)
    }, [])

    function handleTagSelection(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        // @ts-ignore
        const tagToAdd: string = e.currentTarget.id

        setSelectedTags((prevSelectedTags) => {
          const updatedSelectedTags = new Map(prevSelectedTags);
          updatedSelectedTags.set(tagToAdd, !prevSelectedTags.get(tagToAdd));
          return updatedSelectedTags;
        });
    }

    const toggleSwitch = (tagTitle: string) => {
        if (selectedTags.get(tagTitle)) {
            return (
                <div className='flex w-14 h-8 bg-lime-600 rounded-full justify-end'>
                    <span className='h-8 w-8 bg-white rounded-full'></span>
                </div>
            )
        }
        else {
            return (
                <div className='flex w-14 h-8 bg-gray-600 rounded-full'>
                    <span className='h-8 w-8 bg-white rounded-full'></span>
                </div>
            )
        }
    }
    
    const tagOptions = tagValues.map((tagOption) =>
    <div key={tagOption.title} id={tagOption.title} onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => handleTagSelection(e)} className={`text-start flex flex-col gap-2`}>
            <h2 className='text-2xl px-3'>{tagOption.title}</h2>
            <div className={'hover:opacity-50 hover:border-lime-600 mb-3 border flex items-center dark:bg-primary justify-between dark:border-[#282828] p-4 rounded-lg text-md italic'}>
                <p>{tagOption.description}</p>
                {toggleSwitch(tagOption.title)}
            </div>
    </div>
    )
    
    return (
        <main className="h-[90vh] w-full flex flex-col justify-center items-center px-6 py-2 dark:bg-[#111111] rounded bg-slate-50 dark:text-white">
            <h1 className='text-3xl w-2/3 p-3'>Topics</h1>
            <hr className='w-2/3 mb-9 border-gray-200 dark:border-gray-700'/>
            <div className="flex flex-col gap-2 w-2/3 px-2">
                {tagOptions}
            </div>
        </main>
    )
}