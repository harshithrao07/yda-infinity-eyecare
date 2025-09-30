"use client";

import Image from "next/image";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import {
  BriefcaseMedical,
  Eye,
  HardHat,
  Monitor,
  PhoneCall,
  ToolCase,
} from "lucide-react";
import ShaderBackground from "./shader-background-light";
import { Button } from "./ui/button";
import MapsComponent from "./MapsComponent";
import Link from "next/link";

export default function AboutSection() {
  const prefersReducedMotion = useReducedMotion();
  const controls = useAnimation();

  const team = [
    {
      name: "Vijith Saldanha",
      role: "Founder",
      img: "/about/team_1.jpg",
    },
  ];

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
    <main className="text-neutral-700 overflow-hidden relative">
      {/* HERO */}
      <ShaderBackground>
        <div className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-16 px-4 sm:px-6 lg:px-16 py-8 sm:py-12 lg:py-22">
          {/* Background blur elements - adjusted for mobile */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-green-200/30 rounded-full blur-2xl" />
          <div className="absolute bottom-1/4 left-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-yellow-200/20 rounded-full blur-2xl" />
          <div className="absolute top-1/2 left-1/3 sm:left-4/12 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-red-200/30 rounded-full blur-2xl" />

          {/* Left content */}
          <div className="flex-1 flex flex-col justify-center text-left max-w-2xl lg:max-w-none">
            {/* Highlight pill */}
            <motion.div
              initial={{ filter: "blur(10px)", opacity: 0, y: 8 }}
              whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex mx-auto lg:mx-0 items-center gap-1.5 sm:gap-2 px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-default w-fit mb-4 sm:mb-6"
            >
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.6 }}
                className="flex gap-0.5 sm:gap-1 items-center"
              >
                {["🛡️", "Trusted", "Eye", "Care", "Since", "2008"].map(
                  (w, i) => (
                    <motion.span
                      key={i}
                      variants={word}
                      className="text-gray-800 text-xs sm:text-sm lg:text-md font-medium"
                    >
                      {w}
                    </motion.span>
                  )
                )}
              </motion.div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
              className="mx-auto lg:mx-0 text-4xl sm:text-5xl md:text-6xl xl:text-7xl leading-tight tracking-tight font-light text-black mb-4 sm:mb-6"
            >
              {["About"].map((w) => (
                <motion.span
                  key={w}
                  variants={word}
                  className="inline-block font-playfair-display italic"
                >
                  {w}
                </motion.span>
              ))}{" "}
              &nbsp;
              <span className="font-light tracking-tight text-gray-800">
                {["Us."].map((w) => (
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
              className="text-center lg:text-left text-black font-light leading-relaxed text-sm sm:text-base lg:text-lg mb-6 sm:mb-8"
            >
              Founded with a vision to bring clarity and style to every
              eye,&nbsp;
              <span className="font-bold font-playfair-display italic">
                Infinity Eye Care
              </span>{" "}
              Center started as a small family-run practice and has grown into a
              trusted destination for premium optical care. We provide precise
              eye exams, advanced lens technology, and a wide range of stylish
              frames. <br className="hidden sm:block" />{" "}
              <br className="hidden sm:block" />
              Our commitment to personalized care ensures every customer leaves
              with improved vision and eyewear that suits their lifestyle.
              Combining expertise, innovation, and a personal touch, we make
              every eye care experience exceptional.
            </motion.p>

            {/* Stats */}
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
              <div className="grid grid-cols-3 gap-4 sm:gap-6 w-full sm:w-fit">
                {[
                  { number: "15+", label: "Years in Eye Care" },
                  { number: "10k+", label: "Happy Patients" },
                  { number: "1000+", label: "Eyewear Styles" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="text-center cursor-default bg-white/80 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-gray-300 hover:border-gray-600 hover:shadow-lg transition-all duration-300 hover:bg-gray-50"
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-1 font-oswald">
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm text-neutral-600 font-figtree">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right image */}
          <motion.div
            initial={{ filter: "blur(10px)", opacity: 0, y: 8 }}
            whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.7,
              ease: "easeOut",
              delay: 0.3,
            }}
            className="flex-1 w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl relative mt-6 lg:mt-0"
          >
            <div className="relative w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] border rounded-2xl border-black overflow-hidden shadow-xl bg-gradient-to-br from-white/80 to-rose-50/40">
              <Image
                src="/about/infinityeyecare.webp"
                alt="Infinity Eye Care - Eyewear and Eye Exams"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            </div>
          </motion.div>
        </div>

        {/* CREDENTIALS */}
        <section className="py-16 lg:py-24 relative">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h3 className="text-3xl text-neutral-900 mb-16">
              Why Choose{" "}
              <span className="font-playfair-display italic font-semibold">
                Infinity Eye Care
              </span>
              ?
            </h3>

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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Certified Optometrists",
                    desc: "Highly qualified professionals with years of clinical experience.",
                    icon: BriefcaseMedical,
                  },
                  {
                    title: "Premium Eyewear",
                    desc: "Handpicked frames from top global brands to match every style.",
                    icon: Eye,
                  },
                  {
                    title: "Cutting-Edge Technology",
                    desc: "Advanced diagnostic equipment for precise eye health evaluation.",
                    icon: Monitor,
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="bg-white hover:scale-105 cursor-default backdrop-blur-md rounded-xl p-5 lg:p-10 border border-gray-400 hover:border-gray-600 hover:shadow-lg transition-all duration-300 hover:bg-gray-50 flex flex-col items-center gap-4"
                    >
                      <Icon className="w-10 h-10 text-black" />
                      <h4 className="text-xl font-semibold font-oswald text-black">
                        {item.title}
                      </h4>
                      <p className="text-neutral-600 font-figtree">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>
      </ShaderBackground>

      {/* DOCTORS */}
      <section className="relative px-5 lg:px-0 py-16 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Header Section */}
          <div className="mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
              <span className="font-light">Meet our</span>&nbsp;
              <span className="font-playfair-display italic font-semibold">
                Specialist
              </span>
            </h2>
            <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              Our team of skilled optometrists and eyewear specialists is
              dedicated to helping you see clearly and look absolutely
              fantastic.
            </p>
          </div>

          {/* Team Grid */}
          <div
            className={`grid gap-8 sm:gap-10 ${
              team.length === 1
                ? "grid-cols-1 justify-items-center"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {team.map((member, i) => (
              <div key={i} className="group relative w-full max-w-sm mx-auto">
                {/* Card Container */}
                <div className="relative backdrop-blur-md rounded-3xl p-8 sm:p-10 bg-white/30 border border-[#A9ACAC]/20">
                  {/* Floating gradient background */}
                  <div
                    className="absolute -inset-2 rounded-3xl"
                    style={{
                      background:
                        "linear-gradient(135deg, #47656340, #77C4B740, #84DCC940, #A9ACAC40, #0D0E0E20, #FEFFFF40)",
                    }}
                  ></div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Member Image */}
                    <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-8">
                      {/* Image border gradient */}
                      <div
                        className="absolute -inset-2 rounded-3xl shadow-lg"
                        style={{
                          background:
                            "linear-gradient(135deg, #47656380, #77C4B780, #84DCC980, #A9ACAC80, #0D0E0E40, #FEFFFF80)",
                        }}
                      ></div>
                      <div className="relative w-full h-full bg-white rounded-3xl p-2">
                        <Image
                          src={member.img}
                          alt={member.name}
                          width={192}
                          height={192}
                          className="object-cover w-full h-full rounded-2xl"
                        />
                      </div>

                      {/* Floating badge */}
                      <div className="absolute -bottom-3 -right-3 w-14 h-14 bg-[#77C4B7] rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>

                    {/* Member Info */}
                    <div className="space-y-4">
                      <h4 className="text-2xl sm:text-3xl font-bold font-oswald text-[#476563] uppercase tracking-wide transition-colors duration-300">
                        {member.name}
                      </h4>
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-12 h-0.5 bg-[#77C4B7] rounded-full"></div>
                        <p className="text-[#A9ACAC] text-base sm:text-lg font-medium px-2">
                          {member.role}
                        </p>
                        <div className="w-12 h-0.5 bg-[#77C4B7] rounded-full"></div>
                      </div>

                      {/* Subtle pastel accent */}
                      <div className="flex justify-center gap-2 mt-4">
                        <div className="w-2 h-2 bg-[#47656350] rounded-full"></div>
                        <div className="w-2 h-2 bg-[#77C4B750] rounded-full"></div>
                        <div className="w-2 h-2 bg-[#84DCC950] rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom decoration */}
          <div className="mt-20">
            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#84DCC9] rounded-full"></div>
                <div className="w-3 h-3 bg-[#77C4B7] rounded-full"></div>
                <div className="w-2 h-2 bg-[#476563] rounded-full"></div>
              </div>
              <div className="px-6 py-2 bg-[#84DCC940] rounded-full border border-[#77C4B720]">
                <p className="text-[#476563] text-xs lg:text-sm font-semibold">
                  Trusted by thousands of satisfied customers
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#47656350] rounded-full"></div>
                <div className="w-3 h-3 bg-[#77C4B750] rounded-full"></div>
                <div className="w-4 h-4 bg-[#84DCC9] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MapsComponent />

      {/* CTA */}
      <section className="py-16 px-5 lg:px-0 text-black text-center relative">
        <h2 className="text-4xl font-medium mb-4">Your Vision, Our Mission</h2>
        <p className="text-lg mb-8 font-figtree">
          Book your eye exam today and discover frames that fit your style.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
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
            <Link
              href="https://api.whatsapp.com/send/?phone=918277343650&text&type=phone_number&app_absent=0"
              target="_blank"
            >
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-7 bg-white cursor-pointer border-gray-400 border-1 group hover:border-gray-600 hover:shadow-lg transition-all duration-300 hover:bg-gray-50"
                onMouseEnter={() => {
                  controls.start({
                    rotate: [0, -15, 15, -10, 10, 0],
                    transition: { duration: 0.6, ease: "easeInOut" },
                  });
                }}
              >
                <span className="relative flex items-center gap-x-3">
                  <motion.div animate={controls}>
                    <PhoneCall />
                  </motion.div>
                  BOOK AN APPOINTMENT
                </span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
