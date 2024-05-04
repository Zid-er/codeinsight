import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import { Metadata } from 'next'

import "~/styles/globals.css";
import { Children } from "react";

export const metadata: Metadata = {
  title: 'My Page Title',
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Page() {
  return (
    <main className={`font-sans ${inter.variable}`}>
      <p>hello</p>
    </main>
  );
}

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`font-sans ${inter.variable}`}>
      <Component {...pageProps} />
    </main>
  );
};


