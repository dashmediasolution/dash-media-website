import { PrismaClient } from '@prisma/client';
import { BlogCard } from '@/components/blog/BlogCard';
import { PaginationControls } from '@/components/ui/PaginationControls';
import { BlogCategoryFilter } from '@/components/blog/BlogCategoryFilter'; // ✅ Import Filter Component

const prisma = new PrismaClient();
const BLOGS_PER_PAGE = 6;

// ✅ 1. Updated data fetching to handle BOTH pagination AND category filtering
async function getPaginatedBlogs({ page, category }: { page: number; category?: string }) {
  const skip = (page - 1) * BLOGS_PER_PAGE;
  
  // Create filter object if category is present
  const where = category ? { category } : {};

  const blogs = await prisma.blog.findMany({
    where, // Apply filter
    skip: skip,
    take: BLOGS_PER_PAGE,
    orderBy: {
      createdAt: 'desc',
    },
  });
  return blogs;
}

// ✅ 2. Updated count to respect the category filter
async function getTotalBlogCount(category?: string) {
    const where = category ? { category } : {};
    const count = await prisma.blog.count({ where });
    return count;
}

// ✅ 3. New helper to fetch unique categories for the buttons
async function getCategories() {
  const categories = await prisma.blog.findMany({
    select: { category: true },
    distinct: ['category'],
  });
  return categories.map(c => c.category);
}

// ✅ 4. Main Page Component
export default async function BlogPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  
  const page = Number(resolvedParams?.page ?? '1');
  // Get category from URL (if it exists)
  const category = typeof resolvedParams?.category === 'string' ? resolvedParams.category : undefined;

  // Fetch data with the category filter applied
  const blogs = await getPaginatedBlogs({ page, category });
  const totalBlogs = await getTotalBlogCount(category);
  const categories = await getCategories(); // Get list for the buttons
  
  const totalPages = Math.ceil(totalBlogs / BLOGS_PER_PAGE);

  return (
    <>
      <section className="py-30 md:py-35 bg-gradient-to-b from-blue-50 to-gray-50">
        <div className="container mx-auto">
            <div className="text-center mb-6 md:mb-10">
              <h2 className="text-4xl md:text-7xl font-regular tracking-tight font-heading text-primary">
                Our  
                {" "}
                <span
                  className="bg-gradient-to-r from-[#FF0080] via-accent to-[#FF0080] bg-clip-text text-transparent animate-gradient font-semibold"
                  style={{ backgroundSize: "300% 100%" }}
                >
                  Latest Blogs
                </span>
              </h2>
              <p className="text-md md:text-xl text-muted-foreground leading-relaxed mx-auto md:mt-6 p-5 md:p-0">
                Stay updated with the latest trends and insights in digital marketing.
              </p>
            </div>

            {/* ✅ Insert Filter Component Here */}
            <BlogCategoryFilter categories={categories} />

            {blogs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-13 sm:px-5 lg:p-0">
                  {blogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))}
                </div>

                {/* Pagination Controls */}
                <PaginationControls totalPages={totalPages} currentPage={page} />
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                   {category 
                     ? `No articles found for "${category}".` 
                     : "No blog posts have been published yet. Check back soon!"}
                </p>
              </div>
            )}
        </div>
      </section>
    </>
  );
}