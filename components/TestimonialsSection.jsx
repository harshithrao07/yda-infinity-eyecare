"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function TestimonialSections() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef(null);
  const cardRef = useRef(null);
  const [stepPx, setStepPx] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, NY",
      rating: 5,
      text: "The eye exam was incredibly thorough and the staff was so professional. I've never had such a comprehensive vision test before.",
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Los Angeles, CA",
      rating: 5,
      text: "Amazing technology! The 90-second vision test was so convenient and accurate. Highly recommend to anyone looking for quick, reliable eye care.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      location: "Chicago, IL",
      rating: 5,
      text: "The innovative kiosk made getting my vision tested so easy. Perfect for busy professionals who need quick, accurate results.",
    },
    {
      id: 4,
      name: "David Thompson",
      location: "Houston, TX",
      rating: 5,
      text: "Revolutionary approach to vision care. The technology is impressive and the results were incredibly detailed and helpful.",
    },
    {
      id: 5,
      name: "Lisa Wang",
      location: "Miami, FL",
      rating: 5,
      text: "Outstanding service and cutting-edge technology. The whole experience was smooth and professional.",
    },
    {
      id: 6,
      name: "Robert Kim",
      location: "Seattle, WA",
      rating: 5,
      text: "Best vision test I've ever had. The staff was knowledgeable and the equipment was state-of-the-art.",
    },
  ];

  // useLayoutEffect instead of useEffect
  useLayoutEffect(() => {
    const computeStep = () => {
      if (!trackRef.current || !cardRef.current) return;
      const cardRect = cardRef.current.getBoundingClientRect();
      const styles = getComputedStyle(trackRef.current);
      const gapPx = parseFloat(styles.columnGap || styles.gap || "24");
      setStepPx(cardRect.width + gapPx);
    };

    computeStep();
    const ro = new ResizeObserver(computeStep);
    if (trackRef.current) ro.observe(trackRef.current);
    if (cardRef.current) ro.observe(cardRef.current);

    window.addEventListener("resize", computeStep);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", computeStep);
    };
  }, []);

  const nextSlide = () => {
    if (currentIndex < testimonials.length - 3) setCurrentIndex((i) => i + 1);
  };
  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-12 px-4 sm:px-6 lg:px-8 xl:pl-12"
          initial={{ filter: "blur(10px)", opacity: 0 }}
          whileInView={{ filter: "blur(0px)", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center md:text-left w-full">
            <p className="text-xs md:text-md lg:text-lg font-medium text-primary font-oswald uppercase tracking-widest mb-2">
              Testimonials & Reviews
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase font-playfair-display font-bold text-gray-900 tracking-tight leading-tight">
              What Our Clients Say ?
            </h2>
          </div>

          {/* Desktop Arrows */}
          <div className="hidden lg:flex space-x-2">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`p-3 rounded-full border transition-all duration-500 group ${
                currentIndex === 0
                  ? "border-gray-200 bg-transparent cursor-not-allowed"
                  : "bg-transparent border border-black/10 shadow hover:bg-[#d0e8e8]"
              }`}
              aria-label="Previous testimonial"
            >
              <ArrowLeft
                className={`h-5 w-5 transition-all duration-500 ${
                  currentIndex === 0
                    ? "text-primary-light"
                    : "text-primary group-hover:text-white"
                }`}
              />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= testimonials.length - 3}
              className={`p-3 rounded-full border transition-all duration-300 group ${
                currentIndex >= testimonials.length - 3
                  ? "border-gray-200 bg-transparent cursor-not-allowed"
                  : "bg-transparent border border-black/10 shadow hover:bg-[#d0e8e8]"
              }`}
              aria-label="Next testimonial"
            >
              <ArrowRight
                className={`h-5 w-5 transition-all duration-500 ${
                  currentIndex >= testimonials.length - 3
                    ? "text-primary-light"
                    : "text-primary group-hover:text-white"
                }`}
              />
            </button>
          </div>
        </motion.div>

        {/* Mobile Slider */}
        <div className="block lg:hidden pl-4">
          <Swiper
            spaceBetween={16}
            slidesPerView={1.15}
            breakpoints={{
              640: { slidesPerView: 1.15 }, // small tablets
              768: { slidesPerView: 2.15 }, // larger tablets
            }}
            loop
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <div className="bg-[#d0e8e8]/70 p-6 rounded-2xl h-72 flex flex-col justify-between">
                  <div className="flex items-center mb-2">
                    {[...Array(t.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-gray-800 text-base font-figtree flex-1 leading-relaxed mb-4 line-clamp-6">
                    {t.text}
                  </blockquote>
                  <div>
                    <span className="block font-semibold text-gray-900 truncate">
                      {t.name}
                    </span>
                    <span className="block text-xs text-gray-500 truncate">
                      {t.location}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop Carousel */}
        <div className="hidden lg:flex relative overflow-hidden px-4">
          <motion.div
            ref={trackRef}
            className="flex gap-6 will-change-transform"
            animate={{ x: stepPx ? -currentIndex * stepPx : 0 }}
            transition={{
              type: "tween",
              ease: [0.25, 0.46, 0.45, 0.94],
              duration: 0.6,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                ref={(el) => {
                  if (index === 0) cardRef.current = el;
                }}
                className="bg-[#d0e8e8]/70 cursor-default border-transparent border hover:bg-[#c6dbdb] transition-all duration-500 hover:border rounded-2xl flex-shrink-0"
                style={{ width: "calc((100% - 3rem) / 3)", height: "280px" }}
              >
                <div className="p-8 h-full flex flex-col justify-between">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-gray-800 text-base font-figtree flex-1 leading-relaxed mb-4 overflow-hidden">
                    <div className="line-clamp-6">{testimonial.text}</div>
                  </blockquote>
                  <div>
                    <span className="block font-semibold text-gray-900 truncate">
                      {testimonial.name}
                    </span>
                    <span className="block text-xs text-gray-500 truncate">
                      {testimonial.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
