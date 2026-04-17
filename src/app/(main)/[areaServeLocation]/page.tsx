import { prisma } from '@/lib/prisma';
import { 
  CheckCircle2, 
  Search, 
  MousePointer2, 
  Layout, 
  Share2, 
  Mail, 
  MessageSquare, 
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Rocket,
  Zap,
  TrendingUp,
  Route,
  ArrowRight,
  Target,
  LineChart,
  Briefcase,
  Store,
  ShoppingCart,
  Users,
  ArrowUpRight,
  Check,
  Play,
  Star,
  ChevronDown
} from 'lucide-react';
import Image from 'next/image';
import { Metadata } from 'next';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import FaqSection from '@/components/FaqSection';
import GrowthPlanForm from './GrowthPlanForm';

interface AreaServeLocationPageProps {
  params: Promise<{
    areaServeLocation: string;
  }>;
}

// Define strict types for the location data to resolve TS errors
export interface LocationPageData {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  heroHeading: string | null;
  heroSubheading: string | null;
  strategyHeading: string | null;
  strategySubheading: string | null;
  servicesHeading: string | null;
  workflowHeading: string | null;
  workflowSubheading: string | null;
  audienceHeading: string | null;
  audienceSubheading: string | null;
  faqHeading: string | null;
  faqSubheading: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const servicesList = [
  {
    title: "SEO Strategy",
    desc: "Capture high-intent organic traffic with technical SEO, content strategy, and authority building.",
    icon: <Search size={24} />,
    active: false,
  },
  {
    title: "Paid Advertising",
    desc: "Scale predictably with data-driven campaigns across Search, Social, and Display networks.",
    icon: <MousePointer2 size={24} />,
    active: false,
  },
  {
    title: "Performance Marketing",
    desc: "Full-funnel strategies built around measurable ROI, unit economics, and sustainable growth.",
    icon: <BarChart3 size={24} />,
    active: true,
  },
  {
    title: "Web Design & CRO",
    desc: "Conversion-optimized landing pages and websites designed to turn visitors into leads.",
    icon: <Layout size={24} />,
    active: false,
  },
  {
    title: "Content Marketing",
    desc: "Engaging, authoritative content that builds trust and guides prospects through the buyer's journey.",
    icon: <MessageSquare size={24} />,
    active: false,
  },
  {
    title: "Email Marketing",
    desc: "Nurture leads and drive repeat sales with targeted, automated email campaigns.",
    icon: <Mail size={24} />,
    active: false,
  }
];

// ... Metadata function remains the same as your provided code ...

export default async function AreaServeLocationPage({ params }: AreaServeLocationPageProps) {
  const resolvedParams = await params;
  
  // Fetch data and cast to our strong type to ensure TS doesn't complain
  const location = (await prisma.areaServeLocation?.findUnique({
    where: { slug: resolvedParams.areaServeLocation },
  })) as never as LocationPageData | null;

  // If no location is found or it's not active, show a custom div message.
  if (!location || !location.isActive) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center bg-white px-4">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Location Not Found</h1>
          <p className="text-lg text-slate-600">The location you are looking for is currently unavailable or does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white text-foreground font-sans selection:bg-primary/10 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <div className="relative font-sans antialiased">
        {/* SECTION 1: BACKGROUND AND LEFT TEXT */}
        <section className="relative min-h-[200px] md:min-h-screen flex items-center pt-20 pb-48 md:pb-64 overflow-hidden">
          {/* Background Image with Diverse Professional Team */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/dms-marketing-agency.webp"
              alt="Diverse professional team analyzing data"
              fill
              priority
              className="object-cover object-left"
            />
            {/* Dark, semi-transparent overlay */}
            <div className="absolute inset-0 bg-linear-to-r/srgb from-gray-800/80 from-5% via-gray-800/80  via-16% to-transparent"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
            <div className="max-w-3xl text-left">
              <h1 className="text-4xl md:text-7xl pt-18 font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
                {location.heroHeading ? (
                  location.heroHeading
                ) : (
                  <>
                    Digital Campaigns in {location.name}  
                    <span className="bg-gradient-to-r from-[#FF0080] via-accent to-[#FF0080] bg-clip-text text-transparent animate-gradient font-semibold" style={{ backgroundSize: "300% 100%" }}> That Inspires</span>
                  </>
                )}
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
                {location.heroSubheading || `We help growth-focused brands in ${location.name} scale with performance marketing, content strategy, paid social, SEO, and conversion-first web experiences built to generate qualified leads.`}
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="group flex items-center justify-center gap-2 px-8 md:px-10 py-4 bg-primary text-primary-foreground font-bold rounded-full border-2 border-primary  hover:text-white transition-all duration-300 hover:shadow-none uppercase tracking-widest text-sm active:scale-95">
                  Explore
                  <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="flex items-center justify-center px-8 md:px-10 py-4 bg-transparent text-white font-bold rounded-full border-2 border-white/70 hover:border-white hover:bg-white hover:text-primary transition-all duration-300 shadow-lg uppercase tracking-widest text-sm active:scale-95 backdrop-blur-sm">
                  Book consultation
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: FLOATING CONTACT FORM */}
        <section className="relative z-20 -mt-24 md:-mt-40 px-4 pb-20">
           <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-border/50 relative group">
            {/* Subtle background gradient pattern */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

            <div className="absolute -top-5 right-6 md:-right-5 bg-gradient-to-br from-primary to-primary/80 text-white p-4 rounded-2xl shadow-lg shadow-primary/30 animate-bounce duration-[3000ms] z-20">
              <Zap fill="currentColor" size={24} />
            </div>

            <div className="text-center mb-10 relative z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-primary tracking-tight">Request your free growth plan</h2>
              <p className="text-muted-foreground text-base md:text-lg">Personalized marketing strategy for {location.name} businesses.</p>
            </div>

            <GrowthPlanForm />
          </div>
        </div>
        </section>
      </div>
          

      {/* 2. STRATEGY SECTION */}
      <section className="py-16 md:py-20 bg-blue-50">
        <div className="max-w-3xl mx-auto text-center mb-16 px-4">
          <span className="text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground mb-6 block">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-6 tracking-tight">
            {location.strategyHeading || 'Solutions We Provide'}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {location.strategySubheading || `We build growth systems tailored for ${location.name}. Our approach combines targeted acquisition channels with conversion-focused experiences to turn attention into measurable revenue.`}
          </p>
        </div>

        {/* Service Cards Carousel */}
        <div className="max-w-7xl mx-auto px-4 mb-12 relative group/carousel">
          <Carousel 
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6 py-4">
              {servicesList.map((service, idx) => (
                <CarouselItem key={idx} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3">
                  <div className={`h-full rounded-2xl p-8 relative group transition-all duration-300 ${
                    service.active 
                      ? 'bg-primary shadow-xl shadow-primary/20 transform md:-translate-y-2' 
                      : 'bg-white border border-border shadow-sm hover:shadow-md hover:border-primary/20'
                  }`}>
                    <div className={`absolute top-8 right-8 transition-colors ${
                      service.active ? 'text-white/60 group-hover:text-white' : 'text-muted-foreground/30 group-hover:text-primary'
                    }`}>
                      <ArrowUpRight size={24} />
                    </div>
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${
                      service.active ? 'bg-white/20 text-white backdrop-blur-sm' : 'bg-primary/10 text-primary'
                    }`}>
                      {service.icon}
                    </div>
                    <h3 className={`text-2xl font-bold mb-4 ${
                      service.active ? 'text-white' : 'text-primary'
                    }`}>{service.title}</h3>
                    <p className={`leading-relaxed ${
                      service.active ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    }`}>{service.desc}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Mobile Controls */}
            <div className="flex items-center justify-center gap-4 mt-8 md:hidden">
              <CarouselPrevious className="static transform-none" />
              <CarouselNext className="static transform-none" />
            </div>
            
            {/* Desktop floating controls (visible on hover) */}
            <div className="hidden md:block opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
              <CarouselPrevious className="-left-4 lg:-left-12 bg-white shadow-md border-border text-muted-foreground hover:text-primary hover:border-primary/30" />
              <CarouselNext className="-right-4 lg:-right-12 bg-white shadow-md border-border text-muted-foreground hover:text-primary hover:border-primary/30" />
            </div>
          </Carousel>
        </div>

        {/* Featured Service Detailed Section */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-[2rem] border border-border/50 shadow-sm overflow-hidden flex flex-col lg:flex-row">
            
            {/* Left Side: Mockup Visuals */}
            <div className="w-full lg:w-5/12 bg-muted/30 relative p-8 flex flex-col justify-center items-center min-h-[400px] border-r border-border/50">
              <span className="absolute top-6 left-6 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">Featured Service</span>
              
              {/* CSS Laptop Mockups */}
              <div className="relative w-full max-w-[400px] aspect-[4/3] flex items-center justify-center mt-6">
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Laptop 1 - Before (Flat Graph) */}
                  <div className="w-[45%] h-3/4 bg-white rounded-t-xl border-4 border-b-8 border-primary shadow-xl flex flex-col overflow-hidden relative z-0 transform -rotate-6 translate-x-6 translate-y-4">
                    <div className="w-full h-4 bg-muted/50 border-b border-border/50 flex items-center px-2 gap-1"><div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30"/><div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30"/></div>
                    <div className="flex-1 flex items-end p-2 opacity-50">
                      <svg viewBox="0 0 100 50" className="w-full h-full" preserveAspectRatio="none">
                        <polyline points="0,40 20,35 40,38 60,32 80,35 100,30" className="stroke-muted-foreground/30 fill-none stroke-[3] stroke-linecap-round stroke-linejoin-round" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Laptop 2 - After (Rising Graph) */}
                  <div className="w-[50%] h-[80%] bg-white rounded-t-xl border-4 border-b-8 border-primary shadow-2xl flex flex-col overflow-hidden relative z-10 bg-gradient-to-t from-white to-muted/20 -translate-x-2">
                    <div className="w-full h-4 bg-muted/50 border-b border-border/50 flex items-center px-2 gap-1"><div className="w-1.5 h-1.5 rounded-full bg-red-400"/><div className="w-1.5 h-1.5 rounded-full bg-amber-400"/><div className="w-1.5 h-1.5 rounded-full bg-green-400"/></div>
                    <div className="flex-1 flex items-end p-0 relative">
                      <svg viewBox="0 0 100 50" className="w-full h-full absolute inset-0" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="pinkGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#FF0080" stopOpacity="0.4"/>
                            <stop offset="100%" stopColor="#FF0080" stopOpacity="0"/>
                          </linearGradient>
                        </defs>
                        <path d="M0,45 L20,35 L40,38 L60,20 L80,25 L100,5 L100,50 L0,50 Z" fill="url(#pinkGradient)" />
                        <polyline points="0,45 20,35 40,38 60,20 80,25 100,5" className="stroke-[#FF0080] fill-none stroke-[3] stroke-linecap-round stroke-linejoin-round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side: Content */}
            <div className="w-full lg:w-7/12 p-8 md:p-14 flex flex-col justify-center">
              <span className="inline-block self-start px-3 py-1 rounded bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest mb-8">
                Featured Service
              </span>
              
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 mb-10 pb-10 border-b border-border/50">
                <div>
                  <p className="text-2xl lg:text-3xl font-black text-primary mb-1">3.4x</p>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">ROAS Focus</p>
                </div>
                <div>
                  <p className="text-2xl lg:text-3xl font-black text-primary mb-1">Full Funnel</p>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Campaign Coverage</p>
                </div>
                <div>
                  <p className="text-2xl lg:text-3xl font-black text-primary mb-1">Weekly</p>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Reporting Rhythm</p>
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6 leading-[1.15]">
                Performance Marketing Built Around Measurable ROI
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We don&apos;t just optimize for clicks. We build end-to-end performance engines that capture demand, nurture consideration, and drive conversions at a profitable CAC.
              </p>

              {/* Checklist */}
              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {['Omnichannel Strategy', 'Conversion Rate Optimization', 'Creative Testing', 'Advanced Attribution'].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-accent stroke-[3]" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-6">
                <button className="px-8 py-3.5 bg-primary text-primary-foreground text-sm font-bold rounded-md hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 tracking-wider">
                  LEARN MORE
                </button>
                <button className="text-sm font-bold text-primary hover:text-accent transition-colors relative group">
                  See campaign approach
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AGENCY OVERVIEW / ABOUT SECTION */}
      <section className="py-16 md:py-24 bg-white border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column: Text Content */}
            <div className="flex flex-col justify-center order-2 lg:order-1">
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground mb-6 block">
                Agency Overview
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-primary leading-[1.15] mb-6 tracking-tight">
                Dash Media Solutions | Digital Growth Partner
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                We combine strategy, creative, media buying, and reporting to help businesses grow with confidence. Our approach is rooted in research, clear messaging, and channel decisions tied to real business outcomes.
              </p>
              <div>
                <button className="px-8 py-3.5 bg-primary text-primary-foreground text-sm font-bold rounded-md hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 tracking-wider uppercase">
                  About Us
                </button>
              </div>
            </div>

            {/* Right Column: Media Video Thumbnail */}
            <div className="relative w-full aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl group cursor-pointer order-1 lg:order-2">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1200"
                alt="Professional team in a bright meeting room"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Subtle dark overlay for better play button contrast */}
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-300"></div>
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300 relative">
                  {/* Pulse effect */}
                  <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20"></div>
                  <Play size={36} className="ml-2" fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTISE & STATS SECTION */}
      <section className="py-16 md:py-24 bg-blue-50 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left Column: Overlapping Images */}
            <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
              {/* Background Image */}
              <div className="relative aspect-[4/5] md:aspect-[3/4] w-[80%] ml-auto rounded-3xl overflow-hidden shadow-lg z-10 opacity-90">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Man working at desk"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Foreground Image */}
              <div className="absolute bottom-10 left-0 w-[65%] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-[8px] border-white z-20">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80"
                  alt="Team in a meeting room"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Column: Content & Stats */}
            <div className="flex flex-col justify-center">
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground mb-6 block">
                Strategy, Creative, Media, Reporting
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-primary leading-[1.15] mb-6 tracking-tight">
                Our Expertise In Digital Marketing
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                We support brands across the full funnel with campaign planning, audience targeting, content production, SEO execution, paid media management, and conversion optimization. Every recommendation is designed to improve performance without adding unnecessary complexity.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-border text-center sm:text-left">
                <div className="flex flex-col">
                  <span className="text-4xl font-extrabold text-primary mb-2">120+</span>
                  <span className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest">Brands Supported</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-extrabold text-primary mb-2">8+</span>
                  <span className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest">Years in Growth Marketing</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-extrabold text-primary mb-2">4.9</span>
                  <span className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest">Average Client Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES / WORKS GRID SECTION */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground mb-6 block">
              Case Studies
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">
              Real Results From Growing Brands.
            </h2>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { title: "Ecommerce Brand Launch", services: "Paid Social + CRO + Creative Testing", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
              { title: "Local Service Growth", services: "Local SEO + Google Ads + Web Design", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
              { title: "B2B Lead Generation", services: "LinkedIn Ads + Content + Email", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" },
              { title: "Retail Expansion", services: "Omnichannel + Advanced Attribution", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800" },
            ].map((study, idx) => (
              <article key={idx} className="group bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer border border-border">
                {/* Image (Top) */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
                  <Image 
                    src={study.img} 
                    alt={study.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                
                {/* Content (Bottom) */}
                <div className="p-5 flex justify-between items-center gap-4">
                  <div className="flex flex-col">
                    <h3 className="text-base md:text-lg font-bold text-primary mb-1 leading-tight">{study.title}</h3>
                    <p className="text-xs text-muted-foreground font-medium leading-relaxed">{study.services}</p>
                  </div>
                  <div className="shrink-0 w-10 h-10 rounded-full bg-white shadow-sm border border-border flex items-center justify-center group-hover:border-primary/20 group-hover:bg-primary/5 transition-colors duration-300">
                    <Play className="w-4 h-4 text-primary ml-1" fill="currentColor" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT TESTIMONIALS / FEEDBACK CAROUSEL SECTION */}
      <section className="py-16 md:py-24 bg-blue-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          {/* Intro Text */}
          <div className="text-center mb-12 md:mb-16">
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground mb-6 block">
              Reviews
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">
              Check Out Our Client Feedback.
            </h2>
          </div>

          {/* Carousel Layout */}
          <div className="relative group">
            
            {/* Left/Right Arrows (Decorative) */}
            <div className="hidden md:block absolute top-1/2 -left-4 lg:-left-12 -translate-y-1/2 z-10">
              <div className="w-12 h-12 bg-white rounded-full border border-border shadow-md flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/20 transition-colors cursor-pointer">
                <ChevronLeft size={24} />
              </div>
            </div>
            <div className="hidden md:block absolute top-1/2 -right-4 lg:-right-12 -translate-y-1/2 z-10">
              <div className="w-12 h-12 bg-white rounded-full border border-border shadow-md flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/20 transition-colors cursor-pointer">
                <ChevronRight size={24} />
              </div>
            </div>

            {/* Flexible Carousel Structure */}
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 md:mx-0 md:px-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {[
                { name: "Aarav Patel", text: "Dash Media helped us clean up our ad account, sharpen our messaging, and reduce cost per lead within the first quarter." },
                { name: "Sarah Jenkins", text: "Working with this team transformed our local reach. We're seeing consistent, high-quality traffic every single month." },
                { name: "Michael Chen", text: "The structured approach to our SEO and paid media finally gave us the predictable revenue growth we were looking for." },
                { name: "Emily Rodriguez", text: "They truly understand how to capture high-intent buyers. Our conversion rates have never been higher." }
              ].map((review, idx) => (
                <article key={idx} className="w-[85vw] sm:w-[350px] lg:w-[calc(33.333%-1rem)] flex-shrink-0 snap-center bg-white rounded-xl p-6 md:p-8 shadow-md border border-border flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
                  <p className="text-muted-foreground italic mb-8 leading-relaxed flex-grow text-[15px] md:text-base">
                    &quot;{review.text}&quot;
                  </p>
                  <div className="flex gap-1 text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} fill="currentColor" size={18} />
                    ))}
                  </div>
                  <p className="font-bold text-primary text-lg">{review.name}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        {/* set here may faq dynamic FAQ Heading (Sec 6) and FAQ Subheading (Sec 6) */}
        <FaqSection 
          heading={location.faqHeading} 
          subheading={location.faqSubheading} 
        />
      </section>
    </main>
  );
}