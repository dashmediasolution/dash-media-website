'use client';

import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
// ✅ Added Quote icon to imports
import { Star, ArrowRight, ArrowLeft, Quote } from "lucide-react";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

const testimonials = [
  {
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300",
    name: "Rajesh Singhal",
    role: "Director of Product Development, Software Company",
    review: "So far, I’m very impressed with the work of Dash Media Solutions on my app project. They understood the requirement properly and suggested their insight to improve the user experience and provide detailed support.",
  },
  {
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300",
    name: "Karan Oberoi",
    role: "VP of Engineering, IT Services Firm",
    review: "It's been a pleasure working with Dash Media Solutions; their team is prominent and responds to every request. They share timely updates for the app service and provide detailed insights that automate user functions.",
  },
  {
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300",
    name: "Mehak Chawla",
    role: "Chief Technology Officer (CTO), SaaS Organization",
    review: "Dash Media Solutions successfully created and deployed our mobile app. Later, the app was released on the app stores smoothly. Their team is currently updating the app to enhance the user experience. Highly recommended!",
  },
];

const teamImages = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200",
];

export function Testimonials() {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);

    React.useEffect(() => {
        if (!api) return;
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    const scrollPrev = () => api?.scrollPrev();
    const scrollNext = () => api?.scrollNext();

    return (
        <section className="py-20 bg-blue-50">
            <div className="container mx-auto px-5 sm:px-20">
                
                {/* --- Header Row --- */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-3xl text-left">
                        <h2 className=" text-2xl sm:text-3xl md:text-5xl font-regular font-heading text-primary tracking-tight leading-tight">
                            What Our {" "}
                            <span
                                className="bg-gradient-to-r from-[#FF0080] via-accent to-[#FF0080] bg-clip-text text-transparent animate-gradient font-semibold"
                                style={{ backgroundSize: "300% 100%" }}
                            >
                                Clients
                            </span>{" "}
                            Are Saying
                        </h2>
                        <p className="text-md sm:text-lg text-muted-foreground mt-6 leading-relaxed">
                        Explore what our clients have to say about our digital marketing services in USA and how they improve their online presence. 
                        </p>
                    </div>
                </div>

                {/* --- Content Grid --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 ">
                    
                    {/* 1. Left Summary Card (The Dark Box) */}
                    {/* ✅ FIX 1: Added 'items-center text-center' to parent card */}
                    <div className="lg:col-span-4 bg-primary rounded-xl p-10 flex flex-col items-center text-center text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                        
                        <div className="relative z-10 flex flex-col items-center w-full mb-5">
                            <div className="text-7xl font-bold tracking-tighter mb-2">4.7</div>
                            
                            {/* ✅ FIX 1: Added 'justify-center' to stars */}
                            <div className="flex gap-1 mb-4 text-yellow-400 justify-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} fill="currentColor" className="w-6 h-6" />
                                ))}
                            </div>
                            <p className="text-white/80 font-medium text-lg mb-4">
                                (1500+ Reviews)
                            </p>
                            <p className="text-md font-semibold leading-relaxed text-white mb-4">
                                Discover Clients&apos; Experiences <br />That Define Our Partnerships
                            </p>
                        </div>

                        {/* Avatar Stack */}
                        {/* ✅ FIX 1: Added 'justify-center' to wrapper */}
                        <div className="mt-0 flex items-center justify-center relative z-10">
                            <div className="flex -space-x-4">
                                {teamImages.map((src, i) => (
                                    <div key={i} className="relative w-14 h-14 rounded-full border-2 border-primary overflow-hidden bg-muted">
                                        <Image 
                                            src={src} 
                                            alt={`User ${i + 1}`} 
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                                <div className="relative w-14 h-14 rounded-full border-2 border-primary bg-accent flex items-center justify-center text-white font-bold text-sm">
                                    +40
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Right Carousel Card */}
                    <div className="lg:col-span-8 bg-white rounded-xl p-8 border-none flex flex-col justify-center min-h-[400px]">
                        <Carousel setApi={setApi} className="w-full">
                            <CarouselContent className="ml-0">
                                {testimonials.map((testimonial, index) => (
                                    <CarouselItem key={index} className="pl-0 basis-full">
                                        <div className="flex flex-col h-full justify-between px-1">
                                            
                                            {/* Stars & Rating */}
                                            <div className="flex items-center gap-2 mb-6">
                                                <div className="flex gap-1 text-yellow-400">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} fill="currentColor" className="w-5 h-5" />
                                                    ))}
                                                </div>
                                                <span className="text-primary font-bold ml-2">5.0</span>
                                            </div>

                                            {/* Review Text */}
                                            {/* ✅ FIX 2: Added 'relative' and the Quote Icon */}
                                            <div className="mb-10 w-full relative z-0">
                                                {/* MOVED: Quote to right side and FLIPPED vertically */}
                                                <Quote className="absolute -top-6 right-10 w-28 h-28 text-gray-100 fill-gray-100 -z-10 opacity-70 transform scale-y-[-1]" />
                                                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-regular break-words relative z-10">
                                                    &quot;{testimonial.review}&quot;
                                                </p>
                                            </div>

                                            {/* Footer: Author + Navigation */}
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-gray-100 mt-10">
                                                
                                                {/* Author Info */}
                                                <div className="flex items-center gap-4">
                                                    <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-100 shrink-0">
                                                        <Image
                                                            src={testimonial.avatar}
                                                            alt={testimonial.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-primary text-lg">
                                                            {testimonial.name}
                                                        </h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            {testimonial.role}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Navigation Buttons */}
                                                <div className="flex gap-3">
                                                    <button 
                                                        onClick={scrollPrev}
                                                        className="w-12 h-12 rounded-full bg-gray-100 text-primary hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 group"
                                                    >
                                                        <ArrowLeft className="w-5 h-5" />
                                                    </button>
                                                    <button 
                                                        onClick={scrollNext}
                                                        className="w-12 h-12 rounded-full bg-gray-100 text-primary hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 group"
                                                    >
                                                        <ArrowRight className="w-5 h-5" />
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>

                </div>
            </div>
        </section>
    );
}