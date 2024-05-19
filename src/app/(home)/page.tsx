/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client"

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import dar from '~/assets/darrow.svg';
import moon from '~/assets/moon.svg';
import sun from '~/assets/sun.svg';
import Card from "~/components/Card";
import { type PostType } from "~/types/PostType";
import Link from 'next/link';
import { Button } from '~/ui/Button';


const mock_data = [
  {
    id: 1,
    title: "In 10 Days!",
    description: "Created in 10 Days: Brendan Eich created JavaScript in just 10 days in May 1995 while working at Netscape Communications Corporation. It was originally named Mocha, then changed to LiveScript before finally settling on JavaScript.",
    tag: "Javascript"
  },
  {
    id: 2,
    title: "Difference between Interface & Type in TypeScript",
    description: `
    - Types in TypeScript allow you to create an alias for a specific data type, combination of data types, or a complex structure.
    - They can be used to define custom types such as primitive types, union types, tuple types, and more.
    - Types are flexible and can represent a wide range of values, including primitive types, objects, functions, and more.
    - Interfaces in TypeScript are used to define the structure of an object. They describe the properties and methods that an object must have.
    - Interfaces can be implemented by classes, ensuring that the class implements all properties and methods defined in the interface.
    - Interfaces are open-ended, meaning you can extend them later to add additional properties or methods.`,
    tag: "Javascript"
  },
  {
    id: 3,
    title: "CONST VS LET VS VAR",
    description: `
    - var:
    - - Function-scoped.
    - - Hoisted to the top of its function or global scope.
    - - Allows redeclaration and reassignment.
    - - Can be accessed before declaration (with undefined value).
    - let:
    - - Block-scoped.
    - - Not hoisted to the top of the block.
    - - Allows reassignment but not redeclaration within the same block scope.
    - - Cannot be accessed before declaration.
    - const:
    - - Block-scoped.
    - - Not hoisted to the top of the block.
    - - Requires initialization during declaration.
    - - Prevents reassignment and redeclaration within the same block scope.
    - - Provides immutability for assigned values (not for objects, arrays, etc.).`,
    tag: "Javascript"
  },
  {
    id: 4,
    title: "Test Go!",
    description: "Created in 10 Days: Brendan Eich created JavaScript in just 10 days in May 1995 while working at Netscape Communications Corporation. It was originally named Mocha, then changed to LiveScript before finally settling on JavaScript.",
    tag: "Go"
  },
  {
    id: 5,
    title: "Test C++!",
    description: "Created in 10 Days: Brendan Eich created JavaScript in just 10 days in May 1995 while working at Netscape Communications Corporation. It was originally named Mocha, then changed to LiveScript before finally settling on JavaScript.",
    tag: "C++"
  },
]

type PostsResponse = {
  posts: PostType[],
}

type Tag = {
  title: string,
  selected: boolean
}

const getPosts = async (tagsQueryString = "") => {
  try {
    const res = await axios.get<PostsResponse>(`/api/post/get?tags=${tagsQueryString}`, { withCredentials: true })
    return res.data.posts
  } catch (error) {
    console.log(error)
  }
}

const tags = [
  { title: "Javascript", selected: true },
  { title: "C++", selected: true },
  { title: "Go", selected: true },
  { title: "Rust", selected: true },
  { title: "Python", selected: true },
]

export default function Home() {
  const { resolvedTheme: theme, setTheme } = useTheme()
  const [hasMounted, setHasMounted] = useState(false);
  const [dropdown, setDropdown] = useState<boolean>(false)
  const [selectedTags, setSelectedTags] = useState<Tag[]>([...tags])
  const tagsQueryString = selectedTags.filter(tag => tag.selected).map(tag => tag.title).join(",")
  const { data: posts } = useQuery({
    queryKey: ["posts", tagsQueryString],
    queryFn: () => getPosts(tagsQueryString)
  })

  // code to close tagsDropdown on click outside of it
  let dropdownRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    setHasMounted(true)
    let handler = (e: MouseEvent) => {
      if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target as Node)) {
        setDropdown(false)
      }
    }
    document.addEventListener("mousedown", handler)

    return () => {
      document.removeEventListener("mousedown", handler)
    }
  }, [])

  function handleTagSelection(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    // @ts-ignore
    const tagToAdd: string = e.target.id
    setSelectedTags((prevSelectedTags) => {
      return prevSelectedTags.map(tag => {
        if (tag.title === tagToAdd) {
          return { title: tag.title, selected: !tag.selected }
        }
        return tag
      })
    });
  }

  const tagIsSelected = (tag: string) => {
    return selectedTags.some(item => item.title === tag && item.selected)
  }

  const tagOptions = tags.map((tag) =>
    <button key={tag.title} id={tag.title} onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleTagSelection(e)}
      className={`border dark:border-[#282828] rounded-lg text-sm px-2 py-1 hover:opacity-50 hover:border-lime-600 ` + (tagIsSelected(tag.title) ? "bg-lime-400 dark:text-black" : "dark:text-white")}>{tag.title}</button>)

  // this line is the key to avoid the error.
  if (!hasMounted) return null;
  return (
    <div className="flex flex-col py-12 gap-2 md:px-32">
      <div className="flex flex-row gap-1 items-center w-full justify-between">
        <div className="flex flex-row items-center">
          <button className="px-6 py-2 dark:bg-primary rounded bg-slate-50 dark:text-white">All*</button>
          <div ref={dropdownRef} >
            <button onClick={() => setDropdown((openState) => !openState)} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="bg-slate-50 focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-2 dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary dark:text-white" type="button">
              Tag
              <Image src={dar} alt="dbl d arrow" width="10" height="10" className="bg-transparent w-auto h-auto" />
            </button>

            <div id="dropdown" className={`${dropdown ? '' : 'hidden'} w-1/5 max-w-60 absolute md:left-36 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow px-2 dark:bg-[#131313] mt-3`}>
              <div className='flex flex-wrap gap-2 p-3 px-1 w-full'>
                {tagOptions}
              </div>
            </div>
          </div>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="px-4 py-2 dark:bg-primary rounded flex flex-row gap-4 justify-center items-center bg-slate-50 dark:text-white">
            {/* {theme === "dark" ? "light" : "dark"} */}
            {
              theme === "dark" ?
                <Image src={sun} alt="sun" width="20" height="20" className="bg-transparent" />
                :
                <Image src={moon} alt="moon" width="20" height="20" className="bg-transparent" />
            }
          </button>
        </div>
        <Button><Link href="/create">Create +</Link></Button>

      </div>
      {selectedTags && <div className="flex flex-col gap-2">
        {
          mock_data.map((post, i) => {
            if (selectedTags.find(tag => tag.title === post.tag && tag.selected)) {
              return (
                <Link href={`/posts/${post.id}`} key={i}>
                  <Card key={post.id} {...post} />
                </Link>
              )
            } else {
              return (
                null
              )
            }
          })
        }
      </div>}
    </div>
  );
}
