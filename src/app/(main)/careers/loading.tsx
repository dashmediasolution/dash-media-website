import { Skeleton } from "@/components/ui/skeleton";

export default function CareersLoading() {
  return (
    <div className="min-h-screen bg-white pb-32">
      
      {/* --- Page Header Skeleton (Matches Editorial Style) --- */}
      <section className="bg-blue-50 border-b border-gray-100 pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="container mx-auto px-5 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-end gap-10">
            <div className="space-y-4">
              {/* "We are looking for builders" Tag */}
              <Skeleton className="h-4 w-40 bg-gray-200" />
              {/* "Join the Collective" Massive Title */}
              <div className="space-y-2">
                <Skeleton className="h-12 md:h-16 w-full max-w-md bg-gray-200" />
                <Skeleton className="h-12 md:h-16 w-3/4 max-w-md bg-gray-200" />
              </div>
            </div>
            <div className="lg:pb-2">
              {/* Description Paragraph */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full max-w-md bg-gray-200" />
                <Skeleton className="h-4 w-5/6 max-w-md bg-gray-200" />
                <Skeleton className="h-4 w-2/3 max-w-md bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Marquee Placeholder --- */}
      <div className="h-12 w-full bg-gray-50 border-y border-gray-100 animate-pulse" />

      {/* --- JOB LIST SECTION SKELETON --- */}
      <div className="container mx-auto px-6 max-w-6xl mt-12">
        <div className="flex flex-col">
          
          {/* Header Row Skeleton */}
          <div className="hidden md:grid grid-cols-12 py-6 px-4 border-b border-gray-100">
            <Skeleton className="col-span-4 h-3 w-20 bg-gray-100" />
            <Skeleton className="col-span-3 h-3 w-24 bg-gray-100" />
            <Skeleton className="col-span-2 h-3 w-16 bg-gray-100" />
            <div className="col-span-3 flex justify-end">
              <Skeleton className="h-3 w-12 bg-gray-100" />
            </div>
          </div>

          {/* Job Row Skeletons (Generate 4 placeholders) */}
          {[...Array(4)].map((_, i) => (
            <div 
              key={i} 
              className="grid grid-cols-1 md:grid-cols-12 items-center py-10 px-4 border-b border-gray-50"
            >
              {/* Position Title Column */}
              <div className="col-span-1 md:col-span-4 mb-4 md:mb-0 space-y-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-3 w-6 bg-gray-100" />
                  <Skeleton className="h-8 w-48 bg-gray-100" />
                </div>
                <div className="flex md:hidden gap-2">
                  <Skeleton className="h-5 w-16 rounded-full bg-gray-100" />
                  <Skeleton className="h-5 w-24 rounded-full bg-gray-100" />
                </div>
              </div>

              {/* Department Column */}
              <div className="hidden md:block col-span-3">
                <Skeleton className="h-5 w-32 bg-gray-50" />
              </div>

              {/* Location Column */}
              <div className="hidden md:flex col-span-2 flex-col gap-2 px-2">
                <Skeleton className="h-5 w-24 bg-gray-50" />
                <Skeleton className="h-3 w-16 bg-gray-50" />
              </div>

              {/* CTA Area Column */}
              <div className="col-span-1 md:col-span-3 flex items-center justify-start md:justify-end gap-4 mt-4 md:mt-0">
                <Skeleton className="h-10 w-28 rounded-md bg-gray-100" />
                <div className="h-6 w-[1px] bg-gray-100 hidden md:block" />
                <Skeleton className="h-10 w-28 rounded-md bg-primary/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}