import Image from "next/image";

// Define the logos for the SEO tools
const toolkitLogos = [
  { name: "google-analytics", src: "/logos/google-analytics.png" },
  { name: "google-search-console", src: "/logos/google-search-console.png" },
  { name: "ahrefs", src: "/logos/ahrefs.png" },
  { name: "semrush", src: "/logos/semrush.png" },
  { name: "moz", src: "/logos/moz.png" },
  { name: "screaming-frog", src: "/logos/screaming-frog.png" },
];

export function SocialToolkits() {
  return (
    <section className="py-15 lg:py-24 bg-gray-50">
      <div className="container mx-auto">
        {/* ✅ FIX: Main grid container for the 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">

          {/* Left Column (2/3 width): Logo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-12 items-center lg:col-span-2 p-5 sm:p-0 order-2 md:order-1">
            {toolkitLogos.map((logo) => (
              <div key={logo.name} className="relative h-20 flex justify-center">
                <Image
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 250px"
                  className="object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>

          {/* Right Column (1/3 width): Headline */}
          <div className="text-center lg:col-span-1 order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-regular font-heading text-primary">
              Our{" "}
              <span
                className="bg-gradient-to-r from-[#FF0080] via-accent to-[#FF0080] bg-clip-text text-transparent animate-gradient font-semibold"
                style={{ backgroundSize: "300% 100%" }}
              >
                Social Media Marketing
              </span>
              <br className="sm:hidden"/>
              {" "} Toolkit
            </h2>
          </div>

        </div>
      </div>
    </section>
  );
}