import {prisma} from '@/lib/prisma';
import { BlogCard } from '@/components/blog/BlogCard'; // Reverted to BlogCard
import { BlogSidebar } from '@/components/blog/BlogSidebar';
import { PaginationControls } from '@/components/ui/PaginationControls';
import { Search } from "lucide-react"; // Import for the search bar
import type { Metadata } from "next";
import { MarqueeSeparator } from '@/components/ui/marquee-separator';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Dash Media Solutions Insights—News, Updates & Tips",
  description: "The Dash Media blog provides in-depth insights and industry updates on digital marketing trends, news, tips, and tricks for enhancing branding strategies.",
  keywords: ["Dash Media Solutions Insights", "Digital Marketing News and Updates", "Marketing Tips to Increase Visibility"],

  // ✅ Open Graph (For Social Sharing)
  openGraph: {
    title: "Dash Media Solutions Insights",
    description: "The DMS Digital Journal & Insight Lab - News, Updates & Tips",
    url: "https://dashmedia.solutions/blog",
    siteName: "Dash Media Solutions",
    type: "website",
    images: [
      {
        url: "https://dashmedia.solutions/og-blog-main.jpg", // Replace with your actual image path
        width: 1200,
        height: 630,
        alt: "Dash Media Solutions Blog",
      },
    ],
  },

  // ✅ Twitter
  twitter: {
    card: "summary_large_image",
    title: "Dash Media Solutions Insights",
    description: "Digital marketing news, tips, and industry updates.",
    images: ["https://dashmedia.solutions/og-blog-main.jpg"],
  },

  // ✅ PRESERVED: Your No-Index Tags
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const BLOGS_PER_PAGE = 6;

// ✅ Functions (Unchanged logic, added optional search query)
async function getPaginatedBlogs({ page, category, query }: { page: number; category?: string; query?: string }) {
  const skip = (page - 1) * BLOGS_PER_PAGE;

  // Create a combined filter for category AND search keyword
  const where = {
    AND: [
      category ? { category } : {},
      query ? {
        OR: [
          { headline: { contains: query, mode: 'insensitive' as const } },
          { metaDescription: { contains: query, mode: 'insensitive' as const } }
        ]
      } : {}
    ]
  };

  const blogs = await prisma.blog.findMany({
    where,
    skip: skip,
    take: BLOGS_PER_PAGE,
    orderBy: { createdAt: 'desc' },
  });
  return blogs;
}

async function getTotalBlogCount(category?: string, query?: string) {
  const where = {
    AND: [
      category ? { category } : {},
      query ? { headline: { contains: query, mode: 'insensitive' as const } } : {}
    ]
  };
  return await prisma.blog.count({ where });
}

async function getCategories() {
  const categories = await prisma.blog.findMany({
    select: { category: true },
    distinct: ['category'],
  });
  return categories.map(c => c.category);
}

// ✅ Main Page Component
export default async function BlogPage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams?.page ?? '1');
  const category = typeof resolvedParams?.category === 'string' ? resolvedParams.category : undefined;
  const query = typeof resolvedParams?.q === 'string' ? resolvedParams.q : undefined;

  const blogs = await getPaginatedBlogs({ page, category, query });
  const totalBlogs = await getTotalBlogCount(category, query);
  const categories = await getCategories();

  const latestPosts = await prisma.blog.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' },
  });

  const totalPages = Math.ceil(totalBlogs / BLOGS_PER_PAGE);

  // Helper to generate Blog Collection Schema
  function getBlogCollectionJsonLd(blogs: any[]) {
    return {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Dash Media Solutions Insights",
      "description": "Digital marketing news and branding insights.",
      "url": "https://dashmediasolutions/blog",
      "blogPost": blogs.map((blog) => ({
        "@type": "BlogPosting",
        "headline": blog.headline,
        "url": `https://dashmediasolutions/blog/${blog.blogUrl}`,
        "datePublished": blog.createdAt.toISOString(),
        "author": {
          "@type": "Person",
          "name": blog.authorName
        }
      }))
    };
  }

  return (
    <main className="min-h-screen">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBlogCollectionJsonLd(blogs)) }}
      />

      {/* ✅ SECTION 1: Blue Header Hero */}
      <section className="bg-blue-50 pt-34 pb-20  border-b border-black/5">
        <div className="container mx-auto px-5 sm:px-20">
          <header className="text-center relative">
            <h1 className="text-5xl md:text-6xl lg:text-[90px] font-bold tracking-tighter text-primary uppercase leading-none">
              Ideas that {" "}
              <span
                className="bg-gradient-to-r from-[#FF0080] via-accent to-[#FF0080] bg-clip-text text-transparent animate-gradient font-semibold"
                style={{ backgroundSize: "300% 100%" }}
              >
                inspire
              </span>
            </h1>
            {/* Optional subtitle to add editorial weight */}
            <p className="mt-5 text-muted-foreground font-medium uppercase tracking-widest text-lg">
              The DMS Digital Journal & Insight Lab
            </p>
          </header>
        </div>
      </section>

      <MarqueeSeparator />

      {/* ✅ SECTION 2: White Content Area */}
      <section className="bg-white  pt-10 pb-20">
        <div className="container mx-auto px-5 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Main Feed (Left Column) */}
            <div className="lg:col-span-8">

              {/* SEARCH BAR */}

              <div className="mb-16">
                <form action="/blog" method="GET" className="relative max-w-2xl group">
                  <div className="relative flex items-center">
                    {/* Search Icon */}
                    <Search className="absolute left-6 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />

                    {/* Input Field */}
                    <input
                      type="text"
                      name="q"
                      placeholder="Search for insights..."
                      defaultValue={query}
                      className="w-full bg-white border border-gray-200 rounded-full py-4 pl-14 pr-32 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />

                    {/* 1. Dedicated Search Button */}
                    <button
                      type="submit"
                      className="absolute right-2 bg-primary text-white text-[12px] font-bold uppercase tracking-widest px-6 py-2.5 rounded-full hover:bg-primary/80 transition-colors"
                    >
                      Search
                    </button>
                  </div>

                  {/* 2. Clear Search Results Button (Shows only if a query exists) */}
                  {query && (
                    <div className="mt-4 flex items-center gap-2">
                      <p className="text-md text-muted-foreground">
                        Showing results for <span className="text-primary font-bold">"{query}"</span>
                      </p>
                      <Link
                        href="/blog"
                        className="text-sm font-bold uppercase tracking-tighter text-accent hover:text-primary transition-all"
                      >
                        Clear Results
                      </Link>
                    </div>
                  )}

                  {/* Preserve category context if searching within a category */}
                  {category && <input type="hidden" name="category" value={category} />}
                </form>
              </div>

              {blogs.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                    {blogs.map((blog) => (
                      <BlogCard key={blog.id} blog={blog} />
                    ))}
                  </div>

                  {/* Pagination Section */}
                  <div className="pt-10">
                    <PaginationControls totalPages={totalPages} currentPage={page} />
                  </div>
                </>
              ) : (
                <div className="text-center py-32 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                  <p className="text-muted-foreground text-lg font-medium">
                    {query
                      ? `No results for "${query}". Try different keywords.`
                      : "Our journal is currently empty. Check back soon!"}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar (Right Column) */}
            <aside className="lg:col-span-4">
              <div className="sticky top-10">
                <BlogSidebar
                  categories={categories}
                  latestPosts={latestPosts}
                  currentCategory={category}
                />
              </div>
            </aside>

          </div>
        </div>
      </section>
    </main>
  );
}