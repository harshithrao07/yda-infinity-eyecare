"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import BrandMarquee from "./BrandMarquee";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const items = [
  {
    name: "Teddy",
    color: "Voodoo",
    image: "/featured/teddy-voodoo-flat.jpg",
  },
  {
    name: "Kenji",
    color: "Satin Silver",
    image: "/featured/kenji-satin-silver-sun-flat.jpg",
  },
  {
    name: "Cleo",
    color: "Cherry",
    image: "/featured/cleo-medium-cherry-flat.jpg",
  },
  {
    name: "Brooke x GANNI",
    color: "Liquorice",
    image: "/featured/brooke-ganni-liquorice-sun-side.jpg",
  },
  {
    name: "Neil Large",
    color: "Satin Gold",
    image: "/featured/neil-large-satin-gold-sun-flat.jpg",
  },
  {
    name: "Paloma",
    color: "Tigerwood",
    image: "/featured/paloma-medium-tigerwood-flat.jpg",
  },
];

function ItemCard({ item, index, className = "", disableAnimation = false }) {
  if (disableAnimation) {
    return (
      <div
        className={`relative w-full h-full overflow-hidden cursor-default ${className}`}
      >
        <div className="relative w-full h-full">
          <Image
            src={item.image}
            alt={item.name}
            fill
          />
        </div>

        <div
          className="absolute bottom-2 sm:bottom-3 lg:bottom-4 
                   left-2 sm:left-3 lg:left-4 
                   w-full px-1 text-neutral-900"
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
        className="relative w-full h-full"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-all duration-700 group-hover:brightness-110"
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
                   w-full px-1 text-neutral-900"
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

      {/* Desktop Layout (Complex 3-column grid) */}
      <motion.div
        className="hidden md:grid md:grid-cols-3 md:grid-rows-3 
                   md:h-[800px] xl:h-[1200px]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Row 1 */}
        <motion.div
          className="col-span-1 row-span-1 border-b border-gray-200 border-r"
          whileHover={{ zIndex: 10 }}
        >
          <ItemCard item={items[0]} index={0} />
        </motion.div>

        <motion.div
          className="col-span-1 row-span-1 border-b border-gray-200 border-r "
          whileHover={{ zIndex: 10 }}
        >
          <ItemCard item={items[1]} index={1} />
        </motion.div>

        <motion.div
          className="col-span-1 row-span-1 border-b border-gray-200"
          whileHover={{ zIndex: 10 }}
        >
          <ItemCard item={items[2]} index={2} />
        </motion.div>

        {/* Item 4 (spans 2 rows and 2 columns) */}
        <motion.div
          className="col-span-2 row-span-2 border-b border-gray-200 border-r"
          whileHover={{ zIndex: 10 }}
        >
          <ItemCard item={items[3]} index={3} />
        </motion.div>

        {/* Item 5 */}
        <motion.div
          className="col-start-3 row-start-2 border-b border-gray-200"
          whileHover={{ zIndex: 10 }}
        >
          <ItemCard item={items[4]} index={4} />
        </motion.div>

        {/* Item 6 */}
        <motion.div
          className="col-start-3 row-start-3"
          whileHover={{ zIndex: 10 }}
        >
          <ItemCard item={items[5]} index={5} />
        </motion.div>
      </motion.div>

      <BrandMarquee />
    </section>
  );
}
