"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="bg-gradient-to-b from-white to-sky-50">
      
      {/* Hero / About Intro */}
      <section className="py-20 px-6 lg:px-20 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center min-h-[90vh]">
        
        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative w-full h-[450px] rounded-2xl overflow-hidden shadow-xl"
        >
          <Image
            src="/about-eye-care.jpg" // replace with your clinic/team image
            alt="Infinity Eye Care Clinic"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-bold text-sky-900">
            About Infinity Eye Care
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At <span className="font-semibold">Infinity Eye Care</span>, your vision 
            is our priority. We provide comprehensive eye exams, stylish lenses & frames, 
            and expert contact lens fittings. Our specialties include Vision Therapy, 
            Low Vision solutions, and Ocular Prosthesis.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            With a patient-first approach and state-of-the-art technology, we’re dedicated 
            to helping you see the world clearly and comfortably.
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 lg:px-20 max-w-6xl mx-auto text-center">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-sky-900 mb-6"
        >
          Our Mission
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed"
        >
          To provide world-class eye care that blends compassion with innovation. 
          Our team strives to make every patient feel cared for, informed, and confident 
          in their treatment—because your eyesight deserves nothing less than the best.
        </motion.p>
      </section>

      {/* Highlights Grid */}
      <section className="py-16 px-6 lg:px-20 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "👩‍⚕️ Expert Doctors",
              desc: "Trusted specialists with years of experience in eye health."
            },
            {
              title: "🔬 Advanced Technology",
              desc: "Modern diagnostics and treatments for all eye conditions."
            },
            {
              title: "🌟 Patient-Centered Care",
              desc: "Compassionate, personalized care for every patient."
            },
            {
              title: "🏥 Comprehensive Services",
              desc: "From eye exams to prosthetics—complete vision care."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-white rounded-2xl shadow-md border hover:shadow-lg transition"
            >
              <h4 className="text-xl font-semibold text-sky-800">{item.title}</h4>
              <p className="text-gray-600 mt-2 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Meet Our Doctors */}
      <section className="py-20 px-6 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-sky-900 mb-12"
          >
            Meet Our Doctors
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Ananya Sharma",
                role: "Senior Ophthalmologist",
                img: "/doctor1.jpg"
              },
              {
                name: "Dr. Rahul Mehta",
                role: "Contact Lens Specialist",
                img: "/doctor2.jpg"
              },
              {
                name: "Dr. Priya Nair",
                role: "Vision Therapy Expert",
                img: "/doctor3.jpg"
              }
            ].map((doc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-sky-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden shadow-md mb-4">
                  <Image
                    src={doc.img}
                    alt={doc.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="text-xl font-semibold text-sky-900">{doc.name}</h4>
                <p className="text-gray-600">{doc.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-16 px-6 lg:px-20 bg-sky-900 text-center text-white">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-4"
        >
          Ready to Prioritize Your Eye Health?
        </motion.h3>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Schedule your comprehensive eye exam with Infinity Eye Care today. 
          Let us help you see a brighter future.
        </p>
        <button className="bg-white text-sky-900 px-6 py-3 rounded-full font-semibold shadow hover:bg-sky-100 transition">
          Book Appointment
        </button>
      </section>

    </main>
  );
}
