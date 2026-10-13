import type { Metadata } from "next";
import { AboutSidebar } from "@/components/about/AboutSidebar";
import { FitSection } from "@/components/about/FitSection";
import { Receipts } from "@/components/about/Receipts";
import { SayHello } from "@/components/about/SayHello";
import { Story } from "@/components/about/Story";
import { WorkProcess } from "@/components/about/WorkProcess";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About — The Human Behind It",
  description:
    "MD. Sazzad Hossain Adib is an AI Engineer in Dhaka building production LLM systems and full-stack AI applications. The story, how he works, the receipts, and his education.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About Sazzad Hossain Adib", url: "/about", type: "profile" },
};

export default function AboutPage() {
  return (
    <>
      <main id="main" className="overflow-x-clip bg-surface text-ink">
        <div className="grid items-start lg:grid-cols-[minmax(340px,430px)_minmax(0,1fr)]">
          <AboutSidebar />
          <div className="min-w-0">
            <Story />
            <WorkProcess />
            <Receipts />
            <FitSection />
            <SayHello />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
