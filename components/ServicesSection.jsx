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
      "Gentle, specialized care to protect and enhance your child’s vision during crucial growth stages.",
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
    <div className="min-h-screen bg-[#f7f2ee] py-16">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-3xl sm:text-5xl mt-2 mb-4"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="font-playfair-display italic font-semibold">
            Revolutionizing
          </span>{" "}
          Vision Care Access
        </motion.h1>

        <motion.p
          initial={{ filter: "blur(10px)", opacity: 0, y: 6 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-md xl:text-lg font-light text-gray-700 mb-12 leading-relaxed"
        >
          Thoughtfully designed services combining advanced technology and
          compassionate care—so every visit feels seamless and reassuring.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl text-center min-h-[26rem] flex flex-col items-center border border-transparent hover:border-indigo-600 hover:scale-105 transition-all duration-300"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="mb-4 flex justify-center h-40">
                <Image
                  src={service.image}
                  alt={service.title}
                  height={125}
                  width={125}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-4 font-oswald uppercase">
                {service.title}
              </h3>
              <p className="text-gray-700 text-md font-figtree">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
