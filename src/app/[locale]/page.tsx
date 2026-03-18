import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { ProblemSolution } from "@/components/ProblemSolution";
import { Services } from "@/components/Services";
import { Comparison } from "@/components/Comparison";
import { About } from "@/components/About";
import { HowItWorks } from "@/components/HowItWorks";
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
      {/* <Testimonials /> */}
      <Acquisition />
      <Contact />
    </>
  );
}
