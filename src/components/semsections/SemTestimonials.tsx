'use client';

import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
    {
        companyLogo: "/logos/netflix.svg",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300",
        name: "Jane Doe",
        role: "Marketing Director, Netflix.",
        review: "Dash Media Solutions transformed our online presence. Their data-driven approach delivered results we didn't think were possible.",
    },
    {
        companyLogo: "/logos/google.svg",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300",
        name: "John Smith",
        role: "CEO, Google Inc.",
        review: "From data chaos to clarity – Dash Media delivers powerful insights that turn complex data into actionable decisions.",
    },
    {
        companyLogo: "/logos/paypal.svg",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300",
        name: "Emily White",
        role: "Founder, PayPal",
        review: "The team's expertise in SEO and content strategy is unmatched. We've saved countless hours and seen incredible growth.",
    },
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

    return (
        <section className="py-15 lg:py-25 bg-blue-50">
            <div className="container mx-auto">
                {/* ✅ FIX: Main 2-column grid container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-12 items-center ">

                    {/* Left Column: Heading and Paragraph */}
                    <div className="text-center md:text-left">
                        <h2 className="text-4xl lg:text-6xl font-regular font-heading text-primary tracking-tight px-5 sm:px-0">
                            What Our <span
                                className="bg-gradient-to-r from-[#FF0080] via-accent to-[#FF0080] bg-clip-text text-transparent animate-gradient font-semibold"
                                style={{ backgroundSize: "300% 100%" }}
                            >
                                Clients
                            </span> say on <span
                                className="bg-gradient-to-r from-[#FF0080] via-accent to-[#FF0080] bg-clip-text text-transparent animate-gradient font-semibold"
                                style={{ backgroundSize: "300% 100%" }}
                            >
                                Google Review
                            </span>
                        </h2>
                        <p className="text-md sm:text-lg p-5 md:p-0 text-muted-foreground leading-relaxed mt-6">
                            Just don&apos;t take our word for it hear what our satisfied clients have to say about their experience partnering with us.
                        </p>
                    </div>

                    {/* Right Column: Carousel */}
                    <div>
                        <Carousel setApi={setApi} className="relative w-full">
                            <CarouselContent>
                                {testimonials.map((testimonial, index) => (
                                    <CarouselItem
                                        key={index}
                                        className="flex flex-col items-center cursor-grab text-center p-6 bg-transparent "
                                    >
                                        <div className="mb-6 relative h-10 w-32">
                                            <Image
                                                src={testimonial.companyLogo}
                                                alt={`${testimonial.name}'s company logo`}
                                                fill
                                                className="object-contain"
                                                draggable={false}
                                            />
                                        </div>
                                        <p className="max-w-xl text-balance text-md lg:text-xl text-primary font-medium leading-relaxed">
                                            " {testimonial.review} "
                                        </p>
                                        <div className="mt-6 relative size-16 rounded-full overflow-hidden bg-muted border">
                                            <Image
                                                src={testimonial.avatar}
                                                alt={testimonial.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <h3 className="mt-4 font-semibold text-primary text-md">
                                            {testimonial.name}
                                        </h3>
                                        <h4 className="mt-1 text-xs text-muted-foreground">
                                            {testimonial.role}
                                        </h4>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="absolute left-[5px] md:left-[-5px]  top-1/2 -translate-y-1/2" />
                            <CarouselNext className="absolute  right-[5px] md:right-[-5px] top-1/2 -translate-y-1/2" />
                        </Carousel>

                        <div className="mt-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        className={cn(
                                            "h-2 w-2 rounded-full transition-all",
                                            index === current ? "bg-primary w-4" : "bg-primary/35"
                                        )}
                                        onClick={() => api?.scrollTo(index)}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};