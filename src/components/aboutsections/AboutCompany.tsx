import Image from "next/image";

export function AboutCompany() {
  return (
    <section className="pt-30 sm:pt-35 pb-7 bg-gradient-to-b from-blue-50 to-gray-50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Text */}
          <div className="flex flex-col gap-5 text-center md:text-left p-5 md:p-0">
            <h2 className="text-4xl md:text-6xl font-regular font-heading text-primary">
              Our  
               <span
                className="bg-gradient-to-r from-[#FF0080] via-accent to-[#FF0080] bg-clip-text text-transparent animate-gradient font-semibold"
                style={{ backgroundSize: "300% 100%" }}
              >
                {" "}
                 Mission
              </span> 
            </h2>
            <p className="text-md sm:text-lg text-muted-foreground leading-relaxed">
              Dash Media Solutions was founded with a simple mission: to deliver transparent, data-driven marketing solutions that help businesses thrive in the digital age. We are passionate about crafting strategies that not only meet but exceed our clients&apos; goals, fostering growth and building lasting partnerships.
            </p>
          </div>

          {/* Right Column: Image */}
          <div className="relative h-[250px] sm:h-[370px] md:h-[400px] w-full overflow-hidden ">
            <Image
              src="/images/working-team.svg"
              alt="Dash Media team collaborating in a modern office"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}