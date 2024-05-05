"use client"

import { Inter } from "next/font/google";
import { useEffect } from "react";
import { useThemeStore } from "~/stores/general";
import "~/styles/globals.css";

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
    const isDark = useThemeStore((state) => state.isDark)
    const updateMode = useThemeStore((state) => state.updateMode)
    useEffect(() => {
      const iisDark = localStorage.getItem("darkMode")
      if (iisDark === null) {
        updateMode(false)
      } else if (iisDark === "true") {
        updateMode(true)
      } else {
        updateMode(false)
      }
      console.log(iisDark)
    }, [])
    return (
      <html lang="en" className={`font-sans ${inter.variable} dark:bg-[#111111] dark:text-white text-black h-screen ${ isDark ? 'dark' : '' }`}>
        <body>{children}</body>
      </html>
    )
}


