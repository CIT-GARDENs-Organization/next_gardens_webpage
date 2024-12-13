import type {Metadata} from "next";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

import {ReactNode} from "react";

export const metadata: Metadata = {
  title: "Gardens",
  description:
    "Growing Advanced and Refined space Development Engineers in succession and under the satellite",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({children}: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-black">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
