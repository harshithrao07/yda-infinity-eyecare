"use client";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navList = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Blogs", link: "/blogs" },
    { name: "Gallery", link: "/gallery" },
  ];

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <header
      className={`fixed top-0 md:top-3 w-full flex items-center h-16 z-50 px-6 transition-opacity duration-300 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Logo - Left side */}
      <div className="flex items-center flex-shrink-0">
        <Link href="/" className="flex items-center group">
          <div className="relative w-[72px] h-[72px] sm:w-[95px] sm:h-[95px]">
            <Image
              alt="Infinity"
              src="/logo-with-name.png"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="sr-only">Infinity Eye Care</span>
        </Link>
      </div>

      {/* Nav - Centered */}
      <div
        className="absolute left-1/2 -translate-x-1/2 hidden lg:flex px-7 py-4 rounded-4xl 
                   bg-white/70 backdrop-blur-lg border border-gray-300/60 shadow-lg shadow-black/10 transition-all duration-300"
      >
        <nav className="flex gap-12 w-fit relative">
          {navList.map((nav, index) => {
            const isActive =
              nav.link === "/"
                ? pathname === "/"
                : pathname.startsWith(nav.link);

            return (
              <Link
                key={index}
                href={nav.link}
                className={`font-figtree font-semibold uppercase text-sm transition-all duration-300 relative
                ${
                  isActive ? "text-primary" : "text-black/80 hover:text-primary"
                }`}
              >
                {nav.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile menu */}
      <div className="ml-auto lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="p-2 hover:bg-black/10 rounded-lg transition-colors duration-200">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-white/70 backdrop-blur-lg border border-gray-300/60"
          >
            <SheetHeader>
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            </SheetHeader>

            <div className="grid gap-2 py-6 pl-5">
              {navList.map((nav, index) => {
                const isActive =
                  nav.link === "/"
                    ? pathname === "/"
                    : pathname.startsWith(nav.link);

                return (
                  <Link
                    key={index}
                    href={nav.link}
                    onClick={() => setOpen(false)}
                    className={`font-figtree font-semibold uppercase text-sm transition-colors duration-200
                    ${
                      isActive
                        ? "text-primary"
                        : "text-black/80 hover:text-primary"
                    }`}
                  >
                    {nav.name}
                  </Link>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
