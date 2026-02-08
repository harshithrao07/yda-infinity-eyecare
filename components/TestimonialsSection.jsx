"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function formatTestimonialText(text) {
  const paragraphs = String(text)
    .trim()
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return paragraphs.map((paragraph, index) => (
    <p key={index} className={index < paragraphs.length - 1 ? "mb-3" : ""}>
      {paragraph}
    </p>
  ));
}

export default function TestimonialSections() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const trackRef = useRef(null);
  const cardRef = useRef(null);
  const [stepPx, setStepPx] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Hanisha Gonzalves",
      rating: 5,
      text: `
      I had a truly excellent experience with Mr. Vijith Saldanha (Optometrist), at Infinity Eye Care, Mangalore. From the moment I walked in, the consultation felt professional, comfortable, and reassuring. The eye examination was very thorough, and Vijith took the time to carefully assess my eye health without any rush.

What I appreciated the most was the clear and patient explanation of every step of the check-up and the results, recommended the most suitable eye drops and spectacles based on my condition and lifestyle, rather than a one-size-fits-all approach. I was also given detailed guidance on how to take proper care of my eyes, including preventive measures and daily habits to maintain good eye health.

Mr. Vijith Saldanha is extremely knowledgeable, approachable, and attentive, making it easy to ask questions and fully understand the treatment plan. The advice provided felt honest and genuinely focused on long-term eye care rather than just immediate treatment.

Overall, my experience at Infinity Eye Care was outstanding. I left the clinic feeling confident, well-informed, and satisfied with the care I received. I would highly recommend Mr. Vijith Saldanha (Optometrist) and Infinity Eye Care, Mangalore to anyone looking for expert eye care, accurate guidance, and a compassionate approach.
      `,
    },
    {
      id: 2,
      name: "Yogesh",
      rating: 5,
      text: `
      Huge shoutout to Mr. Vijith at Infinity Eye Care, Mangalore! If you're looking for an eye clinic that actually listens and explains things clearly, this is the place.I received a thorough check-up and genuine advice on how to look after my vision for the long run. Professional, honest, and highly recommended for anyone in the area. Thank you 🕶️
      `
    },
    {
      id: 3,
      name: "Maahi Vlogs",
      rating: 5,
      text: `
      Had some issues with my eyes and was stressed but Vijith you were very kind to explain me everything in details and i was stress free in no time. Thank you for being kind and i will recommend everyone to visit here. He is the best and a kind soul too. He will help u with proper suggestions and check ups. All from my heart. Thank you vijith once again. God bless you
      `
    },
    {
      id: 4,
      name: "David Thompson",
      rating: 5,
      text: "Revolutionary approach to vision care. The technology is impressive and the results were incredibly detailed and helpful.",
    },
    {
      id: 5,
      name: "Rafeez Kandak",
      rating: 5,
      text: `
      I recently visited Infinity Eye Care with my two kids for an eye check-up. All three of us have astigmatism, and Mr. Vijith Saldhana attended to us with great patience and professionalism. He took the time to thoroughly examine each of us, answer all our questions, and guide us in choosing the most suitable lenses.

I use progressive lenses and had been struggling with my previous pair, so I was a bit skeptical at first. Although my prescription power had not changed from my earlier test, the lenses recommended and provided by Mr. Vijith have made a remarkable difference. My vision feels clear and comfortable now, and I truly feel my sight has been corrected. I’m extremely satisfied with his expertise and highly recommend him.
      `
    },
    {
      id: 6,
      name: "Maureen Edwards",
      rating: 5,
      text: `
      Had a good experience at Infinity Eye Care. The optometrist was patient while helping me select the right frame and also explained the issue of overcorrection in my eye power, which I really appreciated. I received my spectacles within a day, and I'm happy with the quality and service.
      `
    }
  ];

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (selectedTestimonial) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [selectedTestimonial]);

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
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase font-bold text-gray-900 tracking-tight leading-tight">
              What Our Clients Say ?
            </h2>
          </div>

          {/* Desktop Arrows */}
          <div className="hidden lg:flex space-x-2">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`p- 3 rounded - full border transition - all duration - 500 group ${ currentIndex === 0
      ? "border-gray-200 bg-transparent cursor-not-allowed"
      : "bg-transparent border border-black/10 shadow hover:bg-[#d0e8e8]"
                } `}
              aria-label="Previous testimonial"
            >
              <ArrowLeft
                className={`h - 5 w - 5 transition - all duration - 500 ${
  currentIndex === 0
  ? "text-primary-light"
  : "text-primary group-hover:text-white"
} `}
              />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= testimonials.length - 3}
              className={`p - 3 rounded - full border transition - all duration - 300 group ${
  currentIndex >= testimonials.length - 3
  ? "border-gray-200 bg-transparent cursor-not-allowed"
  : "bg-transparent border border-black/10 shadow hover:bg-[#d0e8e8]"
} `}
              aria-label="Next testimonial"
            >
              <ArrowRight
                className={`h - 5 w - 5 transition - all duration - 500 ${
  currentIndex >= testimonials.length - 3
  ? "text-primary-light"
  : "text-primary group-hover:text-white"
} `}
              />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ filter: "blur(10px)", opacity: 0 }}
          whileInView={{ filter: "blur(0px)", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
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
                  <div className="bg-[#d0e8e8]/70 p-6 rounded-2xl min-h-[18rem] flex flex-col justify-between">
                    <div className="mb-2">
                      <span className="block font-semibold text-gray-900 truncate">
                        {t.name}
                      </span>
                      {t.location && (
                        <span className="block text-xs text-gray-500 truncate">
                          {t.location}
                        </span>
                      )}
                    </div>
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
                    <blockquote className="text-gray-800 text-base font-figtree leading-relaxed mb-3 line-clamp-4 overflow-hidden">
                      {formatTestimonialText(t.text)}
                    </blockquote>
                    <button
                      type="button"
                      onClick={() => setSelectedTestimonial(t)}
                      className="text-xs font-medium text-primary hover:underline self-start mt-auto"
                    >
                      Read full review
                    </button>
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
                  style={{
                    width: "calc((100% - 3rem) / 3)",
                    minHeight: "280px",
                  }}
                >
                  <div className="p-8 h-full flex flex-col justify-between">
                    <div className="mb-2">
                      <span className="block font-semibold text-gray-900 truncate">
                        {testimonial.name}
                      </span>
                    </div>
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
                    <blockquote className="text-gray-800 text-base font-figtree leading-relaxed mb-3 line-clamp-5 overflow-hidden">
                      <div>{formatTestimonialText(testimonial.text)}</div>
                    </blockquote>
                    <button
                      type="button"
                      onClick={() => setSelectedTestimonial(testimonial)}
                      className="text-xs font-medium text-primary hover:underline self-start mt-auto"
                    >
                      Read full review
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {selectedTestimonial && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={() => setSelectedTestimonial(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-xl max-h-[80vh] overflow-y-auto rounded-2xl bg-[#d0e8e8] p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedTestimonial(null)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
              aria-label="Close full review"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-2">
              <span className="block font-semibold text-gray-900">
                {selectedTestimonial.name}
              </span>
              {selectedTestimonial.location && (
                <span className="block text-xs text-gray-600">
                  {selectedTestimonial.location}
                </span>
              )}
            </div>

            <div className="mb-3 flex items-center">
              {[...Array(selectedTestimonial.rating)].map((_, i) => (
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

            <blockquote className="mb-4 text-base leading-relaxed text-gray-800">
              {formatTestimonialText(selectedTestimonial.text)}
            </blockquote>
          </motion.div>
        </div>
      )}
    </section>
  );
}
