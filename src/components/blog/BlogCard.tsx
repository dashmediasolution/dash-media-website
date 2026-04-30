import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";

interface BlogProps {
  id: string;
  headline: string;
  blogUrl: string;
  imageUrl: string | null;
  category: string;
  metaDescription: string;
  createdAt: Date;
}

//  Added hideDescription prop
export function BlogCard({ blog, hideDescription = false }: { blog: BlogProps, hideDescription?: boolean }) {
  return (
    <Link
      href={`/blog/${blog.blogUrl}`}
      className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      {/* --- Image Section --- */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-50">
        {blog.imageUrl ? (
          <Image
            src={blog.imageUrl}
            alt={blog.headline}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-medium">
            No Image Available
          </div>
        )}
        
        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm text-[11px] font-bold text-primary uppercase tracking-wider">
            {blog.category}
          </span>
        </div>
      </div>

      {/* --- Content Section --- */}
      <div className="flex flex-col flex-grow p-6 sm:p-8">

        {/* Meta Info */}
        <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5" />
          <time dateTime={new Date(blog.createdAt).toISOString()}>
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </time>
        </div>

        {/* Headline */}
        <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3 line-clamp-2 leading-snug group-hover:text-accent transition-colors duration-300">
          {blog.headline}
        </h3>

        {/* Description (Conditionally Rendered) */}
        {!hideDescription && (
          <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
            {blog.metaDescription}
          </p>
        )}

        {/* --- Footer --- */}
        <div className="mt-auto flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wide group-hover:text-accent transition-colors duration-300 pt-4 border-t border-gray-50">
          <span>Read Article</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}