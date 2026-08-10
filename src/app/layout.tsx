import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css"
import { cn } from "@/lib/utils";
import Providers from "@/components/Provider";
import { Toaster } from "sonner";
<<<<<<< HEAD
import Script from "next/script"; // 👈 Import the Next.js Script component
=======

>>>>>>> 1f3e878 (change content)

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Dash Media Solutions",
  description: "Results-Driven Digital Marketing That Grows Your Business",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  // ✅ iOS Specific behavior
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DMS",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
<<<<<<< HEAD
        {/* Google Analytics Scripts */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WPGVVH2EQ3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`     
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WPGVVH2EQ3');
          `}
        </Script>

=======
>>>>>>> 1f3e878 (change content)
        <Providers>
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}