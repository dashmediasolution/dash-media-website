import { prisma } from '@/lib/prisma';
import { JobApplyButton } from "@/components/careers/JobApplyButton";
import { JobDetailsModal } from "@/components/careers/JobDetailsModal";
import { MapPin, ArrowUpRight, Globe2, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MarqueeSeparator } from '@/components/ui/marquee-separator';

export const dynamic = 'force-dynamic';

export default async function CareersPage() {
  const jobs = await prisma.jobPosting.findMany({ 
      where: { isActive: true }, 
      orderBy: { createdAt: 'desc' } 
  });

  return (
    <div className="min-h-screen bg-white pb-32">
      
      {/* --- Page Header: High Impact Editorial Style --- */}
<section className="bg-blue-50 border-b border-gray-100 pt-32 pb-20 md:pt-40 md:pb-24">
    <div className="container mx-auto px-5 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-end gap-10">
            <div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-4 block">
                    We are looking for builders
                </span>
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter text-primary uppercase leading-[0.9]">
                    <span 
                        className="bg-gradient-to-r from-[#FF0080] via-accent to-[#FF0080] bg-clip-text text-transparent animate-gradient font-semibold" 
                        style={{ backgroundSize: "300% 100%" }}
                    >
                        Join the <br /> collective
                    </span>
                </h1>
            </div>
            <div className="lg:pb-2">
                <p className="text-lg lg:text-xl text-muted-foreground max-w-md leading-relaxed">
                    Architecture of growth requires the right builders. Join Dash Media Solutions to build the next generation of digital experiences.
                </p>
            </div>
        </div>
    </div>
</section>
<MarqueeSeparator/>

      {/* --- JOB LIST SECTION --- */}
      <div className="container mx-auto px-6 max-w-6xl mt-12">
        <div className="flex flex-col ">
          
          {/* Header Row (Hidden on Mobile) */}
          <div className="hidden md:grid grid-cols-12 py-6 px-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-b border-gray-100">
            <div className="col-span-4">Position</div>
            <div className="col-span-3">Department</div>
            <div className="col-span-2">Location</div>
            <div className="col-span-3 text-right">Action</div>
          </div>

          {jobs.map((job) => (
            <div 
              key={job.id} 
              className="group grid grid-cols-1 md:grid-cols-12 items-center py-10 px-4 hover:bg-white hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-300 rounded-xl md:rounded-none"
            >
              {/* Position Title: 4 Columns for better fit */}
              <div className="col-span-1 md:col-span-4 mb-4 md:mb-0">
                <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-mono text-accent/60">0{jobs.indexOf(job) + 1}</span>
                    <h3 className="text-xl md:text-2xl font-bold text-primary group-hover:translate-x-1 transition-transform">
                        {job.title}
                    </h3>
                </div>
                <div className="flex items-center gap-2 md:hidden">
                    <Badge variant="outline" className="text-[9px] uppercase tracking-tighter">{job.type}</Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3"/> {job.location}
                    </span>
                </div>
              </div>

              {/* Department: 3 Columns */}
              <div className="hidden md:block col-span-3">
                <span className="text-sm font-medium text-primary/70">{job.department}</span>
              </div>

              {/* Location/Type: 2 Columns with No Wrap */}
              <div className="hidden md:flex col-span-2 flex-col gap-1 px-2">
                <span className="text-sm font-bold flex items-center gap-1.5 text-primary whitespace-nowrap">
                    <Globe2 className="w-3.5 h-3.5 text-accent flex-shrink-0"/> {job.location}
                </span>
                <span className="text-[10px] uppercase text-muted-foreground tracking-widest">{job.type}</span>
              </div>

              {/* CTA Area: 3 Columns for Action Buttons */}
              <div className="col-span-1 md:col-span-3 flex items-center justify-start md:justify-end gap-4 mt-4 md:mt-0">
                <div className="flex-shrink-0">
                  <JobDetailsModal job={job} />
                </div>
                <div className="h-6 w-[1px] bg-gray-200 hidden md:block" />
                <div className="flex-shrink-0">
                  <JobApplyButton job={job} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- EMPTY STATE --- */}
        {jobs.length === 0 && (
          <div className="py-20 text-center border-2 border-dashed border-gray-200 rounded-3xl">
            <Zap className="w-8 h-8 text-accent mx-auto mb-4 opacity-20" />
            <h2 className="text-xl font-bold text-primary italic">No current openings.</h2>
            <p className="text-muted-foreground mt-2">Check back soon or follow our updates.</p>
          </div>
        )}
      </div>
    </div>
  );
}