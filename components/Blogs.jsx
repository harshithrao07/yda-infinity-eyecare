"use client";
import { ArrowRightCircleIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import blogs from "../public/blogs/blogs.json"; 

const Blogs = () => {
  const router = useRouter();

  return (
    <section className="py-16 lg:py-22">
      <div className="max-w-7xl mx-auto px-6 grid gap-8 md:grid-cols-3">
        {blogs.map((post) => (
          <div
            key={post.id}
            onClick={() => router.push(`/blogs/${post.id}`)}
            className="group cursor-pointer rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#056560] line-clamp-2">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {post.createdAt} · {post.readingTime} min read
              </p>
            </div>

            {/* Bottom CTA */}
            <div className="flex justify-end items-center px-5 pb-4">
              <ArrowRightCircleIcon className="w-6 h-6 text-gray-400 group-hover:text-[#056560] transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
