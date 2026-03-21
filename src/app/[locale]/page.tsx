import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { ProblemSolution } from "@/components/ProblemSolution";
import { Services } from "@/components/Services";
import { Comparison } from "@/components/Comparison";
import { About } from "@/components/About";
import { HowItWorks } from "@/components/HowItWorks";
import { Faq } from "@/components/Faq";
// import { Testimonials } from "@/components/Testimonials";
import { Acquisition } from "@/components/Acquisition";
import { Contact } from "@/components/Contact";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ProblemSolution />
      <Services />
      <Comparison />
      <About />
      <HowItWorks />
      <Faq />
      {/* <Testimonials /> */}
      <Acquisition />
      <Suspense
        fallback={
          <section id="contact" className="bg-white py-20 lg:py-28" aria-hidden>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />
            </div>
          </section>
        }
      >
        <Contact />
      </Suspense>
    </>
  );
}
