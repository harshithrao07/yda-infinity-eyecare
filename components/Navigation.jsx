import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export default function Component() {
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
    <header className="flex h-16 border-gray-500 border-1 bg-white rounded-4xl mt-6 w-3/4 shrink-0 mx-auto items-center px-4 md:px-6 z-20 relative">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Infinity Eye Care</span>
          </Link>
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
      <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
        <Image alt="Infinity" src="/logo.png" height={40} width={40} />
        <span className="sr-only">Infinity Eye Care</span>
      </Link>
      <nav className="ml-auto hidden lg:flex gap-12 h-full">
        {navList.map((nav, index) => (
          <Link
            key={index}
            href={nav.link}
            prefetch={false}
            className={`
        ${montserrat.className}
        font-semibold uppercase text-sm
        flex h-full items-center
        relative
        after:content-['']
        after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-3.5
        after:block after:w-1 after:h-1 after:rounded-full
        after:bg-gray-500
        after:opacity-0 after:scale-50
        hover:after:opacity-90 hover:after:scale-100
        after:blur-[1px]
        after:transition-all after:duration-300 after:ease-out
      `}
          >
            <span className="relative z-10">{nav.name}</span>
          </Link>
        ))}
      </nav>
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

function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
