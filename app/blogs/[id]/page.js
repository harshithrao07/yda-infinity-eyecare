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
      <section className="max-w-4xl mx-auto pt-16 px-6 pb-24">
        <Link
          href="/blogs"
          className="text-blue-600 hover:underline mb-6 inline-block"
        >
          &larr; Back to Blog
        </Link>
        <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
        <p className="text-gray-500 text-sm">{post.category}</p>
        <p className="text-gray-400 text-xs mt-1">
          {post.createdAt} &bull; {post.readingTime} min read
        </p>

        <div className="rounded-md overflow-hidden mb-10">
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={675}
            className="object-cover rounded-md"
            priority
          />
        </div>

        <article className="prose prose-lg text-gray-700 whitespace-pre-line">
          {post.content}
        </article>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-24">
        <h2 className="text-2xl font-bold mb-6 border-b border-gray-300 pb-2">
          Other Related Blogs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherBlogs.map((post) => (
            <div
              key={post.id}
              onClick={() => router.push(`/blogs/${post.id}`)}
              className="cursor-pointer rounded-md bg-white p-4 shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
              <p className="text-gray-500 text-sm">{post.category}</p>
              <p className="text-gray-400 text-xs mt-1">
                {post.createdAt} &bull; {post.readingTime} min read
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default BlogPost;
