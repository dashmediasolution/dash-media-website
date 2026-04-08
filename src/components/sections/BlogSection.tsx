import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCard } from "@/components/blog/BlogCard";
import { prisma } from "@/lib/prisma";


export async function BlogSection() {
  // ✅ Fetch exactly 3 posts for the grid
  const latestBlogs = await prisma.blog.findMany({
    take: 3,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-5 sm:px-20">
        
        {/* --- Header --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-4xl font-regular font-heading text-primary lg:text-5xl leading-tight">
              Our{" "}
              <span
                className="bg-gradient-to-r from-[#FF0080] via-accent to-[#FF0080] bg-clip-text text-transparent animate-gradient font-semibold"
                style={{ backgroundSize: "300% 100%" }}
              >
                Latest Insights
              </span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Deep dives into the trends shaping the future of digital marketing.
            </p>
          </div>

          <Link href="/blog" className="hidden md:flex items-center font-bold text-xs text-primary hover:opacity-70 transition-opacity uppercase tracking-widest mb-2">
            View all articles <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        {/* --- Simple 3-Card Grid --- */}
        {latestBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestBlogs.map((blog) => (
              <BlogCard 
                  key={blog.id} 
                  blog={blog} 
                  // Removed hideDescription={true} so they look exactly like service cards (with text)
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-3xl">
            <p className="text-muted-foreground">No blog posts found.</p>
          </div>
        )}

      </div>
    </section>
  );
}