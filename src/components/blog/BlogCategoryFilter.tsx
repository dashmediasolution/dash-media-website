'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BlogCategoryFilterProps {
  categories: string[];
}

export function BlogCategoryFilter({ categories }: BlogCategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const activeCategory = searchParams.get('category') || "all";

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (value === "all") {
      params.delete('category'); 
    } else {
      params.set('category', value);
    }
    
    params.delete('page'); // Reset pagination
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex justify-end mb-8 px-10 sm:px-10">
      {/* Wrapper for Label + Dropdown */}
      <div className="flex items-center gap-1 sm:gap-3 w-auto">
        <span className="text-sm sm:text-[17px] font-medium text-muted-foreground whitespace-nowrap">
          Sort by:
        </span>
        
        <div className="w-[70%] sm:w-[250px]">
          <Select 
              value={activeCategory} 
              onValueChange={handleCategoryChange}
          >
            <SelectTrigger className="w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 h-11">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="font-medium">
                All Categories
              </SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}