"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BlogPost = () => {
  const router = useRouter();

  const otherBlogs = [
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

  const post = {
    title: "Understanding Common Eye Conditions",
    category: "Eye Care",
    createdAt: "August 12, 2025",
    readingTime: 7,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    content: `
      Eye health is an important aspect of overall well-being. Understanding common eye conditions can help you protect your vision and seek appropriate treatment when needed.

      Common eye conditions include cataracts, glaucoma, macular degeneration, and dry eye syndrome. Cataracts cause clouding of the lens, leading to blurred vision. Glaucoma damages the optic nerve and can lead to vision loss if untreated.

      Regular eye exams, a healthy diet rich in antioxidants, wearing protective eyewear, and managing screen time are essential steps to maintain eye health.

      If you experience symptoms such as vision changes, eye pain, or persistent dryness, consult an eye care professional promptly.
    `,
  };

  return (
    <>
      {/* Blog Content */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li>
              <Link href="/blogs" className="hover:underline">
                Blogs
              </Link>
              <span className="mx-1">/</span>
            </li>
            <li className="text-primary font-medium">
              {post.title}
            </li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <span className="font-medium">{post.category}</span>
          <span>•</span>
          <span>{post.createdAt}</span>
          <span>•</span>
          <span>{post.readingTime} min read</span>
        </div>

        <div className="rounded-xl overflow-hidden shadow-md mb-10">
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={675}
            className="object-cover w-full h-auto"
            priority
          />
        </div>

        <article className="prose prose-lg prose-indigo max-w-none text-gray-700">
          {post.content}
        </article>
      </section>

      {/* Related Blogs */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        <h2 className="text-2xl font-bold mb-8">Other Related Blogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherBlogs.map((post) => (
            <div
              key={post.id}
              onClick={() => router.push(`/blogs/${post.id}`)}
              className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-[#056560] line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{post.category}</p>
                <p className="text-gray-400 text-xs mt-1">
                  {post.createdAt} • {post.readingTime} min read
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default BlogPost;
