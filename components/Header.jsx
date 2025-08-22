"use client";

import Image from "next/image";
import { Figtree } from "next/font/google";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function Header() {
  const navList = [
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Services",
      link: "/services",
    },
    {
      name: "Gallery",
      link: "/gallery",
    },
    {
      name: "Blogs",
      link: "/blogs",
    },
  ];
  return (
    <header className="fixed top-0 left-0 w-full z-20 flex items-center justify-between p-6">
      {/* Logo */}
      <div className="flex items-center">
        <Image alt="Infinity" src="/logo.png" height={45} width={45} />
      </div>

      {/* Navigation Centered */}
      <nav className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-6">
        {navList.map((nav, index) => (
          <a
            href={nav.link}
            key={index}
            className={`text-gray-700 hover:text-black text-sm font-medium px-3 py-2 rounded-full transition-colors duration-200 hover:bg-gray-50 ${figtree.className}`}
          >
            {nav.name}
          </a>
        ))}
      </nav>

      {/* Spacer to balance flex */}
      <div className="w-10"></div>
    </header>
  );
}