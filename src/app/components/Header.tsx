"use client";

import {useState} from "react";
import Image from "next/image";
import Link from "next/link";

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  {href: "#home", label: "Home"},
  {href: "#services", label: "Services"},
  {href: "#about", label: "About"},
  {href: "#contact", label: "Contact"},
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

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

          {/* 右側のコントロール：ナビゲーションとダークモードトグル */}
          <div className="flex items-center">
            {/* デスクトップナビゲーション */}
            <nav className="hidden md:flex space-x-8 items-center">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <div className="nav-link">{link.label}</div>
                </Link>
              ))}
            </nav>

            {/* モバイルメニューボタン */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="ml-4 inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {!isMenuOpen ? (
                  // メニューが閉じているときのアイコン
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  // メニューが開いているときのアイコン
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* モバイルナビゲーションメニュー */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  onClick={toggleMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
