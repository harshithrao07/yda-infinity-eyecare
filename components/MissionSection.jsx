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
    <section className="py-20 relative" ref={sectionRef}>
      <div className="max-w-4xl mx-auto px-6">
        {/* Animated card */}
        <motion.div
          className="relative rounded-3xl overflow-hidden shadow-xl"
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
          <div className="relative z-10 text-center py-16 px-8">
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <DotIcon color="white" size={16} />
              <p className="text-sm tracking-[0.2em] uppercase text-white/80">
                Infinity Eye Care
              </p>
              <DotIcon color="white" size={16} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="font-oswald font-extrabold leading-tight tracking-[-0.02em] text-3xl sm:text-4xl md:text-4xl text-white"
            >
              OUR MISSION STATEMENT
              <br className="hidden sm:block" />
              HIGH-QUALITY EYE CARE FOR ALL
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, filter: "blur(10px)", y: 15 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="mt-6 text-base sm:text-lg text-white/80 max-w-2xl mx-auto"
            >
              At <span className="font-oswald">Infinity Eye Care</span>, we are
              committed to safeguarding your vision through comprehensive eye
              exams, modern treatments, and personalized guidance. Our goal is
              to make eye health simple, approachable, and effective for
              everyone, ensuring you enjoy clear vision for a lifetime.
            </motion.p>

            <div className="mt-10">
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
                  className="inline-flex uppercase items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/15 transition"
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
                    <ArrowRight size={16} />
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
