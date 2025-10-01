"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Phone,
  MapPin,
  Mail,
  Clock,
} from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#03322f]">
      <div className="px-8 py-16 text-white">
        <div className="max-w-6xl mx-auto">
          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-10 mb-12">
            {/* Brand Section */}
            <div className="text-center lg:text-left">
              <Image
                src="/logo-light.png"
                alt="Infinity Eye Care Logo"
                width={80}
                height={80}
                className="mx-auto lg:mx-0 mb-4"
              />
              <h1 className="text-3xl font-light mb-3 text-[#84DCC9]">
                <span
                  className="font-playfair-display italic"
                >
                  Infinity
                </span>
                <br />
                <span className="text-gray-300">Eye Care</span>
              </h1>
              <p className="text-gray-400 text-sm">
                Because your eyes matter
              </p>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="text-white font-medium mb-4 text-center lg:text-left">Contact</h3>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4" style={{ color: "#84DCC9" }} />
                  <div>
                    <p className="text-gray-400 text-sm">
                      Mon - Sat, 10:00 AM - 7:30 PM
                    </p>
                  </div>
                </div>

                <Link
                  href="tel:08244110079"
                  className="flex items-center space-x-3 text-gray-300 hover:text-white"
                >
                  <Phone className="w-4 h-4" style={{ color: "#84DCC9" }} />
                  <p className="text-sm">0824 411 0079</p>
                </Link>

                <Link
                  href="mailto:eyecareinfinity@gmail.com"
                  target="_blank"
                  className="flex items-center space-x-3 text-gray-300 hover:text-white"
                >
                  <Mail className="w-4 h-4" style={{ color: "#84DCC9" }} />
                  <p className="text-sm">info@infinityeyecare.com</p>
                </Link>
              </div>
            </div>

            {/* Location Section */}
            <div>
              <h3 className="text-white font-medium mb-4 text-center lg:text-left">Location</h3>

              <Link
                target="_blank"
                href="https://www.google.com/maps/dir//Ibrose+commercial+complex,+4-7-730%2F41,+MG+Rd,+Tilak+Nagar,+Boloor,+Kodailbail,+Mangaluru,+Karnataka+575003/@12.8769827,74.7596321,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3ba35bcc3efe5433:0x5ea2c8194a5061c9!2m2!1d74.8420346!2d12.8769956?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D"
                className="flex items-start space-x-3 text-gray-400 hover:text-gray-300"
              >
                <MapPin className="w-4 h-4 mt-1" style={{ color: "#84DCC9" }} />
                <div>
                  <p className="text-sm leading-relaxed">
                    Ibrose Commercial Complex
                    <br />
                    4-7-730/41, MG Road
                    <br />
                    Tilak Nagar, Boloor
                    <br />
                    Mangaluru, Karnataka 575003
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex justify-center lg:justify-start space-x-4 mb-8">
            {[
              {
                href: "https://www.facebook.com/eyecareinfinity/",
                icon: Facebook,
                label: "Facebook",
              },
              {
                href: "https://www.instagram.com/eyecareinfinity/",
                icon: Instagram,
                label: "Instagram",
              }
            ].map(({ href, icon: Icon, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="text-gray-400 hover:text-white"
                target="_blank"
              >
                <Icon className="w-5 h-5" />
              </Link>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
