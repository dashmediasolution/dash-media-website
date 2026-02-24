export const metadata = {
  title: "Privacy Policy | Dash Media Solutions",
  description: "Privacy Policy regarding the collection and use of your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white pb-32">
      
      {/* --- Page Header: High Impact Editorial Style --- */}
      <section className="bg-blue-50 border-b border-gray-100 pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="container mx-auto px-5 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-end gap-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-4 block">
                Trust & Transparency
              </span>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter text-primary uppercase leading-[0.9]">
                <span className="bg-gradient-to-r from-[#FF0080] via-accent to-[#FF0080] bg-clip-text text-transparent animate-gradient font-semibold" style={{ backgroundSize: "300% 100%" }}>
                  Your Privacy <br /> Matters
                </span>
              </h1>
            </div>
            <div className="lg:pb-2">
              <p className="text-lg lg:text-xl text-muted-foreground max-w-md leading-relaxed">
                We are committed to protecting your personal data and being transparent about how we architect growth while respecting your digital footprint.
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary mt-6 opacity-60">
                Last Updated: December 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Content Section --- */}
      <div className="container mx-auto px-6 max-w-6xl mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Side: Navigation/Table of Contents (Sticky) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-32 h-fit">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-accent mb-8">
              Document Sections
            </h3>
            <nav className="flex flex-col space-y-4">
              {["Information Collection", "Data Usage", "Tracking Policy", "Security Standards", "Third Parties"].map((item, i) => (
                <div key={i} className="group flex items-center gap-4 cursor-pointer">
                  <span className="text-[10px] font-mono text-muted-foreground group-hover:text-accent transition-colors">0{i + 1}</span>
                  <span className="text-sm font-bold text-primary/60 group-hover:text-primary transition-colors uppercase tracking-tight">{item}</span>
                </div>
              ))}
            </nav>
            
            <div className="mt-16 p-8 bg-blue-50/50 rounded-2xl border border-blue-100">
               <p className="text-xs font-bold text-primary mb-2 uppercase tracking-widest">Questions?</p>
               <p className="text-sm text-muted-foreground mb-4">Our legal team is here to help architect a safer web for you.</p>
               <a href="mailto:support@dashmediasolutions.com" className="text-xs font-bold text-accent hover:underline uppercase tracking-widest">Contact Privacy</a>
            </div>
          </aside>

          {/* Right Side: The Policy Content */}
          <main className="lg:col-span-8">
            <article className="prose prose-slate max-w-none 
              prose-h2:text-3xl prose-h2:font-bold prose-h2:tracking-tighter prose-h2:text-primary prose-h2:uppercase prose-h2:mb-8
              prose-p:text-lg prose-p:leading-relaxed prose-p:text-muted-foreground prose-p:mb-8
              prose-li:text-lg prose-li:text-muted-foreground prose-li:mb-2
              prose-strong:text-primary prose-strong:font-bold">

              <section id="collection" className="mb-20">
                <h2>01. Information We Collect</h2>
                <p>
                  We collect several different types of information for various purposes to provide and improve our Service to you:
                </p>
                <ul>
                  <li><strong>Personal Data:</strong> Identifiable information such as email address, names, and contact details used to facilitate our digital architecture.</li>
                  <li><strong>Usage Data:</strong> Technical information including IP addresses, browser versions, and site navigation patterns.</li>
                </ul>
              </section>

              <section id="usage" className="mb-20">
                <h2>02. How We Use Your Data</h2>
                <p>
                  Dash Media Solutions utilizes collected data to maintain service excellence and drive performance:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mb-10">
                  {[
                    "Maintain & Provide Service", 
                    "Service Change Notifications", 
                    "Interactive Participation", 
                    "Customer Care & Support",
                    "Usage Monitoring"
                  ].map((text, i) => (
                    <div key={i} className="p-4 bg-blue-50 border border-gray-100 rounded-xl text-sm font-semibold text-primary">
                      {text}
                    </div>
                  ))}
                </div>
              </section>

              <section id="cookies" className="mb-20">
                <h2>03. Cookies and Tracking Data</h2>
                <p>
                  We use cookies and similar tracking technologies to track activity on our Service. You can instruct your browser to refuse all cookies; however, some portions of our "Architecture of Growth" may be limited.
                </p>
              </section>

              <section id="security" className="mb-20">
                <h2>04. Data Security</h2>
                <p>
                  While no method of electronic storage is 100% secure, we strive to use commercially acceptable means to protect your Personal Data. We prioritize the structural integrity of your information at every stage of the project.
                </p>
              </section>

              <section id="third-party" className="mb-20">
                <h2>05. Third-Party Services</h2>
                <p>
                  We may employ third-party companies to facilitate our service. These providers have access to your Personal Data only to perform specific tasks on our behalf and are strictly obligated to confidentiality.
                </p>
              </section>

            </article>
          </main>

        </div>
      </div>
    </div>
  );
}