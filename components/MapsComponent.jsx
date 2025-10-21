import React, { useState } from "react";
import { MapPin } from "lucide-react";

const MapsComponent = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.6890474924556!2d74.839844!3d12.8769956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35bcc3efe5433%3A0x5ea2c8194a5061c9!2sInfinity%20Eye%20Care!5e0!3m2!1sen!2sus!4v1693234567890";

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#77C4B740] backdrop-blur-sm border border-[#84DCC920] mb-6">
          <MapPin className="w-4 h-4 text-[#476563]" />
          <span className="text-[#476563] font-medium text-sm">
            Our Location
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
          <span className="font-playfair-display italic font-semibold">
            Find
          </span>{" "}
          <span className="font-light">Us Here</span>
        </h2>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Located in the heart of the city for your convenience. We're easily
          accessible and ready to serve you.
        </p>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-96 sm:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Background decorative elements */}
        <div className="absolute top-4 left-4 w-20 h-20 bg-blue-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-4 right-4 w-16 h-16 bg-purple-200/20 rounded-full blur-lg"></div>

        {/* Loading State */}
        {!isMapLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse shadow-lg">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-gray-200 rounded-full w-32 mx-auto animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded-full w-24 mx-auto animate-pulse"></div>
              </div>
              <p className="text-gray-600 font-medium mt-4">Loading Map...</p>
            </div>
          </div>
        )}

        {/* Google Maps Iframe */}
        <iframe
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setIsMapLoaded(true)}
          className="rounded-3xl"
          title="Location Map"
        />

        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-black/5 pointer-events-none rounded-3xl"></div>

        {/* Bottom Info Card */}
        {/* <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-lg mb-2">
                Infinity Eye Care
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Ibrose commercial complex, 4-7-730/41, MG Rd, Tilak Nagar,
                Boloor, Kodailbail
                <br />
                Mangaluru, Karnataka 575003
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="text-center sm:text-right">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                  Phone
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  0824 411 0079
                </p>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                  Hours
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  Mon - Sat,
                  <br /> 10:00 AM - 7:30 PM
                </p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default MapsComponent;
