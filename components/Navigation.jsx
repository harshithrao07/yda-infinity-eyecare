"use client";

import { useEffect, useRef, useState } from "react";
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
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showNavBg, setShowNavBg] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

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

  // Scroll detection
  useEffect(() => {
    const THRESHOLD = 6;

    const onScroll = () => {
      const y = window.scrollY || 0;
      if (tickingRef.current) return;

      tickingRef.current = true;
      requestAnimationFrame(() => {
        const last = lastScrollYRef.current;
        const delta = y - last;

        if (delta > THRESHOLD) setHidden(true);
        else if (delta < -THRESHOLD) setHidden(false);

        if (y === 0) {
          setShowNavBg(false);
        } else {
          if (delta < -THRESHOLD || isHovered) {
            setShowNavBg(true);
          }
        }

        lastScrollYRef.current = y < 0 ? 0 : y;
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHovered]);

  let headerStateClass = "";
  if (!mounted) headerStateClass = "-translate-y-10 opacity-0";
  else if (hidden) headerStateClass = "-translate-y-20 opacity-100";
  else headerStateClass = "translate-y-0 opacity-100";

  return (
    <header
      className={`fixed top-0 md:top-2 w-full flex items-center h-16 z-50 px-6
                  transition-transform duration-500 ease-out ${headerStateClass}`}
    >
      {/* Logo - Left side */}
      <div className="flex items-center flex-shrink-0">
        <Link href="/" className="flex items-center">
          <Image
            alt="Infinity"
            src="/logo-light.png"
            width={45}
            height={45}
            className="w-[32px] h-[32px] sm:w-[55px] sm:h-[55px] object-contain"
            priority
          />
          <span className="sr-only">Infinity Eye Care</span>
        </Link>
      </div>

      {/* Nav - Centered */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 hidden lg:flex px-7 py-4 rounded-4xl
                    transition-all duration-500 border
                    ${
                      showNavBg || isHovered
                        ? "bg-white/40 backdrop-blur-md border-gray-300/70 shadow-sm"
                        : "bg-transparent border-transparent"
                    }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
                className={`font-figtree font-semibold uppercase text-sm transition-colors 
        ${isActive ? "text-primary" : "text-gray-500 hover:text-primary"}`}
              >
                {nav.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile menu */}
      <div className="ml-auto lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button>
              <Menu />
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-white/40 backdrop-blur-md border border-gray-300/50"
          >
            {/* Hidden title for accessibility */}
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
                    className={`font-figtree font-semibold uppercase text-sm transition-colors 
        ${isActive ? "text-primary" : "text-gray-500 hover:text-primary"}`}
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
