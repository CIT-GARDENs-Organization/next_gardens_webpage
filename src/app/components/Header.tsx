"use client";

import Image from "next/image";
export default function Header() {
  return (
    <header className="w-full bg-white bg-opacity-70 dark:bg-gray-300 dark:bg-opacity-5 shadow backdrop-blur fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ロゴ */}
          <div className="flex-shrink-0 flex items-center">
            <Image src="/logo.png" alt="Gardens Logo" width={25} height={25} />
            <span className="ml-4 font-bold text-2xl text-gray-800 dark:text-white">
              Gardens
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
