/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client"

import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { useThemeStore } from "~/stores/general";
import "~/styles/globals.css";
import { ThemeProvider, useTheme } from 'next-themes'
import Navbar from "~/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
 

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
  }: {
    children: React.ReactNode
  }) {
    const [mounted, setMounted] = useState<boolean>(false)
    const { setTheme } = useTheme()
  
    useEffect(() => {
      const iisDark = localStorage.getItem("darkMode")
      if (iisDark === null) {
        setTheme("light")
      } else if (iisDark === "true") {
        setTheme("dark")
      } else {
        setTheme("light")
      }
      console.log(iisDark)
      setMounted(true)
    }, [])
    return (
      <html lang="en" className={`font-sans ${inter.variable} dark:bg-[#111111] dark:text-white text-black h-screen`} suppressHydrationWarning={true}>
        <body>
          <ThemeProvider attribute="class">
            <Navbar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    )
}


