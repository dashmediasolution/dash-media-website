// components/Section.tsx
export const Section = ({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-16 md:py-24 px-4 ${className}`}>
    <div className="max-w-7xl mx-auto">{children}</div>
  </section>
);