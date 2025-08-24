import AboutSection from "@/components/AboutSection";
import React from "react";

const page = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 opacity-[3]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,rgb(156,163,175)_1px,transparent_0)] bg-[length:100px_100px]" />
      </div>
      <div
        className="
    absolute inset-0 opacity-5
    bg-[repeating-linear-gradient(to_right,#9ca3af_0px,#9ca3af_2px,transparent_2px,transparent_100px),repeating-linear-gradient(to_bottom,#9ca3af_0px,#9ca3af_2px,transparent_2px,transparent_100px)]
    bg-[length:100px_100px]"
      />
      <AboutSection />
    </div>
  );
};

export default page;
