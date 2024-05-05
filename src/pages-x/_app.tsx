import { type AppType } from "next/app";
import { Inter, Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { useThemeStore } from "~/stores/general";

import "~/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }) => {
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
    <main className={`font-sans ${inter.variable} dark:bg-[#111111] dark:text-white text-black h-screen ${ isDark ? 'dark' : '' }`}>
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
