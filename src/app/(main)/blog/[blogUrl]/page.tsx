import {prisma} from '@/lib/prisma';
import Image from 'next/image';
import { type Metadata } from 'next';
import { Badge } from "@/components/ui/badge";
import { CalendarDays, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

// ✅ Import the new Sidebar Component
import { BlogSidebar } from '@/components/blog/BlogSidebar';


type Props = {
  params: Promise<{ blogUrl: string }>
}

function getJsonLd(blog: any) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.headline,
    "image": blog.imageUrl,
    "datePublished": blog.createdAt.toISOString(),
    "author": [{
        "@type": "Person",
        "name": blog.authorName,
      }],
    "description": blog.metaDescription,
  };
}

async function getBlogByUrl(blogUrl: string) {
  const blog = await prisma.blog.findUnique({
    where: { blogUrl: blogUrl },
  });
  return blog;
}

// ✅ New helper for Sidebar Data (Categories)
async function getCategories() {
  const categories = await prisma.blog.findMany({
    select: { category: true },
    distinct: ['category'],
  });
  return categories.map(c => c.category);
}

// ✅ New helper for Sidebar Data (Latest Posts)
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

  const siteUrl = "https://dashmediasolutions.com";
  const ogImage = blog.imageUrl || `${siteUrl}/default-og-image.jpg`;
  
 return {
    title: blog.metaTitle,
    description: blog.metaDescription,
    keywords: blog.metaKeywords.split(','),

    // ✅ Open Graph (Covers Facebook, Instagram, and WhatsApp)
    openGraph: {
      title: blog.metaTitle,
      description: blog.metaDescription,
      url: `${siteUrl}/blog/${blog.blogUrl}`,
      siteName: "Dash Media Solutions",
      type: "article",
      publishedTime: blog.createdAt.toISOString(),
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

    // ✅ Twitter/X
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
  
  // ✅ Fetch all required data in parallel
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

  // ✅ Fetch sidebar data after confirming blog exists
  const categories = await getCategories();
  const latestPosts = await getLatestPosts(blog.id);

  return (
    <article className="min-h-screen bg-white pb-20">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd(blog)) }}
      />
      
      {/* --- Header Section (Magazine Style) --- */}
      <div className="border-b border-black/5 bg-blue-50">
        <div className="container mx-auto px-5 sm:px-20 pt-32 pb-16 max-w-7xl text-center">
          
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-accent">
                {blog.category}
            </span>
          </div> 

          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-primary leading-[1] mb-10 max-w-5xl mx-auto uppercase">
            {blog.headline}
          </h1>

          < div className="flex flex-wrap items-center justify-center gap-2 text-muted-foreground text-sm font-bold uppercase tracking-widest">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                    {blog.authorName.charAt(0)}
                </div>
                <span className="text-primary">{blog.authorName}</span>
            </div>
            <span>|</span>
            <div className="flex items-center gap-2">
                <time dateTime={blog.createdAt.toISOString()}>
                    {formatDate(blog.createdAt)}
                </time>
            </div>
          </div>

        </div>
      </div>

      {/* --- Two Column Layout --- */}
      <div className="container mx-auto px-5 sm:px-10 max-w-7xl mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Column (Content) */}
            <div className="lg:col-span-8">
                
                {blog.imageUrl && (
                <div className="relative w-full h-170 rounded-xl overflow-hidden mb-12 ">
                    <Image 
                        src={blog.imageUrl} 
                        alt={blog.headline} 
                        fill
                        sizes="(max-width: 768px) 100vw, 80vw"
                        className="object-cover" 
                        priority
                    />
                </div>
                )}

                {/* Editorial Typography for Content */}
                <div 
                    className="prose prose-lg max-w-none 
                                prose-headings:text-primary prose-headings:tracking-tighter prose-headings:font-bold
                                prose-p:text-primary/80 prose-p:leading-relaxed
                                prose-strong:text-primary
                                prose-img:rounded-xl" 
                    dangerouslySetInnerHTML={{ __html: blog.content }} 
                />

                <div className="mt-24 pt-8 border-t border-black/5">
                    <Link href="/blog" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors">
                        <ChevronLeft className="w-4 h-4 mr-2"/> Back to Journal
                    </Link>
                </div>
            </div>

            {/* Right Column (Sidebar) */}
            <aside className="lg:col-span-4">
                {/* ✅ Passing the fetched data to prevent the .map() undefined error */}
                <BlogSidebar categories={categories} latestPosts={latestPosts} />
            </aside>

        </div>
      </div>
    </article>
  );
}