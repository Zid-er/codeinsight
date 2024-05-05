/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client"

import Image from 'next/image';
import { useState } from 'react';
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
      title: "5 common performance footguns in Javascript",
      description: "From the '==' operator to using Javascript objects when you shouldn't, there are many ways you could be writing JS wrong...",
      tag: "Javascript"
    },
    {
      id: 2,
      title: "What's the deal with Golang HTTP libraries?",
      description: "Evaluating the pros and cons of different ways to do HTTP networking in Golang and what is each method's best use case.",
      tag: "Golang"
    },
    {
      id: 3,
      title: "A roadmap to Leetcode enlightenment",
      description: "Breaking down and explaining tangible steps you can take to getting good at Leetcode",
      tag: "DSA"
    }
  ]
  const isDark = useThemeStore((state) => state.isDark)
  const updateMode = useThemeStore((state) => state.updateMode)
  const darkMode = () => {
    const value = !isDark
    updateMode(value)
    const is_there = localStorage.getItem("darkMode") 
    if (is_there === null) {
      localStorage.setItem("darkMode", "true")
    } else if (is_there === "true") {
      localStorage.setItem("darkMode", "false")
    } else if (is_there === "false") {
      localStorage.setItem("darkMode", "true")
    }
  }
  const [dropdown, setDropdown] = useState<boolean>(false)
  const unDrop = () => {
    setDropdown(false)
  }
//   useEffect(() => {
    // if (dropdown) {
    //   document.addEventListener("click", unDrop)
    // }
    // return () => {
    //   console.log("REMOVED!")
    //   document.removeEventListener("click", unDrop)
    // }
//   }, [])
  return (
    <div className="flex flex-col py-12 gap-2 md:px-32">
      <div className="flex flex-row gap-1 items-center w-full">
        <button className="px-6 py-2 dark:bg-primary rounded bg-slate-50">All*</button>
        <div>
          <button onClick={() => setDropdown((old) => !old)} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="bg-slate-50 focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-2 dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary" type="button">
            Tag 
            <Image src={dar} alt="dbl d arrow" width="10" height="10" className="bg-transparent" />
          </button>

          <div id="dropdown" className={`${ dropdown ? '' : 'hidden' } w-1/6 max-w-60 absolute md:left-36 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow px-2 dark:bg-[#131313] mt-3`}>
            <div className='flex flex-wrap gap-2 p-3 px-1'>
              <p className={`border dark:border-[#282828] rounded-lg text-sm px-2 py-1 bg-transparent hover:opacity-50 hover:border-lime-600`}>Javascript</p>
              <p className={`border dark:border-[#282828] rounded-lg text-sm px-2 py-1 bg-transparent hover:opacity-50 hover:border-lime-600`}>C++</p>
              <p className={`border dark:border-[#282828] rounded-lg text-sm px-2 py-1 bg-transparent hover:opacity-50 hover:border-lime-600`}>C#</p>
              <p className={`border dark:border-[#282828] rounded-lg text-sm px-2 py-1 bg-transparent hover:opacity-50 hover:border-lime-600`}>Python</p>
              <p className={`border dark:border-[#282828] rounded-lg text-sm px-2 py-1 bg-transparent hover:opacity-50 hover:border-lime-600`}>Go</p>
              <p className={`border dark:border-[#282828] rounded-lg text-sm px-2 py-1 bg-transparent hover:opacity-50 hover:border-lime-600`}>Rust</p>
              <p className={`border dark:border-[#282828] rounded-lg text-sm px-2 py-1 bg-transparent hover:opacity-50 hover:border-lime-600`}>DSA</p>
            </div>
          </div>
        </div>
        <button onClick={darkMode} className="px-4 py-2.5 dark:bg-primary rounded flex flex-row gap-4 justify-center items-center bg-slate-50">
          {
            isDark ?
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
