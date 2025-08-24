"use client"

import FeaturedSection from "@/components/FeaturedSection";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialSections from "@/components/TestimonialsSection";
import { useEffect } from "react";

export default function Page() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);


  return (
    <>
      <HeroSection />
      <ServicesSection />
      <FeaturedSection />
      <TestimonialSections />
    </>
  );
}
