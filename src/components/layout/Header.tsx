'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react';
import {
    Bars3Icon,
    XMarkIcon,
    ChartPieIcon,
    ComputerDesktopIcon,
    PencilSquareIcon,
    ShareIcon,
    PlayCircleIcon,
    MegaphoneIcon,
    DevicePhoneMobileIcon,
    EnvelopeIcon,
    MagnifyingGlassIcon,
    CursorArrowRaysIcon,
} from '@heroicons/react/24/outline';
import { PhoneCall } from 'lucide-react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useModal } from "@/components/providers/ModalProvider";

// ... (Keep 'services' array exactly as it is) ...
const services = [
    { name: 'Search Engine Optimization (SEO)', description: 'Boost your visibility on search engines', href: '/services/seo', icon: ChartPieIcon },
    { name: 'Web Design', description: 'Creative and responsive websites for your brand', href: '/services/web-design', icon: ComputerDesktopIcon },
    { name: 'Content Marketing', description: 'Engaging content that tells your brand’s story', href: '/services/content-marketing', icon: PencilSquareIcon },
    { name: 'Social Media Marketing', description: 'Build and engage your community across platforms', href: '/services/social-media-marketing', icon: ShareIcon },
    { name: 'Video Marketing', description: 'Compelling video content that captures attention', href: '/services/video-marketing', icon: PlayCircleIcon },
    { name: 'Native Advertising', description: 'Ads that blend seamlessly with platform content', href: '/services/native-advertising', icon: MegaphoneIcon },
    { name: 'App Development', description: 'Custom mobile apps for iOS and Android', href: '/services/app-development', icon: DevicePhoneMobileIcon },
    { name: 'Email Marketing', description: 'Nurture leads and retain loyal customers', href: '/services/email-marketing', icon: EnvelopeIcon },
    { name: 'Search Engine Marketing (SEM)', description: 'Drive targeted traffic with paid search campaigns', href: '/services/sem', icon: MagnifyingGlassIcon },
    { name: 'Pay Per Click (PPC)', description: 'Instant visibility and measurable ROI with PPC ads', href: '/services/pay-per-click', icon: CursorArrowRaysIcon },
];

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // State for visual changes
    const [scrolled, setScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const { openModal } = useModal();
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Refs for scroll tracking
    const lastScrollY = useRef(0);
    const scrollTimer = useRef<NodeJS.Timeout | null>(null); // 👈 New Timer Ref

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // 1. CLEAR EXISTING TIMER
            // If the user is currently scrolling, cancel the "show navbar" timer
            if (scrollTimer.current) {
                clearTimeout(scrollTimer.current);
            }

            // 2. DETERMINE SCROLL DIRECTION (Hide/Show while moving)
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                // Scrolling DOWN -> Hide
                setIsVisible(false);
            } else {
                // Scrolling UP -> Show
                setIsVisible(true);
            }

            // 3. SET BACKGROUND STYLE
            setScrolled(currentScrollY > 10);

            // 4. SET NEW TIMER (Detect Stop)
            // If no scroll event happens for 250ms, assume they stopped and show navbar.
            scrollTimer.current = setTimeout(() => {
                setIsVisible(true);
            }, 250);

            // Update tracker
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimer.current) clearTimeout(scrollTimer.current); // Cleanup
        };
    }, []);

    return (
        <header className={cn(
            'fixed top-0 z-50 w-full transition-all duration-300 py-2',
            isVisible ? 'translate-y-0' : '-translate-y-full',
            scrolled
                ? 'bg-white border-b'
                : 'bg-blue-50 border-none'
        )}>

            <nav aria-label="Global" className=" flex items-center justify-between lg:px-10 ">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5 flex items-center space-x-2">
                        <span className="sr-only">Dash Media Solutions</span>
                        <Image
                            src="/DashMediaLogo.png"
                            alt="Dash Media Solutions Logo"
                            width={200}
                            height={30}
                            priority
                            fetchPriority="high"
                            className="h-15 w-auto object-contain"
                        />
                    </Link>
                </div>

                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-0 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>

                <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                    <Link href="/" className="text-base font-semibold leading-6 text-primary hover:underline underline-offset-4">
                        Home
                    </Link>
                    <Link href="/about" className="text-base font-semibold leading-6 text-primary hover:underline underline-offset-4">
                        About Us
                    </Link>

                    <Popover className="relative">
                        {({ open, close }) => (
                            <div
                                onMouseLeave={() => open && close()}
                                className="relative"
                            >
                                <PopoverButton
                                    ref={buttonRef}
                                    onMouseEnter={() => !open && buttonRef.current?.click()}
                                    className={cn(
                                        "group flex items-center gap-x-1 text-base font-semibold leading-6 text-primary outline-none",
                                        "pb-4 -mb-4"
                                    )}
                                >
                                    Services
                                    <ChevronDownIcon
                                        aria-hidden="true"
                                        className="h-5 w-5 flex-none text-muted-foreground transition-transform duration-200 group-data-[open]:rotate-180"
                                    />
                                </PopoverButton>

                                <PopoverPanel
                                    transition
                                    className="absolute left-1/2 z-10 mt-0 pt-3 w-screen max-w-[950px] -translate-x-1/2 transform transition data-[closed]:translate-y-2 data-[closed]:opacity-0 data-[enter]:duration-200 data-[enter]:ease-out data-[leave]:duration-150 data-[leave]:ease-in"
                                >
                                    <div className="overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5 border border-gray-100">
                                        <div className="grid grid-cols-12">

                                            {/* --- Left Sidebar: Feature/Overview --- */}
                                            <div className="col-span-4 bg-blue-50/50 p-8 border-r border-gray-100 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="text-xl font-bold text-primary tracking-tight">Expert Solutions</h3>
                                                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                                                        Data-driven marketing strategies tailored to scale your business growth and digital presence.
                                                    </p>
                                                </div>

                                                <div className="mt-10 rounded-2xl bg-none">
                                                    <p className="text-sm font-semibold text-primary">Ready to transform your brand?</p>
                                                    <Button
                                                        variant="link"
                                                        onClick={() => { close(); openModal(); }}
                                                        className="p-0 h-auto text-accent mt-2 hover:no-underline group"
                                                    >
                                                        Schedule a Consultation <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* --- Right Section: Services Grid --- */}
                                            <div className="col-span-8 p-6 bg-white">
                                                <div className="grid grid-cols-2 gap-2">
                                                    {services.map((item) => (
                                                        <div key={item.name} className="group relative flex items-start gap-x-4 rounded-xl p-3 transition-all hover:bg-blue-50/50">
                                                            <div className="flex h-10 w-10 flex-none items-center justify-center bg-none">
                                                                <item.icon
                                                                    aria-hidden="true"
                                                                    className="h-5 w-5 text-primary/70 transition-colors group-hover:text-accent"
                                                                />
                                                            </div>
                                                            <div>
                                                                <PopoverButton
                                                                    as={Link}
                                                                    href={item.href}
                                                                    className="block text-sm font-bold text-primary"
                                                                >
                                                                    {item.name}
                                                                    <span className="absolute inset-0" />
                                                                </PopoverButton>
                                                                <p className="mt-0.5 text-[12px] leading-snug text-muted-foreground line-clamp-1">
                                                                    {item.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* --- Bottom Footer within Dropdown --- */}
                                                <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between px-2">
                                                    <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                                                        Performance-Driven Results
                                                    </span>
                                                    <Link
                                                        href="/blog"
                                                        className="text-xs font-bold text-primary hover:text-accent transition-colors"
                                                        onClick={() => close()}
                                                    >
                                                        View Case Studies
                                                    </Link>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </PopoverPanel>
                            </div>
                        )}
                    </Popover>

                    <Link href="/blog" className="text-base font-semibold leading-6 text-primary hover:underline underline-offset-4">
                        Blog
                    </Link>
                </PopoverGroup>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Button onClick={openModal} className='rounded-full'>
                        Get In Touch
                    </Button>
                </div>
            </nav>

            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-50 p-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Dash Media Solutions</span>
                            <Image
                                src="/DashMediaLogo.png"
                                alt="Dash Media Solutions Logo"
                                width={150}
                                height={32}
                            />
                        </Link>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-primary"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Link
                                    href="/"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-sans font-semibold leading-7 text-primary hover:underline underline-offset-4"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/about"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-primary hover:underline underline-offset-4"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    About Us
                                </Link>
                                <Disclosure as="div" className="-mx-3">
                                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-primary hover:underline underline-offset-4">
                                        Services
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="h-5 w-5 flex-none transition-transform duration-200 group-data-[open]:rotate-180"
                                        />
                                    </DisclosureButton>
                                    <DisclosurePanel className="mt-2 space-y-2">
                                        {services.map((item) => (
                                            <DisclosureButton
                                                key={item.name}
                                                as={Link}
                                                href={item.href}
                                                className="block rounded-lg py-1 pl-6 pr-3 text-sm font-semibold leading-7 text-accent hover:underline underline-offset-4"
                                            >
                                                {item.name}
                                            </DisclosureButton>
                                        ))}
                                    </DisclosurePanel>
                                </Disclosure>
                                <Link
                                    href="/blog"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-primary hover:underline underline-offset-4"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Blog
                                </Link>
                            </div>
                            <div className="py-6">
                                <Button onClick={openModal} className='rounded-full'>
                                    Get In Touch
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
}
