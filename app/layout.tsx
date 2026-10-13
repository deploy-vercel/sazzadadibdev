import type { Metadata, Viewport } from "next";
import { Manrope, Noto_Sans_Bengali, Syne } from "next/font/google";
import { Providers } from "@/components/layout/Providers";
import { PageTransition } from "@/components/layout/PageTransition";
import { site } from "@/data/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--ff-manrope",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--ff-syne",
  display: "swap",
});

// Only fetched when Bangla glyphs actually appear on the page (unicode-range).
const bengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--ff-bengali",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.fullName, url: site.links.github }],
  creator: site.fullName,
  keywords: [
    "Sazzad Hossain Adib",
    "MD. Sazzad Hossain Adib",
    "AI Engineer",
    "Full-Stack Developer",
    "Machine Learning",
    "LLM",
    "RAG",
    "Next.js",
    "PyTorch",
    "AI engineer Bangladesh",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f4f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "light dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.fullName,
  alternateName: site.name,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
  sameAs: [site.links.github, site.links.linkedin],
  alumniOf: { "@type": "CollegeOrUniversity", name: "North South University" },
  knowsAbout: ["Python", "PyTorch", "LLMs", "RAG", "LangChain", "TypeScript", "Next.js", "PostgreSQL"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${manrope.variable} ${syne.variable} ${bengali.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only z-[300] rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-surface focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <Providers>
          <PageTransition>{children}</PageTransition>
        </Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  );
}
