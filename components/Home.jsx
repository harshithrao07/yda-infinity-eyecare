import Image from "next/image";
import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* First section */}
      <div className="h-screen w-full grid grid-cols-2">
        <div className="relative w-full h-full">
          <Image src="/1.jpg" alt="Image 1" fill className="object-cover" />
        </div>
        <div className="relative w-full h-full">
          <Image src="/5.jpg" alt="Image 2" fill className="object-cover" />
        </div>
      </div>

      {/* Second section */}
      <div className="h-screen w-full grid grid-cols-2">
        <div className="relative w-full h-full">
          <Image src="/7.jpg" alt="Image 1" fill className="object-cover" />
        </div>
        <div className="relative w-full h-full">
          <Image src="/2.jpg" alt="Image 2" fill className="object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Home;
