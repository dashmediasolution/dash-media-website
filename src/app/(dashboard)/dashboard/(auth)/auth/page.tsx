'use client';

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
import { useForm, SubmitHandler } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";

type FormData = {
    email: string;
    password: string;
};

export default function AuthPage() {
    const router = useRouter();
    const [isLoginLoading, setIsLoginLoading] = useState(false);

    const { register, handleSubmit } = useForm<FormData>();

    const onLoginSubmit: SubmitHandler<FormData> = async (data) => {
        setIsLoginLoading(true);
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: data.email,
                password: data.password,
            });

            if (result?.ok) {
                toast.success("Login successful!");
                router.push('/dashboard');
            } else {
                toast.error("Login Failed", { description: "Invalid email or password." });
                setIsLoginLoading(false);
            }
        } catch (error) {
            toast.error("An error occurred");
            setIsLoginLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50/50 dark:bg-zinc-950 p-4">
            
            {/* ✅ LOGO SECTION */}
            <div className="mb-8">
                <Image 
                    src="/DashMediaLogo.png" 
                    alt="Dash Media Solutions" 
                    width={200} 
                    height={60} 
                    className="h-auto w-auto"
                    priority
                />
            </div>

            {/* ✅ UPDATED SHADCN CARD SECTION */}
            <div className="w-full max-w-[400px]">
                <Card className="bg-white dark:bg-zinc-900 shadow-xl border-zinc-200 dark:border-zinc-800">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
                        <CardDescription>
                            Enter your credentials to manage the platform.
                        </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                        <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@dashmedia.com"
                                    disabled={isLoginLoading}
                                    {...register('email', { required: true })}
                                    className="focus-visible:ring-accent"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    disabled={isLoginLoading}
                                    {...register('password', { required: true })}
                                    className="focus-visible:ring-accent"
                                />
                            </div>
                            <Button 
                                type="submit" 
                                className="w-full font-bold h-11 mt-2" 
                                disabled={isLoginLoading}
                            >
                                {isLoginLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                                        Authenticating...
                                    </>
                                ) : (
                                    "Sign In"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* Footer Text */}
            <p className="mt-8 text-[11px] font-medium text-muted-foreground uppercase tracking-widest opacity-60">
                &copy; {new Date().getFullYear()} Dash Media Solutions. Engineered for Excellence.
            </p>
        </div>
    );
}