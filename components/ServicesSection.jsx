// app/services/page.tsx
"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Comprehensive Eye Exams",
    description:
      "Thorough vision assessments and eye health check-ups to detect issues early and keep your sight sharp.",
    image: "/services/services_1.png",
  },
  {
    title: "Custom Prescription Lenses",
    description:
      "Premium lenses crafted to your exact prescription for crystal-clear vision and lasting comfort.",
    image: "/services/services_2.png",
  },
  {
    title: "Pediatric Eye Care",
    description:
      "Gentle, specialized care to protect and enhance your child's vision during crucial growth stages.",
    image: "/services/services_3.png",
  },
  {
    title: "Contact Lens Fitting & Guidance",
    description:
      "Personalized fittings and expert tips to ensure your contact lenses provide optimal comfort and clarity.",
    image: "/services/services_4.png",
  },
];

const cardVariants = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

const headingVariants = {
  hidden: { opacity: 0, filter: "blur(10px)", y: -20 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const ServicesSection = () => {
  return (
    <div className="min-h-screen bg-[#f7f2ee] py-12 sm:py-16 lg:py-20 text-center md:text-left">
      <div className="mx-auto px-4 sm:px-6 lg:px-12">
        <p className="text-xs md:text-md lg:text-lg font-medium text-indigo-600 font-oswald uppercase tracking-widest mb-2">
          OUR SERVICES
        </p>
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                     mt-2 mb-4 sm:mb-6 font-playfair-display font-bold uppercase"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          Revolutionizing Vision Care Access
        </motion.h1>

        <motion.p
          initial={{ filter: "blur(10px)", opacity: 0, y: 6 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl 
                     font-light text-gray-700 
                     mb-8 sm:mb-10 lg:mb-12 
                     leading-relaxed max-w-4xl
                     px-2 sm:px-0"
        >
          Thoughtfully designed services combining advanced technology and
          compassionate care—so every visit feels seamless and reassuring.
        </motion.p>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 
                        gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white 
                         p-4 sm:p-6 lg:p-8 
                         rounded-xl text-center 
                         min-h-[20rem] sm:min-h-[24rem] lg:min-h-[26rem] 
                         flex flex-col items-center justify-between
                         border border-transparent 
                         hover:border-indigo-600 hover:scale-105 
                         transition-all duration-300 ease-out
                         shadow-sm hover:shadow-lg"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div
                className="mb-3 sm:mb-4 flex justify-center 
                            h-32 lg:h-40 w-full"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  height={125}
                  width={125}
                  className="object-contain w-auto h-full max-w-full"
                  sizes="(max-width: 640px) 80px, (max-width: 1024px) 100px, 125px"
                />
              </div>

              <div className="flex-grow flex flex-col justify-center">
                <h3
                  className="text-base sm:text-lg lg:text-xl 
                             font-bold mb-2 sm:mb-3 lg:mb-4 
                             font-oswald uppercase 
                             leading-tight px-2 sm:px-0"
                >
                  {service.title}
                </h3>

                <p
                  className="text-gray-700 
                             text-sm sm:text-base lg:text-md 
                             font-figtree leading-relaxed 
                             px-2 sm:px-1 lg:px-0"
                >
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
