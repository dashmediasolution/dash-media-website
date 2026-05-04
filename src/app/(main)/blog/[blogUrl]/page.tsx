import { prisma } from '@/lib/prisma';
import type { Blog } from '@prisma/client';
import Image from 'next/image';
import { type Metadata } from 'next';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { slugify } from '@/lib/utils';

//  Import the new Sidebar Component
import { BlogSidebar } from '@/components/blog/BlogSidebar';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://dashmediasolutions.com';

type Props = {
  params: Promise<{ blogUrl: string }>
}

function getJsonLd(blog: Blog) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${blog.blogUrl}`
    },
    "headline": blog.headline,
    "image": blog.imageUrl ? [blog.imageUrl] : [],
    "datePublished": blog.createdAt.toISOString(),
    "dateModified": blog.updatedAt ? blog.updatedAt.toISOString() : blog.createdAt.toISOString(),
    "author": [{
        "@type": "Person",
        "name": blog.authorName,
      }],
    "publisher": {
      "@type": "Organization",
      "name": "Dash Media Solutions",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/images/dms-marketing-agency.webp`
      }
    },
    "description": blog.metaDescription,
  };
}

async function getBlogByUrl(blogUrl: string) {
  const blog = await prisma.blog.findUnique({
    where: { blogUrl: blogUrl },
  });
  return blog;
}

//  New helper for Sidebar Data (Categories)
async function getCategories() {
  const categories = await prisma.blog.findMany({
    select: { category: true },
    distinct: ['category'],
  });
  return categories.map(c => c.category);
}

//  New helper for Sidebar Data (Latest Posts)
async function getLatestPosts(currentId: string) {
  return await prisma.blog.findMany({
    where: { id: { not: currentId } }, // Don't show the post currently being read
    take: 3,
    orderBy: { createdAt: 'desc' },
  });
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = await getBlogByUrl(resolvedParams.blogUrl);

  if (!blog) return { title: "Not Found" };

  const ogImage = blog.imageUrl || `${SITE_URL}/default-og-image.jpg`;
  
 return {
    title: blog.metaTitle,
    description: blog.metaDescription,
    keywords: blog.metaKeywords ? blog.metaKeywords.split(',').map((k: string) => k.trim()) : [],
    authors: [{ name: blog.authorName }],
    creator: "Dash Media Solutions",
    alternates: {
      canonical: `${SITE_URL}/blog/${blog.blogUrl}`,
    },

    //  Open Graph (Covers Facebook, Instagram, and WhatsApp)
    openGraph: {
      title: blog.metaTitle,
      description: blog.metaDescription,
      url: `${SITE_URL}/blog/${blog.blogUrl}`,
      siteName: "Dash Media Solutions",
      type: "article",
      publishedTime: blog.createdAt.toISOString(),
      modifiedTime: blog.updatedAt ? blog.updatedAt.toISOString() : blog.createdAt.toISOString(),
      authors: [blog.authorName],
      section: blog.category,
      
      // WhatsApp and Facebook look best with 1200x630 images
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: blog.headline,
        },
      ],
    },

    //  Twitter/X
    twitter: {
      card: "summary_large_image",
      title: blog.metaTitle,
      description: blog.metaDescription,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { blogUrl } = await params;
  
  //  Fetch all required data in parallel
  const blog = await getBlogByUrl(blogUrl);
  
  if (!blog) {
    return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center bg-[#F9F6F0]">
            <h1 className="text-4xl font-bold text-primary">Post Not Found</h1>
            <Link href="/blog" className="mt-4 text-accent hover:underline flex items-center gap-2">
                <ChevronLeft className="w-4 h-4"/> Return to Blog
            </Link>
        </div>
    );
  }

  //  Fetch sidebar data after confirming blog exists
  const categories = await getCategories();
  const latestPosts = await getLatestPosts(blog.id);

  return (
    <article className="min-h-screen bg-white pb-20">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd(blog)).replace(/</g, '\\x3c') }}
      />
      
      {/* --- Header Section (Magazine Style) --- */}
      <div className="border-b border-gray-100 bg-blue-50">
        <div className="container mx-auto px-5 sm:px-10 lg:px-20 pt-28 md:pt-36 pb-12 md:pb-20 max-w-7xl text-center">
          
          <div className="flex items-center justify-center gap-2 mb-6 md:mb-8">
                <Link href={`/category/${slugify(blog.category)}`} className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-accent hover:text-primary transition-colors">
                    {blog.category}
                </Link>
          </div> 

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-primary leading-tight md:leading-[1.1] mb-8 md:mb-12 max-w-5xl mx-auto uppercase">
            {blog.headline}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-muted-foreground text-xs sm:text-sm font-bold uppercase tracking-widest">
            <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary text-white flex items-center justify-center text-xs sm:text-base">
                    {blog.authorName.charAt(0)}
                </div>
                <span className="text-primary">{blog.authorName}</span>
            </div>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-2">
                <time dateTime={blog.createdAt.toISOString()}>
                    {formatDate(blog.createdAt)}
                </time>
            </div>
          </div>

        </div>
      </div>

      {/* --- Two Column Layout --- */}
      <div className="container mx-auto px-5 sm:px-10 lg:px-20 max-w-7xl mt-12 md:mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column (Content) */}
            <div className="lg:col-span-8">
                
                {blog.imageUrl && (
                <div className="relative w-full aspect-video sm:aspect-[16/9] rounded-2xl overflow-hidden mb-8 md:mb-12 shadow-sm">
                    <Image 
                        src={blog.imageUrl} 
                        alt={blog.headline} 
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                        className="object-fill object-center" 
                        priority
                    />
                </div>
                )}

                {/* Editorial Typography for Content */}
                <div 
                    className="prose prose-base sm:prose-lg lg:prose-xl max-w-none 
                                prose-headings:text-primary prose-headings:tracking-tight prose-headings:font-bold
                                prose-p:text-gray-600 prose-p:leading-relaxed
                                prose-strong:text-primary
                                prose-a:text-accent hover:prose-a:underline
                                prose-img:rounded-2xl prose-img:shadow-md" 
                    dangerouslySetInnerHTML={{ __html: blog.content }} 
                />

                <div className="mt-16 md:mt-24 pt-8 border-t border-gray-100">
                    <Link href="/blog" className="inline-flex items-center text-xs sm:text-sm font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors">
                        <ChevronLeft className="w-4 h-4 mr-2"/> Back to Journal
                    </Link>
                </div>
            </div>

            {/* Right Column (Sidebar) */}
            <aside className="lg:col-span-4">
                {/*  Passing the fetched data to prevent the .map() undefined error */}
                <BlogSidebar categories={categories} latestPosts={latestPosts} />
            </aside>

        </div>
      </div>
    </article>
  );
}