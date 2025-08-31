"use client";

import { Button } from "@/components/ui/button";
import { PhoneCall } from "lucide-react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import AsciiEye from "./AsciiEye";
import MissionSection from "./MissionSection";

export default function HeroContent() {
  const controls = useAnimation();
  const prefersReducedMotion = useReducedMotion();

  // word-level blur-in
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const word = {
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
      y: 8,
    },
    show: {
      filter: "blur(0px)",
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <main className="min-h-screen relative bg-[#e9e9e6]">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[3]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,rgb(156,163,175)_1px,transparent_0)] bg-[length:100px_100px]" />
      </div>
      <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(to_right,#9ca3af_0px,#9ca3af_2px,transparent_2px,transparent_100px),repeating-linear-gradient(to_bottom,#9ca3af_0px,#9ca3af_2px,transparent_2px,transparent_100px)] bg-[length:100px_100px]" />

      {/* Main grid */}
      <div className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center gap-0 pt-10 sm:pt-16">
        {/* background glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-40 sm:w-64 h-40 sm:h-64 bg-green-200/30 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 left-0 w-40 sm:w-64 h-40 sm:h-64 bg-yellow-200/20 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/3 w-40 sm:w-64 h-40 sm:h-64 bg-red-200/30 rounded-full blur-2xl" />

        {/* Left Column */}
        <div className="flex flex-col justify-center text-center lg:text-left px-6 md:px-16 lg:px-0 lg:pl-12 xl:pl-20">
          {/* Highlight pill */}
          <motion.div
            initial={{ filter: "blur(10px)", opacity: 0, y: 8 }}
            whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex w-fit items-center px-3 sm:px-4 py-1 sm:py-1.5 
     rounded-full bg-white/60 cursor-default backdrop-blur-md border border-white/10 shadow-lg mb-6 mx-auto lg:mx-0
     hover:shadow-xl transition-shadow duration-300"
          >
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
              className="flex gap-1"
            >
              {["✨", "Next-Gen", "Optical", "Experience"].map((w, i) => (
                <motion.span
                  key={i}
                  variants={word}
                  className="text-gray-800 text-xs sm:text-sm xl:text-md font-medium"
                >
                  {w}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
             leading-tight tracking-tight font-light text-black mb-6 
             text-center lg:text-left"
          >
            <span className="italic instrument inline-block font-medium">
              {["Vision"].map((w) => (
                <motion.span
                  key={w}
                  variants={word}
                  className="inline-block mr-3 sm:mr-4 font-playfair-display"
                >
                  {w}
                </motion.span>
              ))}
            </span>
            {["Beyond"].map((w) => (
              <motion.span key={w} variants={word} className="inline-block">
                {w}
              </motion.span>
            ))} &nbsp;
            <br className="hidden lg:inline" />
            <span className="font-light tracking-tight text-gray-800">
              {["Limits."].map((w) => (
                <motion.span key={w} variants={word} className="inline-block">
                  {w}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ filter: "blur(10px)", opacity: 0, y: 6 }}
            whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.7,
              ease: "easeOut",
              delay: 0.2,
            }}
            className="text-sm md:text-xl 
             font-light text-gray-700 mb-8 leading-relaxed 
             text-center lg:text-left w-full lg:w-3/4"
          >
            At{" "}
            <span className="font-bold italic font-playfair-display text-black">
              Infinity Eye Care
            </span>
            , we combine advanced technology with compassionate care to help you
            see the world clearly and comfortably. Your eyes deserve the best,
            and we’re here to provide it—today and always.
          </motion.p>

          {/* Buttons */}
          <div className="flex items-center gap-3 flex-wrap justify-center lg:justify-start">
            <motion.div
              initial={{ filter: "blur(8px)", opacity: 0, y: 6 }}
              whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 0.6,
                ease: "easeOut",
                delay: 0.25,
              }}
            >
              <Button
                variant="outline"
                className="rounded-full 
             px-4 py-2 text-xs  
             sm:px-6 sm:py-2.5 sm:text-sm 
             md:px-7 md:py-5 md:text-base 
             bg-white cursor-pointer border-gray-400 border-1 
             group hover:border-gray-600 hover:shadow-lg 
             transition-all duration-300 hover:bg-gray-50"
                onMouseEnter={() => {
                  controls.start({
                    rotate: [0, -15, 15, -10, 10, 0],
                    transition: { duration: 0.6, ease: "easeInOut" },
                  });
                }}
              >
                <span className="relative flex items-center gap-x-2 sm:gap-x-3">
                  <motion.div animate={controls}>
                    <PhoneCall className="w-3.5 h-3.5 sm:w-5 sm:h-5" />{" "}
                    {/* 📱 smaller icon on phones */}
                  </motion.div>
                  BOOK AN APPOINTMENT
                </span>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Right Column - AsciiEye */}
        <motion.div
          className="h-72 md:h-[450px] lg:h-3/4 flex items-center justify-center p-6 md:py-0 sm:px-24 lg:p-0"
          initial={{ filter: "blur(10px)", opacity: 0, y: 8 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: prefersReducedMotion ? 0.01 : 0.7,
            ease: "easeOut",
            delay: 0.3,
          }}
        >
          <AsciiEye />
        </motion.div>
      </div>

      <MissionSection />
    </main>
  );
}
