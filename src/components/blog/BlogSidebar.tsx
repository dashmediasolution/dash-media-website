import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function BlogSidebar({ categories, latestPosts,currentCategory }: { categories: string[], latestPosts: any[], currentCategory?: string }) {
  return (
    <div className="space-y-16 sticky top-5">
      {/* Categories Section */}
     <div>
    <div className="flex items-center justify-between mb-8 border-b border-black/5 pb-3">
      <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
        All Categories
      </h4>
      
      {/* ✅ Clear Filter Button (Visible only when a category is active) */}
      {currentCategory && (
        <Link 
          href="/blog" 
          className="text-xs font-bold uppercase tracking-tighter text-accent hover:text-primary transition-colors"
        >
          Clear Filter
        </Link>
      )}
    </div>

    <ul className="space-y-4">
      {categories.map((cat) => (
        <li key={cat} className="group">
          <Link 
            href={`/blog?category=${cat}`} 
            className={`text-sm font-medium transition-colors flex items-center justify-between ${
              currentCategory === cat ? 'text-accent' : 'text-muted-foreground hover:text-primary'
            }`}
          >
            <div className="flex items-center gap-2">
              {/* Optional: Small dot for the active category */}
              {cat}
            </div>
            <ArrowRight className={`w-4 h-4 transition-all ${
              currentCategory === cat ? 'opacity-100' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
            }`} />
          </Link>
        </li>
      ))}
    </ul>
  </div>

      {/* Latest Posts Thumbnails */}
      <div>
        <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-6 border-b border-black/10 pb-2">
          Latest Posts
        </h4>
        <div className="space-y-6">
          {latestPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.blogUrl}`} className="flex gap-4 group">
              <div className="relative w-15 h-15 shrink-0 rounded-lg overflow-hidden">
                <Image src={post.imageUrl || "/placeholder.jpg"} alt={post.headline} fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-tighter">
                   {new Date(post.createdAt).toLocaleDateString("en-US", { month: 'long', day: 'numeric' })}
                </span>
                <h5 className="text-sm font-bold text-primary group-hover:text-accent transition-colors leading-tight line-clamp-2">
                  {post.headline}
                </h5>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}