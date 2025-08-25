"use client"

import FeaturedSection from "@/components/FeaturedSection";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialSections from "@/components/TestimonialsSection";

export default function Page() {

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <FeaturedSection />
      <TestimonialSections />
    </>
  );
}
