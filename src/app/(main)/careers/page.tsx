import {prisma }from '@/lib/prisma';
import { JobApplyButton } from "@/components/careers/JobApplyButton";
import { JobDetailsModal } from "@/components/careers/JobDetailsModal";
import { MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const dynamic = 'force-dynamic';

export default async function CareersPage() {
  const jobs = await prisma.jobPosting.findMany({ 
      where: { isActive: true }, 
      orderBy: { createdAt: 'desc' } 
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 pb-20">
      
      {/* Header */}
      <div className="pt-30 lg:pt-35 pb-16 text-center px-5 md:px-0">
        <h1 className="text-3xl lg:text-5xl text-primary font-bold mb-6">Join Our Team</h1>
        <p className="text-md lg:text-lg text-muted-foreground">We&apos;re looking for passionate people to help us build the future.</p>
      </div>

      {/* Grid Container */}
      <div className="container mx-auto px-10 sm:px-5 mt-5 sm:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job) => (
          <Card 
            key={job.id} 
            variant="neubrutalism" 
            // ✅ Removed 'max-w-lg mx-auto'. The grid controls the width now.
            className="flex flex-col bg-white "
          >
            <div className="mb-4">
                <Badge variant="secondary" className="mb-4 bg-primary text-xs sm:text-md rounded-full text-white">{job.department}</Badge>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900 dark:text-white">{job.title}</h3>
            </div>
            
            <div className="flex gap-4  text-xs sm:text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {job.location}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4"/> {job.type}</span>
            </div>
            
           {/* Actions Area */}
            <div className="mt-auto">
                {/* 1. View Details Ghost Button */}
                <JobDetailsModal job={job} />
                
                {/* 2. Direct Apply Button */}
                <JobApplyButton job={job} />
            </div>

          </Card>
        ))}
      </div>
      
      {/* "No Openings" - Normal Container (No Card) */}
      {jobs.length === 0 && (
         <div className="container mx-auto px-4 -mt-16 relative z-10">
            {/* ✅ Replaced Card with a standard Div container */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-10 max-w-2xl mx-auto text-center ">
                <h2 className="text-2xl font-bold text-primary mb-2">No Openings</h2>
                <p className="text-muted-foreground text-lg">
                    No open positions at the moment. Please check back later!
                </p>
            </div>
         </div>
      )}
    </div>
  );
}