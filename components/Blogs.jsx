"use client";

import { ArrowRightCircleIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Blogs = () => {
  const router = useRouter();

  const blogPosts = [
    {
      id: 1,
      title: "Understanding Common Eye Conditions",
      category: "Eye Care",
      createdAt: "August 1, 2025",
      readingTime: 6,
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Tips for Maintaining Healthy Vision",
      category: "Eye Care",
      createdAt: "July 20, 2025",
      readingTime: 5,
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "The Impact of Screen Time on Your Eyes",
      category: "Eye Health",
      createdAt: "August 12, 2025",
      readingTime: 7,
      image:
        "https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="pb-16 px-4 pt-25">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              onClick={() => router.push(`/blogs/${post.id}`)}
              key={post.id}
              className="relative rounded-t-md rounded-bl-md h-[385px] w-full bg-white cursor-pointer group"
              style={{
                clipPath:
                  "polygon(0 0, 100% 0, 100% 87%, 20% 87%, 15% 100%, 0 100%)",
                background: "white",
              }}
            >
              {/* Main Card Content */}
              <div className="flex flex-col h-full w-full overflow-hidden">
                {/* Image Padding Wrapper */}
                <div className="pt-[6px] px-[6px]">
                  <div className="relative h-[250px] rounded-t-md overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                      priority
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="px-4 pt-4">
                  <h3 className="text-lg font-semibold text-gray-800 leading-tight flex-grow">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{post.category}</p>
                </div>
              </div>
              {/* Button in the cut area */}
              <div className="absolute left-3 bottom-2 z-10">
                <ArrowRightCircleIcon
                  width={45}
                  height={45}
                  className="transform -rotate-45 group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  strokeWidth={1}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
