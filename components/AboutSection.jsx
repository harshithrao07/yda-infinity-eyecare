"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { BriefcaseMedical, Eye, Monitor } from "lucide-react";
import ShaderBackground from "./shader-background-light";

export default function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  const team = [
    {
      name: "MATTHIAS HOFMANN",
      role: "Co-founder, CEO",
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
        <div className="relative h-screen flex flex-col lg:flex-row items-center gap-12 lg:gap-16 px-6 lg:px-16 py-12">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-200/30 rounded-full blur-2xl" />
          <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-yellow-200/20 rounded-full blur-2xl" />
          <div className="absolute top-1/2 left-4/12 w-64 h-64 bg-red-200/30 rounded-full blur-2xl" />

          {/* Left content */}
          <div className="flex-1 flex flex-col justify-center text-left">
            {/* Highlight pill */}
            <motion.div
              initial={{ filter: "blur(10px)", opacity: 0, y: 8 }}
              whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-default w-fit"
            >
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.6 }}
                className="flex gap-1"
              >
                {["🛡️", "Trusted", "Eye", "Care", "Since", "2008"].map(
                  (w, i) => (
                    <motion.span
                      key={i}
                      variants={word}
                      className="text-gray-800 text-xs xl:text-md font-medium"
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
              className="text-5xl md:text-6xl xl:text-7xl leading-tight tracking-tight font-light text-black mb-6"
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
              className="text-black font-light leading-relaxed text-md lg:text-lg"
            >
              Founded with a vision to bring clarity and style to every
              eye,&nbsp;
              <span className="font-bold font-playfair-display italic">
                Infinity Eye Care
              </span>{" "}
              Center started as a small family-run practice and has grown into a
              trusted destination for premium optical care. We provide precise
              eye exams, advanced lens technology, and a wide range of stylish
              frames. <br /> <br />
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 w-fit">
                {[
                  { number: "15+", label: "Years in Eye Care" },
                  { number: "10k+", label: "Happy Patients" },
                  { number: "1000+", label: "Eyewear Styles" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="text-center cursor-default bg-white backdrop-blur-md rounded-xl p-4 border border-gray-400 hover:border-gray-600 hover:shadow-lg transition-all duration-300 hover:bg-gray-50"
                  >
                    <div className="text-3xl font-bold text-neutral-900 mb-1 font-oswald">
                      {stat.number}
                    </div>
                    <div className="text-sm text-neutral-600 font-figtree">
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
            className="flex-1 w-full max-w-lg lg:max-w-xl relative"
          >
            <div className="relative w-full h-96 lg:h-[500px] border rounded-2xl border-black overflow-hidden shadow-xl bg-gradient-to-br from-white/80 to-rose-50/40">
              <Image
                src="/about/infinityeyecare.webp"
                alt="Infinity Eye Care - Eyewear and Eye Exams"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            </div>
          </motion.div>
        </div>

        {/* CREDENTIALS */}
        <section className="py-24 relative">
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
                      className="bg-white hover:scale-105 cursor-default backdrop-blur-md rounded-xl p-10 border border-gray-400 hover:border-gray-600 hover:shadow-lg transition-all duration-300 hover:bg-gray-50 flex flex-col items-center gap-4"
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
      <section className="py-20 bg-[#f7f2ee]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-neutral-900 mb-4 font-playfair-display">
            Meet Our Experts
          </h3>
          <p className="text-neutral-600 mb-12">
            Our team of skilled optometrists and eyewear specialists is here to
            help you see clearly and look great.
          </p>
          <div
            className={`grid gap-8 ${
              team.length === 1
                ? "grid-cols-1 justify-items-center"
                : "grid-cols-1 md:grid-cols-3"
            }`}
          >
            {" "}
            {team.map((member, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-black p-8 text-center max-w-sm w-full"
              >
                <div className="w-48 h-48 mx-auto mb-8">
                  <Image
                    src={member.img}
                    alt={member.name}
                    width={192}
                    height={192}
                    className="object-cover rounded-2xl w-full h-full border border-black"
                  />
                </div>
                <h4 className="text-3xl font-extrabold font-oswald text-neutral-800 uppercase mb-3">
                  {member.name}
                </h4>
                <p className="text-neutral-500 text-lg">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section className="py-20 bg-gradient-to-br from-[#F3E8FF] to-[#E9D5FF] relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center lg:justify-start"
            >
              <div className="relative w-80 h-[568px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-white/80 to-purple-100/60 backdrop-blur-sm border border-white/50">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-purple-700 font-figtree text-sm font-medium">
                    Watch Our Store Tour
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold text-neutral-900 font-playfair-display">
                Eye Care & Eyewear Like Never Before
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed font-figtree">
                Our boutique blends healthcare and fashion, ensuring your eyes
                are healthy and your look is sharp.
              </p>
              <div className="space-y-3">
                {[
                  "Comprehensive Eye Exams",
                  "Designer Eyewear & Sunglasses",
                  "Custom Prescription Lenses",
                  "Contact Lens Fitting & Training",
                ].map((point, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-neutral-700 font-figtree">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-purple-600 to-rose-500 text-white text-center">
        <h2 className="text-4xl font-bold mb-4 font-playfair-display">
          Your Vision, Our Mission
        </h2>
        <p className="text-lg mb-8">
          Book your eye exam today and discover frames that fit your style.
        </p>
        <button className="bg-white text-purple-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-purple-50 transition">
          Book Appointment
        </button>
      </section>
    </main>
  );
}
