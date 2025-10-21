"use client";

import React from "react";
import { motion } from "framer-motion";

export default function GoogleReviewsSection() {
  const placeId = "ChIJM1T-PsxbozsRyWFQShnIol4";
  const reviewLink = `https://search.google.com/local/writereview?placeid=${placeId}`;

  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 xl:pl-12 text-center">
        {/* Header */}
        <motion.div
          initial={{ filter: "blur(10px)", opacity: 0 }}
          whileInView={{ filter: "blur(0px)", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-xs md:text-md lg:text-lg font-medium text-primary font-oswald uppercase tracking-widest mb-2">
            Google Reviews
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase font-bold text-gray-900 tracking-tight leading-tight mb-6">
            Share Your Experience
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-8">
            We’d love to hear your feedback! Click the button below to leave a
            Google review.
          </p>
        </motion.div>

        {/* Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href={reviewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full 
    px-4 py-2 text-xs  
    sm:px-6 sm:py-2.5 sm:text-sm md:text-base 
    bg-[#77C4B7]/50 backdrop-blur-md 
    border border-[#476563]/50 
    text-[#0D0E0E] font-medium
    shadow-[0_4px_20px_rgba(119,196,183,0.25)] 
    hover:bg-[#77C4B7]/80 
    hover:border-[#77C4B7] 
    hover:shadow-[0_6px_25px_rgba(71,101,99,0.35)] 
    transition-all duration-300 cursor-pointer"
          >
            Leave a Review
          </a>
        </motion.div>
      </div>
    </section>
  );
}
