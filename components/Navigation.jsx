"use client";

import { useEffect, useRef, useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Figtree } from "next/font/google";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showNavBg, setShowNavBg] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

  const navList = [
    { name: "About", link: "/about" },
    { name: "Services", link: "/services" },
    { name: "Gallery", link: "/gallery" },
    { name: "Blogs", link: "/blogs" },
  ];

  // First-load animation
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

        // Hide/show header
        if (delta > THRESHOLD) {
          setHidden(true); // scrolling down
        } else if (delta < -THRESHOLD) {
          setHidden(false); // scrolling up
        }

        // Nav background logic
        if (y === 0) {
          setShowNavBg(false); // topmost: transparent
        } else {
          if (delta < -THRESHOLD || isHovered) {
            setShowNavBg(true); // scrolling up or hovered
          } 
          // else: do nothing, keep current state (prevents disappearing mid-page)
        }

        lastScrollYRef.current = y < 0 ? 0 : y;
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHovered]); // only isHovered as dependency

  // Header slide animation
  let headerStateClass = "";
  if (!mounted) headerStateClass = "-translate-y-10 opacity-0";
  else if (hidden) headerStateClass = "-translate-y-20 opacity-100";
  else headerStateClass = "translate-y-0 opacity-100";

  return (
    <header
      className={`fixed top-2 w-full flex items-center h-16 z-50 px-6
                  transition-transform duration-500 ease-out ${headerStateClass}`}
    >
      {/* Logo */}
      <div className="flex items-center flex-shrink-0">
        <Link href="/" className="flex items-center">
          <Image
            alt="Infinity"
            src="/logo.png"
            width={45}
            height={45}
            className="w-[45px] h-[45px] object-contain"
            priority
          />
          <span className="sr-only">Infinity Eye Care</span>
        </Link>
      </div>

      {/* Nav with hover + scroll-up background */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 hidden lg:flex px-7 py-4 rounded-4xl
                    transition-all duration-500 border
                    ${showNavBg || isHovered
                      ? "bg-white/40 backdrop-blur-md border-gray-300/70 shadow-sm"
                      : "bg-transparent border-transparent"
                    }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <nav className="flex gap-12 w-fit">
          {navList.map((nav, index) => (
            <Link
              key={index}
              href={nav.link}
              prefetch={false}
              className={`
                ${figtree.className}
                font-semibold uppercase text-sm relative
                after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-[-6px]
                after:block after:w-1 after:h-1 after:rounded-full
                after:bg-gray-500 after:opacity-0 after:scale-50
                hover:after:opacity-90 hover:after:scale-100
                after:blur-[1px] after:transition-all after:duration-300 after:ease-out
              `}
            >
              <span className="relative z-10">{nav.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile menu */}
      <div className="ml-auto lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-white/40 backdrop-blur-md border border-gray-300/50"
          >
            <div className="grid gap-2 py-6">
              {navList.map((nav, index) => (
                <Link
                  key={index}
                  href={nav.link}
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  prefetch={false}
                >
                  {nav.name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
