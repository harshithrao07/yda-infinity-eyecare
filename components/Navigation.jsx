"use client";

import { useEffect, useRef, useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showNavBg, setShowNavBg] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

  const pathname = usePathname();

  const navList = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Blogs", link: "/blogs" },
    { name: "Gallery", link: "/gallery" },
  ];

  const [activeIndex, setActiveIndex] = useState(
    navList.findIndex((item) => item.link === pathname)
  );
  
  // 1. Create a ref to hold an array of the link elements
  const navLinkRefs = useRef([]);
  // 2. Create state to hold the calculated 'x' position for the dot
  const [dotX, setDotX] = useState(0);


  useEffect(() => {
    const index = navList.findIndex((item) => item.link === pathname);
    setActiveIndex(index);
  }, [pathname, navList]); // Added navList to dependency array for correctness

  // 3. New useEffect to calculate the dot's position when activeIndex changes
  useEffect(() => {
    if (activeIndex !== -1 && navLinkRefs.current[activeIndex]) {
      const activeLinkElement = navLinkRefs.current[activeIndex];
      const linkOffsetLeft = activeLinkElement.offsetLeft;
      const linkWidth = activeLinkElement.offsetWidth;
      const dotWidth = 8; // Corresponds to w-2 class (0.5rem = 8px)
      
      // Calculate the center position: start of link + half link width - half dot width
      const newX = linkOffsetLeft + (linkWidth / 2) - (dotWidth / 2);
      
      setDotX(newX);
    }
  }, [activeIndex]);

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

      {/* Nav */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 hidden lg:flex px-7 py-4 rounded-4xl
                    transition-all duration-500 border relative
                    ${
                      showNavBg || isHovered
                        ? "bg-white/40 backdrop-blur-md border-gray-300/70 shadow-sm"
                        : "bg-transparent border-transparent"
                    }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <nav className="flex gap-12 w-fit relative">
          {navList.map((nav, index) => (
            <Link
              key={index}
              href={nav.link}
              prefetch={false}
              className="font-figtree font-semibold uppercase text-sm relative"
              // 4. Attach the ref to each Link element
              ref={(el) => (navLinkRefs.current[index] = el)}
            >
              {nav.name}
            </Link>
          ))}

          {/* Moving dot */}
          <motion.div
            layout
            className="absolute bottom-[-6px] w-1 h-1 rounded-full bg-gray-700 blur-[1px]"
            initial={false}
            // 5. Use the dynamic state value for the animation
            animate={{ x: dotX }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 28,
            }}
          />
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
                  className={`flex w-full items-center py-2 text-lg font-semibold ${
                    pathname === nav.link ? "text-black" : ""
                  }`}
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