'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";

// --- 1. Define Schema ---
const formSchema = z.object({
  fullName: z.string().min(2, "Name required"),
  email: z.string().email(),
  mobileNumber: z.string().min(10),
  resumeUrl: z.string().min(1, "Resume required"),
  coverLetter: z.string().min(10).or(z.literal("")), // Optional check happens in UI logic or schema refinement if needed
});

// --- 2. The Form Component (Logic Extracted) ---
interface JobApplicationFormProps {
  jobId: string;
  onSuccess: () => void; // Callback to close modal
}

export function JobApplicationForm({ jobId, onSuccess }: JobApplicationFormProps) {
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { fullName: "", email: "", mobileNumber: "", resumeUrl: "", coverLetter: "" }
  });

  // Upload Logic
  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isUploading) return;
    const file = event.target.files?.[0];
    if (!file) return;

    if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        toast.error("Invalid file type. Please upload PDF or Doc.");
        return;
    }

    setIsUploading(true);
    const toastId = toast.loading("Uploading resume...");
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await response.json();
        
        if (data.url || data.secure_url) {
            form.setValue('resumeUrl', data.url || data.secure_url, { shouldValidate: true });
            toast.success("Resume uploaded!", { id: toastId });
        } else {
            throw new Error("Upload failed");
        }
    } catch (error) {
        toast.error("Upload failed.", { id: toastId });
    } finally {
        setIsUploading(false);
    }
  };

  // Submit Logic
  async function onSubmit(values: any) {
    try {
      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, jobId }),
      });

      if (!response.ok) throw new Error("Failed");

      toast.success("Application Submitted!");
      form.reset();
      onSuccess(); // Close the modal
    } catch (e) {
      toast.error("Failed to submit application.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
        <FormField control={form.control} name="fullName" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm lg:text-md">Full Name</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}/>
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm lg:text-md">Email</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}/>
        <FormField control={form.control} name="mobileNumber" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm lg:text-md">Mobile</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}/>
        
        <div className="space-y-2">
            <FormLabel className="text-sm lg:text-md">Resume</FormLabel>
            <div className="flex items-center gap-2">
                <Input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} disabled={isUploading} />
                {isUploading && <Loader2 className="animate-spin h-4 w-4" />}
            </div>
            <input type="hidden" {...form.register("resumeUrl")} />
            {form.formState.errors.resumeUrl && <p className="text-sm text-red-500">{form.formState.errors.resumeUrl.message as string}</p>}
            {form.getValues("resumeUrl") && !isUploading && <p className="text-xs text-green-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Attached</p>}
        </div>

        <FormField control={form.control} name="coverLetter" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm lg:text-md">Cover Letter <span className="text-muted-foreground">(Optional)</span></FormLabel>
            <FormControl><Textarea rows={4} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}/>

        <Button type="submit" className="w-fit rounded-full" disabled={form.formState.isSubmitting || isUploading}>
            {form.formState.isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </Form>
  );
}

// --- 3. The Button Component (Manages Modal) ---
export function JobApplyButton({ job }: { job: any }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit rounded-full ml-8 sm:ml-0">Apply Now</Button>
      </DialogTrigger>
      
      {/* Retaining the padding fix for mobile */}
      <DialogContent className="max-h-[90vh] overflow-y-auto px-5">
        <DialogHeader>
            <DialogTitle className="text-lg lg:text-xl">Apply for {job.title}</DialogTitle>
        </DialogHeader>
        
        {/* Render the extracted form here */}
        <JobApplicationForm 
            jobId={job.id} 
            onSuccess={() => setOpen(false)} 
        />

      </DialogContent>
    </Dialog>
  );
}