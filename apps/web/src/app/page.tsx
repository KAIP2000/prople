import Header from "@/components/Header";
import Benefits from "@/components/home/Benefits";
import { Footer } from "@/components/footer";
import FooterHero from "@/components/home/FooterHero";
import Hero from "@/components/home/Hero";
import WhyPropertyPortfolio from "@/components/home/WhyPropertyPortfolio";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import { FAQSection } from "@/components/home/FAQSection";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Benefits />
      <WhyPropertyPortfolio />
      <HowItWorksSection />
      <FAQSection />
      <FooterHero />
      <Footer />
    </main>
  );
}
