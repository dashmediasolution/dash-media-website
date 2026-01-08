"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Brand {
  name: string;
  logo: string;
}

interface BrandsGridProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  brands: Brand[];
  imageHeight?: number;
}

export const BrandsGrid = React.forwardRef<HTMLDivElement, BrandsGridProps>(
  ({ 
    className,
    title = "Trusted and loved by fast-growing companies worldwide",
    brands,
    imageHeight =110, // 14 * 4 = 56px (h-14)
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("py-4", className)} // Reduced padding
        {...props}
      >
        <div className="w-full">
          {title && (
            <p className="max-w-sm mx-auto text-pretty text-center font-medium mb-6 text-foreground md:text-lg">
              {title}
            </p>
          )}

          <div className="grid grid-cols-2 items-center md:grid-cols-4">
            {brands.map((brand) => (
              <div key={brand.name} className="flex items-center justify-center p-4 h-24">
                <div className="relative h-15 w-60">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 250px"
                    className="object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

BrandsGrid.displayName = "BrandsGrid";