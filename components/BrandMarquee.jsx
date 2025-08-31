"use client";

import React from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

const brands = [
  { name: "Ray-Ban", src: "/brands/rayban.png", width: 120, height: 40 },
  { name: "Oakley", src: "/brands/oakley.png", width: 120, height: 40 },
  { name: "Gucci", src: "/brands/gucci.png", width: 120, height: 40 },
  { name: "Prada", src: "/brands/prada.png", width: 120, height: 40 },
  { name: "Maui Jim", src: "/brands/mauijim.png", width: 130, height: 40 },
  { name: "Persol", src: "/brands/persol.png", width: 120, height: 40 },
  { name: "Tom Ford", src: "/brands/tomford.png", width: 120, height: 40 },
  { name: "Dior", src: "/brands/dior.png", width: 120, height: 40 },
];

function MarqueeStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
        
        @keyframes marquee-right {
          0% { transform: translate3d(-100%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        
        .marquee-container {
          display: flex;
          overflow: hidden;
          width: 100%;
        }
        
        .marquee-track {
          display: flex;
          align-items: center;
          gap: 4rem;
          will-change: transform;
          flex-shrink: 0;
        }
        
        .marquee-animate-left {
          animation-name: marquee-left;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        
        .marquee-animate-right {
          animation-name: marquee-right;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        
        @media (max-width: 768px) {
          .marquee-track {
            gap: 2rem;
          }
        }
        
        /* Pause animation on hover for accessibility */
        .marquee-container:hover .marquee-track {
          animation-play-state: paused;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .marquee-animate-left,
          .marquee-animate-right {
            animation: none !important;
          }
        }
      `,
      }}
    />
  );
}

function MarqueeRow({
  items,
  durationSec = 300,
  ariaLabel,
  direction = "left",
}) {
  const prefersReducedMotion = useReducedMotion();

  // Create enough duplicates for seamless looping
  const loopItems = React.useMemo(() => {
    const duplicates = Math.ceil(100 / items.length); // Ensure smooth loop
    return Array(duplicates).fill(items).flat();
  }, [items]);

  return (
    <div className="marquee-container relative w-full h-18 lg:h-40">
      <div aria-label={ariaLabel} role="list" className="flex">
        <div
          className={[
            "marquee-track",
            prefersReducedMotion
              ? ""
              : direction === "left"
              ? "marquee-animate-left"
              : "marquee-animate-right",
          ].join(" ")}
          style={
            prefersReducedMotion
              ? { transform: "translateX(0)" }
              : {
                  animationDuration: `${durationSec}s`,
                }
          }
          role="presentation"
          aria-hidden="true"
        >
          {loopItems.map((brand, idx) => (
            <div
              role="listitem"
              key={`${brand.name}-${idx}`}
              className="shrink-0 flex items-center justify-center 
                         w-16 h-full sm:w-20 md:w-24 lg:w-28
                         "
              aria-label={brand.name}
              title={brand.name}
            >
              <Image
                src={brand.src}
                alt={`${brand.name} logo`}
                width={brand.width}
                height={brand.height}
                className="object-contain max-w-full h-auto filter brightness-0 invert 
                         opacity-60"
                priority={idx < items.length}
                loading={idx < items.length ? "eager" : "lazy"}
                decoding="async"
                sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, 112px"
                onError={(e) => {
                  e.currentTarget.style.visibility = "hidden";
                  console.warn(`Failed to load brand image: ${brand.name}`);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BrandMarquee() {
  return (
    <section
      className="w-full bg-black text-white"
      aria-labelledby="brands-heading"
    >
      <MarqueeStyles />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">

        <div className="relative">
          <MarqueeRow
            items={brands}
            durationSec={500}
            ariaLabel="Eyewear brands scrolling marquee"
            direction="left"
          />

          {/* Edge gradients for fade effect */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 
                         w-8 sm:w-12 lg:w-16 
                         bg-gradient-to-r from-black to-transparent z-10"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 
                         w-8 sm:w-12 lg:w-16 
                         bg-gradient-to-l from-black to-transparent z-10"
          />
        </div>
      </div>
    </section>
  );
}
