export const metadata = {
  title: "Terms and Conditions | Dash Media Solutions",
  description: "Terms and Conditions for using Dash Media Solutions services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white pb-32">
      
      {/* --- Page Header: High Impact Editorial Style --- */}
      <section className="bg-blue-50 border-b border-gray-100 pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="container mx-auto px-5 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-end gap-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-4 block">
                Service Agreement
              </span>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter text-primary uppercase leading-[0.9]">
                <span className="bg-gradient-to-r from-[#FF0080] via-accent to-[#FF0080] bg-clip-text text-transparent animate-gradient font-semibold" style={{ backgroundSize: "300% 100%" }}>
                  Terms of <br /> Service
                </span>
              </h1>
            </div>
            <div className="lg:pb-2">
              <p className="text-lg lg:text-xl text-muted-foreground max-w-md leading-relaxed">
                Please review these guidelines carefully. They govern the architecture of our partnership and the professional use of our digital services.
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary mt-6 opacity-60">
                Last Updated: December 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Content Section: Two Column Grid --- */}
      <div className="container mx-auto px-6 max-w-6xl mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Side: Index Navigation (Sticky) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-32 h-fit">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-accent mb-8">
              Legal Framework
            </h3>
            <nav className="flex flex-col space-y-4">
              {[
                "Introduction", 
                "Intellectual Property", 
                "User Responsibilities", 
                "Liability Terms", 
                "Governing Law", 
                "Modifications"
              ].map((item, i) => (
                <div key={i} className="group flex items-center gap-4 cursor-pointer">
                  <span className="text-[10px] font-mono text-muted-foreground group-hover:text-accent transition-colors">0{i + 1}</span>
                  <span className="text-sm font-bold text-primary/60 group-hover:text-primary transition-colors uppercase tracking-tight">{item}</span>
                </div>
              ))}
            </nav>
            
            <div className="mt-16 p-8 bg-gray-50 rounded-2xl border border-gray-100">
               <p className="text-xs font-bold text-primary mb-2 uppercase tracking-widest">Compliance</p>
               <p className="text-sm text-muted-foreground mb-4 italic">
                Dash Media Solutions operates under the laws of India.
               </p>
               <a href="mailto:support@dashmediasolutions.com" className="text-xs font-bold text-accent hover:underline uppercase tracking-widest">Legal Inquiries</a>
            </div>
          </aside>

          {/* Right Side: Detailed Content */}
          <main className="lg:col-span-8">
            <article className="prose prose-slate max-w-none 
              prose-h2:text-3xl prose-h2:font-bold prose-h2:tracking-tighter prose-h2:text-primary prose-h2:uppercase prose-h2:mb-8
              prose-p:text-lg prose-p:leading-relaxed prose-p:text-muted-foreground prose-p:mb-8
              prose-li:text-lg prose-li:text-muted-foreground prose-li:mb-2
              prose-strong:text-primary prose-strong:font-bold">

              <section className="mb-20">
                <h2>01. Introduction</h2>
                <p>
                  Welcome to Dash Media Solutions. By accessing our platform and using our web services, you agree to be bound by these Terms and Conditions. Our digital architecture is designed to drive growth, and these terms ensure a professional environment for all users.
                </p>
              </section>

              <section className="mb-20">
                <h2>02. Intellectual Property</h2>
                <p>
                  The service and its original content, features, and functionality remain the exclusive property of Dash Media Solutions. Our trademarks and design assets are part of our unique "Architect" identity and may not be used without prior written consent.
                </p>
              </section>

              <section className="mb-20">
                <h2>03. User Responsibilities</h2>
                <p>To maintain the structural integrity of our platform, users must adhere to the following:</p>
                <div className="grid grid-cols-1 gap-4 not-prose mb-10">
                  {[
                    "No damage to website accessibility",
                    "No unlawful or fraudulent activities",
                    "No unauthorized automated data collection",
                    "Respect for system architecture & security"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 bg-blue-50/50 border border-blue-100 rounded-xl">
                      <span className="text-sm font-semibold text-primary">{text}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mb-20">
                <h2>04. Limitation of Liability</h2>
                <p>
                  Dash Media Solutions, including its directors and affiliates, shall not be liable for any indirect or consequential losses resulting from your use or inability to use our digital architecture.
                </p>
              </section>

              <section className="mb-20">
                <h2>05. Governing Law</h2>
                <p>
                  These Terms are governed by and construed in accordance with the laws of India. Any failure to enforce specific rights does not constitute a waiver of those legal frameworks.
                </p>
              </section>

              <section className="mb-20">
                <h2>06. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these Terms as we evolve our service offerings. Continued use of our "Architecture of Growth" platform constitutes acceptance of updated revisions.
                </p>
              </section>

            </article>
          </main>
        </div>
      </div>
    </div>
  );
}