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
      title: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Uno",
      description: "Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum.",
      tag: "javascript"
    },
    {
      id: 2,
      title: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Dos",
      description: "Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum.",
      tag: "c++"
    },
    {
      id: 3,
      title: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Tres",
      description: "Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem Ipsum Lorem Ipsum.",
      tag: "c#"
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

          <div id="dropdown" className={`${ dropdown ? '' : 'hidden' } absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow px-2 dark:bg-[#131313]`}>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#212121] dark:hover:text-white">JavaScript</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#212121] dark:hover:text-white">Python</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#212121] dark:hover:text-white">C++</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#212121] dark:hover:text-white">C#</a>
                </li>
              </ul>
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
