"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import BrandMarquee from "./BrandMarquee";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const items = [
  {
    name: "RAY-BAN",
    color: "RB 6489",
    image: "/featured/RB 6489.jpg",
  },
  {
    name: "RAY-BAN",
    color: "RB 5434",
    image: "/featured/RB 5434.avif",
  },
  {
    name: "FCUK",
    color: "FCL 4340",
    image: "/featured/FCL 4340.webp",
  },
  {
    name: "RAY-BAN",
    color: "RB 7236I",
    image: "/featured/RB 7236I.webp",
  },
  {
    name: "FCUK",
    color: "FCL 5315",
    image: "/featured/FCL 5315.webp",
  },
  {
    name: "FCUK",
    color: "FC 8287",
    image: "/featured/FC 8287.webp",
  },
  {
    name: "FCUK",
    color: "FCL 4343",
    image: "/featured/FCL 4343.webp",
  },
  {
    name: "CARRERA",
    color: "VICTORY C16",
    image: "/featured/Carrera victory c16.webp",
  },
  {
    name: "CARRERA",
    color: "8925",
    image: "/featured/Carrera 8925.webp",
  },
  {
    name: "CARRERA",
    color: "DUCATI 010",
    image: "/featured/Carrera ducati  010.webp",
  },
  {
    name: "Vogue",
    color: "5516B",
    image: "/featured/Vo 5516b.webp",
  },
];

function ItemCard({
  item,
  index,
  className = "",
  disableAnimation = false,
  contain = false,
}) {
  const imageFitClass = contain ? "object-contain" : "object-cover";
  if (disableAnimation) {
    return (
      <div
        className={`relative w-full h-full overflow-hidden cursor-default ${className}`}
      >
        <div className="relative w-full h-full bg-neutral-50">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className={imageFitClass}
          />
        </div>

        <div
          className="absolute bottom-2 sm:bottom-3 lg:bottom-4 
                   left-2 sm:left-3 lg:left-4 
                   w-full px-2 py-1 bg-neutral-50/95 text-neutral-900"
        >
          <h3
            className="text-lg sm:text-xl lg:text-2xl xl:text-3xl 
                     font-light font-playfair-display leading-tight"
          >
            {item.name}
          </h3>
          <p
            className="text-xs sm:text-sm lg:text-base 
                     font-figtree mt-0.5 sm:mt-1 text-gray-700"
          >
            {item.color}
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={`relative w-full h-full overflow-hidden group cursor-default ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
    >
      {/* Image with scale animation */}
      <motion.div
        className="relative w-full h-full bg-neutral-50"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          className={`${imageFitClass} transition-all duration-700 group-hover:brightness-110`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Overlay that appears on hover */}
        <motion.div
          className="absolute inset-0 bg-black/20"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Text content with slide up animation */}
      <motion.div
        className="absolute bottom-2 sm:bottom-3 lg:bottom-4 
                   left-2 sm:left-3 lg:left-4 
                   w-full px-2 py-1 bg-neutral-50/95 text-neutral-900"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: index * 0.1 + 0.3,
          ease: "easeOut",
        }}
      >
        <motion.h3
          className="text-lg sm:text-xl lg:text-2xl xl:text-3xl 
                     font-light font-playfair-display leading-tight"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          {item.name}
        </motion.h3>
        <motion.p
          className="text-xs sm:text-sm lg:text-base 
                     font-figtree mt-0.5 sm:mt-1 text-gray-700"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2, delay: 0.05 }}
        >
          {item.color}
        </motion.p>
      </motion.div>

      {/* Animated border that appears on hover */}
      <motion.div
        className="absolute inset-0 border-2 border-transparent"
        whileHover={{ borderColor: "#ffffff4d" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export default function FeaturedSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const desktopColumns = 4;
  const remainder = items.length % desktopColumns;
  const extraItemsCount = remainder === 0 ? 0 : desktopColumns - remainder;
  const desktopItems =
    extraItemsCount === 0
      ? items
      : [...items, ...items.slice(0, extraItemsCount)];

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="w-full">
      {/* Animated title */}
      <motion.div
        className="border-b px-4 sm:px-6 lg:px-8 xl:pl-12 
                   py-4 sm:py-5 lg:py-6 text-center md:text-left"
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <p
          className="text-xs md:text-md lg:text-lg 
                     font-medium text-primary uppercase 
                     tracking-widest font-oswald mb-2"
        >
          Our top picks
        </p>
        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
                       font-bold tracking-tight uppercase leading-tight"
        >
          Featured Eyewear
        </h2>
      </motion.div>

      {/* Mobile Layout (1 column) */}
      <div className="block sm:hidden">
        <Swiper
          slidesPerView={2.1}
          grabCursor={true}
          loop={true}
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="h-46">
                <ItemCard item={item} index={index} disableAnimation />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <motion.div
        className="hidden md:grid grid-cols-4 gap-0"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {desktopItems.map((item, index) => (
          <motion.div
            key={`${item.name}-${item.color}-${index}`}
            className="overflow-hidden"
            whileHover={{ zIndex: 10 }}
          >
            <div className="aspect-[4/5]">
              <ItemCard item={item} index={index} contain />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <BrandMarquee />
    </section>
  );
}
