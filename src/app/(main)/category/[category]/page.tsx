import { prisma } from '@/lib/prisma';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogSidebar } from '@/components/blog/BlogSidebar';
import { PaginationControls } from '@/components/ui/PaginationControls';
import { Search, ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import { MarqueeSeparator } from '@/components/ui/marquee-separator';
import Link from 'next/link';
import type { Blog } from '@prisma/client';
import { slugify } from '@/lib/utils';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://dashmediasolutions.com';

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function getCategories() {
  const categories = await prisma.blog.findMany({
    select: { category: true },
    distinct: ['category'],
  });
  return categories.map(c => c.category);
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const categorySlug = params.category;
  
  const categories = await getCategories();
  const category = categories.find(c => slugify(c) === categorySlug) || categorySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return {
    title: `${category} Articles & Insights | Dash Media Solutions`,
    description: `Read the latest ${category} news, tips, and strategies from Dash Media Solutions.`,
    alternates: {
      canonical: `${SITE_URL}/blog/${categorySlug}`,
    },
    openGraph: {
      title: `${category} Articles & Insights | Dash Media Solutions`,
      description: `Read the latest ${category} news, tips, and strategies from Dash Media Solutions.`,
      url: `${SITE_URL}/blog/${categorySlug}`,
      siteName: "Dash Media Solutions",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category} Articles & Insights | Dash Media Solutions`,
      description: `Read the latest ${category} news, tips, and strategies from Dash Media Solutions.`,
    },
  };
}

const BLOGS_PER_PAGE = 6;

async function getPaginatedBlogs({ page, category, query }: { page: number; category: string; query?: string }) {
  const skip = (page - 1) * BLOGS_PER_PAGE;
  
  const where = {
    AND: [
      { category: { equals: category, mode: 'insensitive' as const } },
      query ? {
        OR: [
          { headline: { contains: query, mode: 'insensitive' as const } },
          { metaDescription: { contains: query, mode: 'insensitive' as const } }
        ]
      } : {}
    ]
  };

  return await prisma.blog.findMany({
    where,
    skip: skip,
    take: BLOGS_PER_PAGE,
    orderBy: { createdAt: 'desc' },
  });
}

async function getTotalBlogCount(category: string, query?: string) {
  const where = {
    AND: [
      { category: { equals: category, mode: 'insensitive' as const } },
      query ? { headline: { contains: query, mode: 'insensitive' as const } } : {}
    ]
  };
  return await prisma.blog.count({ where });
}

export default async function CategoryBlogPage(props: Props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const categorySlug = params.category;
  
  const page = Number(searchParams?.page ?? '1');
  const query = typeof searchParams?.q === 'string' ? searchParams.q : undefined;

  // Fetch data
  const categories = await getCategories();
  const category = categories.find(c => slugify(c) === categorySlug) || categorySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const blogs = await getPaginatedBlogs({ page, category, query });
  const totalBlogs = await getTotalBlogCount(category, query);
  const latestPosts = await prisma.blog.findMany({ take: 3, orderBy: { createdAt: 'desc' } });
  const totalPages = Math.ceil(totalBlogs / BLOGS_PER_PAGE);

  function getBlogCollectionJsonLd(blogs: Blog[]) {
    return {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": `${category} Articles - Dash Media Solutions`,
      "description": `Digital marketing news and branding insights for ${category}.`,
      "url": `${SITE_URL}/blog/${categorySlug}`,
      "blogPost": blogs.map((blog) => ({
        "@type": "BlogPosting",
        "headline": blog.headline,
        "url": `${SITE_URL}/blog/${blog.blogUrl}`,
        "datePublished": blog.createdAt.toISOString(),
        "author": { "@type": "Person", "name": blog.authorName }
      }))
    };
  }

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBlogCollectionJsonLd(blogs)).replace(/</g, '\\x3c') }} />

      {/* Header Area */}
      <section className="bg-blue-50 pt-34 pb-20 border-b border-black/5">
        <div className="container mx-auto px-5 sm:px-20 text-center relative">
          <Link href="/blog" className="absolute left-5 sm:left-20 top-0 hidden md:flex items-center text-xs font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors">
            <ChevronLeft className="w-4 h-4 mr-2"/> All Categories
          </Link>
          
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-accent mb-4 block">
            Category
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-[70px] font-bold tracking-tighter text-primary uppercase leading-none">
            {category}
          </h1>
          <p className="mt-5 text-muted-foreground font-medium uppercase tracking-widest text-lg">
            Explore our latest insights and strategies
          </p>
        </div>
      </section>

      <MarqueeSeparator />

      <section className="bg-white pt-10 pb-20">
        <div className="container mx-auto px-5 sm:px-10 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              {/* Search Bar */}
              <div className="mb-16">
                <form action={`/blog/${categorySlug}`} method="GET" className="relative max-w-2xl group">
                  <div className="relative flex items-center">
                    <Search className="absolute left-6 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input type="text" name="q" placeholder={`Search in ${category}...`} defaultValue={query} className="w-full bg-white border border-gray-200 rounded-full py-4 pl-14 pr-32 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                    <button type="submit" className="absolute right-2 bg-primary text-white text-[12px] font-bold uppercase tracking-widest px-6 py-2.5 rounded-full hover:bg-primary/80 transition-colors">Search</button>
                  </div>
                  {query && (
                    <div className="mt-4 flex items-center gap-2">
                      <p className="text-md text-muted-foreground">Showing results for <span className="text-primary font-bold">&quot;{query}&quot;</span></p>
                      <Link href={`/blog/${categorySlug}`} className="text-sm font-bold uppercase tracking-tighter text-accent hover:text-primary transition-all">Clear Results</Link>
                    </div>
                  )}
                </form>
              </div>

              {blogs.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                    {blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
                  </div>
                  <div className="pt-10">
                    <PaginationControls totalPages={totalPages} currentPage={page} />
                  </div>
                </>
              ) : (
                <div className="text-center py-32 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                  <p className="text-muted-foreground text-lg font-medium">{query ? `No results for "${query}" in ${category}.` : `No posts found in ${category}.`}</p>
                </div>
              )}
            </div>
            <aside className="lg:col-span-4"><div className="sticky top-10"><BlogSidebar categories={categories} latestPosts={latestPosts} currentCategory={category} /></div></aside>
          </div>
        </div>
      </section>
    </main>
  );
}
