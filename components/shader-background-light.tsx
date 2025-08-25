"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

interface ShaderBackgroundProps {
  children: React.ReactNode;
}

export default function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true);
    const handleMouseLeave = () => setIsActive(false);

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-white relative overflow-hidden"
    >
      {/* SVG Filters */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter
            id="glass-effect"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feTurbulence baseFrequency="0.002" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.15" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 0.7 0"
              result="tint"
            />
          </filter>
          <filter
            id="gooey-filter"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 16 -8"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Pastel Mesh Gradients */}
      <div className="absolute inset-0 w-full h-full bg-[#ffffff]">
        <MeshGradient
          className="absolute inset-0 w-full h-full"
          colors={[
            "#fde68a", // pastel yellow
            "#fbcfe8", // pastel pink
            "#c7d2fe", // pastel lavender
            "#bae6fd", // pastel blue
            "#bbf7d0", // pastel green
          ]}
          speed={0.2}
        />
      </div>

      <div className="absolute inset-0 w-full h-full bg-transparent">
        <MeshGradient
          className="absolute inset-0 w-full h-full opacity-30"
          colors={[
            "#fbcfe8", // pink
            "#c7d2fe", // lavender
            "#bae6fd", // sky blue
            "#bbf7d0", // mint green
          ]}
          speed={0.1}
          wireframe="true"
        />
      </div>
      {children}
    </div>
  );
}
