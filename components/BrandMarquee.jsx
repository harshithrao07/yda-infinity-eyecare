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
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .marquee-track {
          display: flex;
          align-items: center;
          gap: 8rem; /* spacing between logos */
          will-change: transform;
        }
        .marquee-animate {
          animation-name: marquee-left;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `,
      }}
    />
  );
}

function MarqueeRow({ items, durationSec = 30, ariaLabel, invert = false }) {
  const prefersReducedMotion = useReducedMotion();

  // Duplicate items for seamless looping
  const loopItems = React.useMemo(() => [...items, ...items], [items]);

  return (
    <div className="relative overflow-hidden w-full">
      <div aria-label={ariaLabel} role="list">
        <div
          className={[
            "marquee-track",
            prefersReducedMotion ? "" : "marquee-animate",
          ].join(" ")}
          style={
            prefersReducedMotion
              ? undefined
              : {
                  animationDuration: `${durationSec}s`,
                  display: "flex",
                }
          }
          role="presentation"
          aria-hidden="true"
        >
          {loopItems.map((brand, idx) => (
            <div
              role="listitem"
              key={`${brand.name}-${idx}`}
              className="shrink-0 flex items-center justify-center w-20 h-12 md:w-24 md:h-14"
              aria-label={brand.name}
              title={brand.name}
            >
              <Image
                src={brand.src}
                alt={brand.name}
                width={brand.width}
                height={brand.height}
                className={`object-contain ${invert ? "invert" : ""}`}
                priority={idx < items.length}
                loading={idx < items.length ? "eager" : "lazy"}
                decoding="async"
                style={{ maxWidth: "100%", height: "auto" }}
                onError={(e) => {
                  e.currentTarget.style.visibility = "hidden";
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
    <section className="w-full bg-black text-white" aria-labelledby="brands-heading">
      <MarqueeStyles />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="relative">
          {/* Desktop */}
          <div className="hidden md:block">
            <MarqueeRow
              items={brands}
              durationSec={40} // slower and smooth
              ariaLabel="Eyewear brands scrolling row"
              invert={false}
            />
          </div>
          {/* Mobile */}
          <div className="md:hidden">
            <MarqueeRow
              items={brands}
              durationSec={50} // slower for mobile
              ariaLabel="Eyewear brands scrolling row"
              invert={false}
            />
          </div>

          {/* Edge gradients */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent" />
        </div>
      </div>
    </section>
  );
}
