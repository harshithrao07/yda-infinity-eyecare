"use client";

import React, { useRef } from "react";
import ShaderBackground from "./shader-background-dark";
import Link from "next/link";
import { ArrowRight, DotIcon } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function MissionSection() {
  const sectionRef = useRef(null);

  // Track scroll progress of this specific element
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Transform scroll progress to blur values
  const blurAmount = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [12, 4, 4, 12]
  );

  // Transform scroll progress to opacity for additional effect
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.7, 1, 1, 0.7]
  );

  // Transform scroll progress to scale for subtle zoom effect
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section className="py-12 sm:py-16 lg:py-20 relative md:px-16 lg:px-0" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated card */}
        <motion.div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl max-w-5xl mx-auto"
          style={{
            scale,
            opacity,
          }}
          initial={{ y: 0 }}
          animate={{ y: [-2, 2, -2] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          {/* Shader layer with combined blur animation */}
          <motion.div
            className="absolute inset-0"
            style={{
              filter: useTransform(blurAmount, (value) => `blur(${value}px)`),
            }}
          >
            <ShaderBackground>
              <></>
            </ShaderBackground>
          </motion.div>

          {/* Content */}
          <div className="relative z-10 text-center py-12 px-4 sm:py-14 sm:px-6 md:py-16 md:px-8 lg:py-20 lg:px-12">
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6"
            >
              <DotIcon color="white" size={14} className="sm:w-4 sm:h-4" />
              <p className="text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white/80">
                Infinity Eye Care
              </p>
              <DotIcon color="white" size={14} className="sm:w-4 sm:h-4" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="font-oswald font-extrabold leading-tight tracking-[-0.02em] 
                         text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                         text-white px-2 sm:px-0"
            >
              OUR MISSION STATEMENT
              <br className="hidden sm:block" />
              <span className="block sm:inline">
                HIGH-QUALITY EYE CARE FOR ALL
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, filter: "blur(10px)", y: 15 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl 
                         text-white/80 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl 
                         mx-auto leading-relaxed px-2 sm:px-0"
            >
              At <span className="font-oswald">Infinity Eye Care</span>, we are
              committed to safeguarding your vision through comprehensive eye
              exams, modern treatments, and personalized guidance. Our goal is
              to make eye health simple, approachable, and effective for
              everyone, ensuring you enjoy clear vision for a lifetime.
            </motion.p>

            <div className="mt-8 sm:mt-10">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                whileHover="hover"
                whileTap="tap"
                className="inline-block"
              >
                <Link
                  href="/about"
                  className="inline-flex uppercase items-center gap-2 
                           rounded-full bg-white/10 
                           px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4
                           text-xs sm:text-sm md:text-base font-semibold text-white 
                           ring-1 ring-white/20 hover:bg-white/15 
                           transition-all duration-200 ease-out
                           hover:scale-105 active:scale-95"
                >
                  About us
                  <motion.div
                    variants={{
                      rest: { x: 0 },
                      hover: { x: 6 },
                      tap: { x: 8 },
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <ArrowRight size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
