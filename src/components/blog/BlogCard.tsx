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
        overflow-hidden rounded-xl
        border-none
        shadow-sm hover:shadow-xl
        transition-all duration-300
        hover:-translate-y-1
      "
    >
      {/* --- Image Section --- */}
      {/* --- Improved Image Section --- */}
      <div className="relative h-[325px] w-full overflow-hidden bg-gray-800">
        {blog.imageUrl ? (
          <Image
            src={blog.imageUrl}
            alt={blog.headline}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/50 text-xs">
            No Image
          </div>
        )}
      </div>

      {/* --- Content Section --- */}
      <div className="flex flex-col flex-grow p-6">

        {/* Top Row: Category & Date */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">
            {blog.category}
          </span>

          <span className="text-[10px] text-white/70 font-medium uppercase tracking-widest">
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>

        {/* Headline */}
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-tight">
          {blog.headline}
        </h3>

        {/* Description (Conditionally Rendered) */}
        {!hideDescription && (
          <p className="text-white/80 text-sm leading-relaxed mb-6 line-clamp-2">
            {blog.metaDescription}
          </p>
        )}

        {/* --- Footer --- */}
        <div className="mt-auto flex items-center justify-between border-t border-white/20 pt-4">
          <span className="text-sm font-bold text-white uppercase tracking-wider">
            Read Article
          </span>

          <div className="
              w-10 h-10 rounded-full 
              flex items-center justify-center 
              bg-white text-primary
              group-hover:scale-110
              transition-all duration-300
          ">
            <ArrowRight className="w-5 h-5 transition-transform group-hover:-rotate-45" />
          </div>
        </div>
      </div>
    </Link>
  );
}