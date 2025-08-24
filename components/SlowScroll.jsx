// components/SmoothScroll.js
"use client";

import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;
    let ticking = false;

    const onWheel = (e) => {
      e.preventDefault(); // prevent default jump scroll
      targetScroll += e.deltaY * 0.8; // adjust speed (0.1 = very slow, 1 = normal)
      targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight));
      if (!ticking) requestAnimationFrame(updateScroll);
      ticking = true;
    };

    const updateScroll = () => {
      currentScroll += (targetScroll - currentScroll) * 0.1; // smooth interpolation
      window.scrollTo(0, currentScroll);
      if (Math.abs(targetScroll - currentScroll) > 0.5) {
        requestAnimationFrame(updateScroll);
      } else {
        ticking = false;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  return null;
}
