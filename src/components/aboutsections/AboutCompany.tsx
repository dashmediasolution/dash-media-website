import Image from "next/image";

export function AboutCompany() {
  const skills = [
    { label: "Marketing Strategy Accuracy", percentage: 85 },
    { label: "Increased Brand Awareness", percentage: 80 },
    { label: "Rate of Client Success", percentage: 95 },
  ];

  return (
    <section className="pt-20 sm:pt-40 pb-25 bg-blue-50">
      <div className="container mx-auto px-5 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Column: Bento Image Grid Placeholder */}
          <div className="relative animate-appear order-2 lg:order-1">
            {/* Aspect ratio container to match 500x600 request */}
            <div className="relative w-full aspect-[6/6] mx-auto overflow-hidden ">
              <Image
                src="/images/about-banner.png"
                alt="About Dash Media"
                fill
                className="object-contain"
              />
            </div>

          </div>

          {/* Right Column: Content & Progress Bars */}
          <div className="flex flex-col gap-8 text-left order-1 lg:order-2">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-regular font-heading text-primary leading-tight">
                Leading Digital {" "}
                <span className="bg-gradient-to-r from-[#FF0080] via-accent to-[#FF0080] bg-clip-text text-transparent animate-gradient font-semibold" style={{ backgroundSize: "300% 100%" }}>
                Marketing Agency in USA
                </span>
              </h2>
              <p className="text-md sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                We are professionals who combine industry expertise with diverse strategies to boost growth. As a top-rated digital marketing agency in USA, our mission is to help businesses navigate their online journey using innovative, tailored techniques. We desire to become your dedicated partner in all your web adventures.
              </p>
            </div>

            {/* Progress Bars Section */}
            <div className="space-y-6 max-w-xl">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-bold text-primary uppercase tracking-wider">
                    <span>{skill.label}</span>
                    <span>{skill.percentage}%</span>
                  </div>

                  {/* 1. Removed overflow-hidden to allow the dot to be visible outside the bar */}
                  <div className="relative h-2 w-full bg-gray-200 rounded-full">
                    <div
                      className="relative h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.percentage}%` }}
                    >
                      {/* 2. Positioned the dot absolutely to sit at the very end of the progress width */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex items-center justify-center">
                        {/* The dot indicator */}
                        <div className="h-6 w-6 bg-accent rounded-full shadow-md shrink-0" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}