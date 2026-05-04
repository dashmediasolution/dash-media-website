'use client';

import { useState } from "react";
import { ContactPageForm } from "@/components/forms/ContactPageForm";
import { CheckCircle2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MarqueeSeparator } from "@/components/ui/marquee-separator";

export default function ContactPage() {
    const [isSuccess, setIsSuccess] = useState(false);

    return (
        <div className="min-h-screen bg-white">

            {/* --- Page Header: High Impact Editorial Style --- */}
            <section className="bg-blue-50 border-b border-gray-100 pt-32 pb-20 md:pt-40 md:pb-24">
                <div className="container mx-auto px-5 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-end gap-10">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-4 block">
                                Available for new projects
                            </span>
                            <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter text-primary uppercase leading-[0.9]">
                                <span className="bg-gradient-to-r from-[#FF0080] via-accent to-[#FF0080] bg-clip-text text-transparent animate-gradient font-semibold" style={{ backgroundSize: "300% 100%" }}>
                                   Let&apos;s build <br /> something big
                                </span>
                            </h1>
                        </div>
                        <div className="lg:pb-2">
                            <p className="text-lg lg:text-xl text-muted-foreground max-w-md leading-relaxed">
                                Whether it&apos;s a full-scale SEO audit or a custom-built web application, our architects are ready to help.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <MarqueeSeparator/>

            <div className="container mx-auto px-5 py-20 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                    {/* --- LEFT COLUMN: Sticky Contact Details --- */}
                    <div className="lg:col-span-4 order-2 lg:order-1">
                        <div className="lg:sticky lg:top-10 space-y-12">

                            <div>
                                <h2 className="text-xl font-bold text-primary mb-4 tracking-tight">Contact Information</h2>
                                <div className="space-y-6">
                                    <div className="group">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Email Us</p>
                                        <a href="mailto:support@dashmediasolutions.com" className="text-md sm:text-lg font-medium text-primary hover:text-accent transition-colors flex items-center gap-2">
                                            support@dashmediasolutions.com <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all" />
                                        </a>
                                    </div>

                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Visit Us</p>
                                        <p className="text-md sm:text-lg font-medium text-primary leading-tight">
                                            A-2, First Floor, Shankar Garden, Opposite Metro Pillar 620, Vikaspuri, Delhi, 110018
                                        </p>
                                    </div>

                                    <div className="group">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Call Us</p>
                                        <a href="tel:+9199110 60907" className="text-md sm:text-lg font-medium text-primary hover:text-accent transition-colors flex items-center gap-2">
                                            +91 99110 60907 <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all" />
                                        </a>
                                    </div>
                                </div>
                            </div>

        
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN: The Form --- */}
                    <div className="lg:col-span-8 order-1 lg:order-2">
                        {isSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-green-50 p-12 rounded-[2rem] border border-green-100 flex flex-col items-center text-center gap-6"
                            >
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                    <CheckCircle2 className="w-10 h-10" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold text-primary">Message Sent!</h2>
                                    <p className="text-green-800/80 text-lg max-w-sm">
                                        Our architects will review your project and get back to you within 24 hours.
                                    </p>
                                </div>
                                <Button onClick={() => setIsSuccess(false)} variant="outline" className="mt-4 bg-white rounded-full px-8">
                                    Send Another Message
                                </Button>
                            </motion.div>
                        ) : (
                            <div className="bg-blue-50/50 p-8  rounded-xl border border-gray-100">
                                <div className="mb-10">
                                    <h2 className="text-2xl font-bold text-primary tracking-tight mb-2">Start a conversation</h2>
                                    <p className="text-muted-foreground">Tell us about your project and business goals.</p>
                                </div>
                                <ContactPageForm onSuccess={() => setIsSuccess(true)} />
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}