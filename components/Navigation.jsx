"use client";

import React from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";
import { Archivo_Black } from "next/font/google";

const outfit = Archivo_Black({
  subsets: ["latin"],
  weight: "400"
});


export function Navigation() {
  const [openNav, setOpenNav] = React.useState(false);
  const [showNav, setShowNav] = React.useState(true);
  const [isTop, setIsTop] = React.useState(true);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Transparent when at top
      setIsTop(currentScrollY === 0);

      // Show/hide nav based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setShowNav(false); // scrolling down
      } else {
        setShowNav(true); // scrolling up
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    {
      name: "Glasses",
      href: "/",
    },
    {
      name: "Sunglasses",
      href: "/",
    },
    {
      name: "Accessories",
      href: "/",
    },
    {
      name: "Services",
      href: "/",
    },
    {
      name: "Eye care",
      href: "/",
    },
  ];

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {navItems.map((navItem, index) => (
        <Typography
          as="li"
          variant="h6"
          color="blue-gray"
          className="flex items-center gap-x-2 p-1 font-medium"
          key={index}
        >
          <Link href={navItem.href} className="flex items-center">
            {navItem.name}
          </Link>
        </Typography>
      ))}
    </ul>
  );

  return (
    <Navbar
      className={`fixed shadow-none top-0 z-20 h-max max-w-full px-4 py-2 hover:bg-white md:px-7 md:py-4 border-0 duration-300 transform transition-all
        ${showNav ? "translate-y-0" : "-translate-y-full"}
        ${isTop ? "bg-transparent" : "bg-white"}`}
    >
      <div className="mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-x-2">
          <Image
            src="/logo.png"
            alt="Infinity Eye Care"
            width={50}
            height={50}
          />
          <Typography variant="h1" className={`text-2xl font-black`}>
            Infinity Eye Care
          </Typography>
        </Link>
        <div className="hidden lg:block">{navList}</div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">{navList}</div>
      </Collapse>
    </Navbar>
  );
}
