/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client"

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import dar from '~/assets/darrow.svg';
import moon from '~/assets/moon.svg';
import sun from '~/assets/sun.svg';
import Card from "~/components/Card";
import { useThemeStore } from "~/stores/general";
import { type PostT } from "~/types/PostT";

export default function Home() {
  const mock_data = [
    {
      id: 1,
      title: "In 10 Days!",
      description: "Created in 10 Days: Brendan Eich created JavaScript in just 10 days in May 1995 while working at Netscape Communications Corporation. It was originally named Mocha, then changed to LiveScript before finally settling on JavaScript.",
      tag: "JS"
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
      tag: "JS"
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
      tag: "JS"
    }
  ]
  const { theme, setTheme } = useTheme()
  const [hasMounted, setHasMounted] = useState(false);
  const [dropdown, setDropdown] = useState<boolean>(false)

  let dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target as Node)) {
        setDropdown(false)
      }
    }

    document.addEventListener("mousedown", handler)

    return () => {
      document.removeEventListener("mousedown", handler)
    }
  })
  useEffect(() => {setHasMounted(true)}, []);
  
  // this line is the key to avoid the error.
  if (!hasMounted) return null;

  return (
    <div className="flex flex-col py-12 gap-2 md:px-32">
      <div className="flex flex-row gap-1 items-center w-full">
        <button className="px-6 py-2 dark:bg-primary rounded bg-slate-50 dark:text-white">All*</button>
        <div ref={dropdownRef} >
          <button onClick={() => setDropdown((openState) => !openState)} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="bg-slate-50 focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-2 dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary dark:text-white" type="button">
            Tag 
            <Image src={dar} alt="dbl d arrow" width="10" height="10" className="bg-transparent" />
          </button>

          <div id="dropdown" className={`${ dropdown ? '' : 'hidden' } w-1/6 max-w-60 absolute md:left-36 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow px-2 dark:bg-[#131313] mt-3`}>
            <div className='flex flex-wrap gap-2 p-3 px-1'>
              <p className={`border dark:border-[#282828] rounded-lg text-sm px-2 py-1 bg-transparent hover:opacity-50 hover:border-lime-600 dark:text-white`}>Javascript</p>
              <p className={`border dark:border-[#282828] rounded-lg text-sm px-2 py-1 bg-transparent hover:opacity-50 hover:border-lime-600 dark:text-white`}>C++</p>
              <p className={`border dark:border-[#282828] rounded-lg text-sm px-2 py-1 bg-transparent hover:opacity-50 hover:border-lime-600 dark:text-white`}>C#</p>
              <p className={`border dark:border-[#282828] rounded-lg text-sm px-2 py-1 bg-transparent hover:opacity-50 hover:border-lime-600 dark:text-white`}>Python</p>
              <p className={`border dark:border-[#282828] rounded-lg text-sm px-2 py-1 bg-transparent hover:opacity-50 hover:border-lime-600 dark:text-white`}>Go</p>
              <p className={`border dark:border-[#282828] rounded-lg text-sm px-2 py-1 bg-transparent hover:opacity-50 hover:border-lime-600 dark:text-white`}>Rust</p>
              <p className={`border dark:border-[#282828] rounded-lg text-sm px-2 py-1 bg-transparent hover:opacity-50 hover:border-lime-600 dark:text-white`}>DSA</p>
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
      <div className="flex flex-col gap-2">
        {
          mock_data.map((post:PostT) => {
            return <Card key={post.id} {...post} />
          })
        }
      </div>
    </div>
  );
}
