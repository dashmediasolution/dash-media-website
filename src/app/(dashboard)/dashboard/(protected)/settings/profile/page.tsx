"use client";

import { Button } from "@/components/ui/button";
// ✅ Import standard Shadcn sub-components
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"; 
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type ProfileFormData = {
  name: string;
  email: string;
};

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    handleSubmit, 
    setValue, 
    formState: { errors } 
  } = useForm<ProfileFormData>();

  useEffect(() => {
    if (session?.user) {
      setValue("name", session.user.name || "");
      setValue("email", session.user.email || "");
    }
  }, [session, setValue]);

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name }),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      await update({ name: data.name });
      toast.success("Profile updated successfully!");
      router.refresh(); 
      
    } catch (error) {
      toast.error("Update Failed", {
        description: "Could not update your profile. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-primary">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* ✅ Standard Shadcn Card Implementation */}
      <Card className="bg-white dark:bg-zinc-950 border-gray-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Profile Information</CardTitle>
          <CardDescription>
            Update your public profile display name.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Email Field (Read Only) */}
            <div className="space-y-2">
              <Label htmlFor="email" className="font-semibold text-primary">Email Address</Label>
              <Input 
                id="email" 
                {...register("email")} 
                disabled 
                className="bg-gray-50 text-muted-foreground cursor-not-allowed border-gray-200"
              />
              <p className="text-[0.75rem] text-muted-foreground italic">
                Your email address is managed by your administrator and cannot be changed here.
              </p>
            </div>

            {/* Name Field (Editable) */}
            <div className="space-y-2">
              <Label htmlFor="name" className="font-semibold text-primary">Full Name</Label>
              <Input 
                id="name" 
                placeholder="Enter your name" 
                {...register("name", { required: "Name is required" })} 
                className="focus-visible:ring-accent"
              />
              {errors.name && (
                <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isLoading} className="px-8 font-bold">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}