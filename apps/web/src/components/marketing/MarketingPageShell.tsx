import Header from "@/components/Header";
import { Footer } from "@/components/footer";
import FooterHero from "@/components/home/FooterHero";
import { ReactNode } from "react";

interface MarketingPageShellProps {
  badge: string;
  title: string;
  description: string;
  children: ReactNode;
}

const MarketingPageShell = ({ badge, title, description, children }: MarketingPageShellProps) => {
  return (
    <main>
      <Header />
      <section className="bg-[#f6efe6] py-20">
        <div className="container text-center">
          <span className="inline-flex rounded-full bg-[#f1e3d5] px-4 py-2 text-sm font-semibold text-[#8b5e3c]">{badge}</span>
          <h1 className="mx-auto mt-5 max-w-5xl font-display text-4xl font-bold tracking-tight text-[#2c1f18] sm:text-5xl md:text-7xl">{title}</h1>
          <p className="mx-auto mt-5 max-w-4xl text-lg leading-relaxed text-[#4f3523] sm:text-xl md:text-2xl">{description}</p>
        </div>
      </section>
      <section className="bg-[#f6efe6] py-16">{children}</section>
      <FooterHero />
      <Footer />
    </main>
  );
};

export default MarketingPageShell;
