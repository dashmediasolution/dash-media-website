import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface BlogProps {
  id: string;
  headline: string;
  blogUrl: string;
  imageUrl: string | null;
  category: string;
  metaDescription: string;
  createdAt: Date;
}

// ✅ Added hideDescription prop
export function BlogCard({ blog, hideDescription = false }: { blog: BlogProps, hideDescription?: boolean }) {
  return (
    <Link
      href={`/blog/${blog.blogUrl}`}
      className="
        group relative flex flex-col h-full
        bg-primary
        overflow-hidden rounded-2xl
        border border-white/10
        shadow-lg hover:shadow-2xl
        transition-all duration-500
        hover:-translate-y-2
        focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
      "
    >
      {/* --- Improved Image Section --- */}
      <div className="relative w-full md:aspect-[5/3] sm:aspect-[3/2] overflow-hidden bg-primary/50">
        {blog.imageUrl ? (
          <Image
            src={blog.imageUrl}
            alt={blog.headline}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/50 text-xs">
            No Image
          </div>
        )}
        
        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white uppercase tracking-widest">
            {blog.category}
          </span>
        </div>
      </div>

      {/* --- Content Section --- */}
      <div className="flex flex-col flex-grow p-6 sm:p-8">

        {/* Date */}
        <time className="text-[11px] text-white/60 font-semibold uppercase tracking-widest mb-3 block">
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </time>

        {/* Headline */}
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 line-clamp-2 leading-[1.3] group-hover:text-accent transition-colors duration-300">
          {blog.headline}
        </h3>

        {/* Description (Conditionally Rendered) */}
        {!hideDescription && (
          <p className="text-white/70 text-sm leading-relaxed mb-8 line-clamp-3">
            {blog.metaDescription}
          </p>
        )}

        {/* --- Footer --- */}
        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-5">
          <span className="text-xs font-bold text-white uppercase tracking-widest group-hover:text-accent transition-colors duration-300">
            Read Article
          </span>

          <div className="
              w-10 h-10 rounded-full 
              flex items-center justify-center 
              bg-white/10 text-white
              group-hover:bg-accent group-hover:text-primary
              transition-all duration-500
          ">
            <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:-rotate-45" />
          </div>
        </div>
      </div>
    </Link>
  );
}