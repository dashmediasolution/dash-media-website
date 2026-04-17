import Image from "next/image";

// ✅ Filtered to only Screaming Frog, Ahrefs, and Google Analytics
const toolkitLogos = [
  { name: "adobe", src: "/logos/video/adobe.png" },
  { name: "canva", src: "/logos/video/canva-video.png" },
  { name: "vimeo", src: "/logos/video/vimeo.png" },
];

export function VideoToolkits() {
  return (
    <section className="py-15 bg-white">
      <div className="container mx-auto px-5 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column (8 Columns): Headline */}
          <div className="lg:col-span-8 text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-regular tracking-tighter text-primary leading-none">
              Our{" "}
              <span
                className="bg-gradient-to-r from-[#FF0080] via-accent to-[#FF0080] bg-clip-text text-transparent animate-gradient font-semibold"
                style={{ backgroundSize: "300% 100%" }}
              >
                Video Toolkit
              </span>
            </h2>
            <p className="mt-6 text-muted-foreground text-lg max-w-xl font-medium">
              Stop wasting clicks—use high-impact video marketing services in USA to capture attention and drive sales.
            </p>
          </div>

          {/* Right Column (4 Columns): Parallel Logos */}
          <div className="lg:col-span-4 grid grid-cols-3 gap-8 items-center">
            {toolkitLogos.map((logo) => (
              <div key={logo.name} className="relative h-30 w-full flex justify-center group">
                <Image
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  fill
                  sizes="150px"
                  className="object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}