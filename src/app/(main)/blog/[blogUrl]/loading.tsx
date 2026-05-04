import { Skeleton } from "@/components/ui/skeleton";

export default function PostLoading() {
  return (
    <article className="min-h-screen bg-white pb-20">
      {/* Magazine Header Skeleton - Gray Theme */}
      <header className="border-b border-gray-100 bg-gray-50">
        <div className="container mx-auto px-5 sm:px-20 pt-32 pb-16 max-w-7xl text-center">
          <Skeleton className="h-4 w-24 mx-auto mb-6 bg-gray-200" />
          <Skeleton className="h-28 w-full max-w-4xl mx-auto mb-10 bg-gray-200" />
          <div className="flex justify-center gap-8">
            <Skeleton className="h-10 w-32 rounded-full bg-gray-200" />
            <Skeleton className="h-10 w-32 rounded-md bg-gray-200" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-5 sm:px-10 max-w-7xl mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            <div className="lg:col-span-8">
              <Skeleton className="aspect-[16/9] w-full rounded-2xl mb-12 bg-gray-100" />
              <div className="space-y-6">
                {[...Array(8)].map((_, i) => (
                  <Skeleton 
                    key={i} 
                    className={`h-5 bg-gray-100 ${i % 3 === 0 ? 'w-full' : i % 3 === 1 ? 'w-5/6' : 'w-4/6'}`} 
                  />
                ))}
              </div>
            </div>

            <aside className="lg:col-span-4">
              <Skeleton className="h-[500px] w-full rounded-3xl bg-gray-50" />
            </aside>
        </div>
      </div>
    </article>
  );
}