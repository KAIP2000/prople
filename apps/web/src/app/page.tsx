"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Building,
  CheckCircle2,
  FileCheck,
  FileText,
  Globe,
  LineChart,
  Lock,
  Menu,
  PieChart,
  PlayCircle,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wrench,
  X,
  Zap,
} from "lucide-react";

type FadeDirection = "up" | "down" | "left" | "right" | "none";

function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
  fullWidth = false,
}: {
  children: ReactNode;
  delay?: number;
  direction?: FadeDirection;
  className?: string;
  fullWidth?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-100px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const initialTransforms: Record<FadeDirection, string> = {
    up: "translate3d(0, 40px, 0)",
    down: "translate3d(0, -40px, 0)",
    left: "translate3d(40px, 0, 0)",
    right: "translate3d(-40px, 0, 0)",
    none: "translate3d(0, 0, 0)",
  };

  return (
    <div
      ref={ref}
      className={`${className} ${fullWidth ? "w-full" : ""}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0, 0, 0)" : initialTransforms[direction],
        transitionProperty: "opacity, transform",
        transitionDuration: "0.8s, 0.8s",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1), cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}s, ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Platform", href: "#platform" },
    { label: "Features", href: "#features" },
    { label: "AI Insights", href: "#ai-insights" },
    { label: "Pricing", href: "#pricing" },
    { label: "Resources", href: "/resources" },
  ];

  return (
    <div
      className="min-h-screen overflow-x-hidden bg-[#FAFAF9] text-stone-950 selection:bg-amber-200 selection:text-stone-900"
      style={{ fontFamily: '"Inter", "Geist", sans-serif' }}
    >
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? "border-b border-stone-200 bg-[#FAFAF9]/90 py-4 backdrop-blur-md" : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-12">
            <a href="#" className="flex items-center gap-2 text-2xl font-bold tracking-tighter text-stone-950">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-950">
                <span className="mb-0.5 text-lg leading-none text-white">P</span>
              </div>
              Prople
            </a>
            <div className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className="text-sm font-medium text-stone-600 transition-colors hover:text-stone-950">
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <a href="/sign-in" className="px-4 text-sm font-medium text-stone-600 transition-colors hover:text-stone-950">
              Sign In
            </a>
            <a
              href="/onboarding"
              className="rounded-full bg-stone-950 px-5 py-2.5 text-sm font-medium text-white transition-all hover:scale-105 hover:bg-stone-800 active:scale-95"
            >
              Get Early Access
            </a>
          </div>

          <button className="text-stone-950 md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle mobile menu">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen ? (
        <div className="fixed inset-0 z-40 bg-[#FAFAF9] px-6 pt-24 md:hidden">
          <div className="flex flex-col gap-6 text-xl font-medium tracking-tight">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="border-b border-stone-200 pb-4 text-stone-600 hover:text-stone-950">
                {item.label}
              </a>
            ))}
            <div className="mt-8 flex flex-col gap-4">
              <a href="/onboarding" className="rounded-full bg-stone-950 px-6 py-4 text-center text-white">
                Get Early Access
              </a>
              <a href="/sign-in" className="rounded-full bg-stone-200 px-6 py-4 text-center text-stone-950">
                Sign In
              </a>
            </div>
          </div>
        </div>
      ) : null}

      <section className="relative mx-auto grid min-h-[90vh] max-w-7xl grid-cols-1 items-center gap-16 px-6 pb-32 pt-40 xl:grid-cols-2 xl:gap-8">
        <div className="relative z-10 flex flex-col items-start gap-8">
          <FadeIn direction="up" delay={0.1}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700">
              <Sparkles className="h-4 w-4" /> The future of portfolio management
            </div>
            <h1 className="text-balance text-[4rem] leading-[0.95] font-medium tracking-tighter text-stone-950 sm:text-[5rem]">
              Property Management on <span className="text-amber-500">Autopilot</span>
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="max-w-lg text-balance text-xl leading-relaxed font-medium text-stone-500">
              Stop chasing paperwork and start scaling. Prople uses AI to manage tenants, finances, and maintenance, making property management feel effortless.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.3} className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <a
              href="/onboarding"
              className="flex items-center justify-center gap-2 rounded-full bg-stone-950 px-8 py-4 font-medium text-white transition-all hover:scale-105 hover:bg-stone-800"
            >
              Get Early Access <ArrowRight className="h-4 w-4" />
            </a>
            <button className="group flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-8 py-4 font-medium text-stone-950 transition-all hover:bg-stone-50">
              <PlayCircle className="h-5 w-5 text-stone-400 transition-colors group-hover:text-amber-500" /> Watch 60s Demo
            </button>
          </FadeIn>
        </div>

        <FadeIn direction="left" delay={0.4} className="relative h-[500px] w-full xl:h-[600px]">
          <div className="absolute inset-0 scale-105 rotate-3 rounded-[2.5rem] bg-gradient-to-tr from-amber-100/40 to-stone-200/40" />
          <div className="absolute inset-0 flex flex-col overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-2xl">
            <div className="flex h-12 items-center gap-2 border-b border-stone-100 bg-stone-50 px-4">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-stone-300" />
                <div className="h-3 w-3 rounded-full bg-stone-300" />
                <div className="h-3 w-3 rounded-full bg-stone-300" />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-4 bg-[#FAFAF9] p-6">
              <div className="flex gap-4">
                <div className="flex h-24 w-1/3 flex-col justify-between rounded-xl border border-stone-100 bg-white p-4 shadow-sm">
                  <span className="text-xs font-medium text-stone-400">Monthly Income</span>
                  <span className="text-2xl font-bold tracking-tight">£14,250</span>
                </div>
                <div className="flex h-24 w-1/3 flex-col justify-between rounded-xl border border-stone-100 bg-white p-4 shadow-sm">
                  <span className="text-xs font-medium text-stone-400">Occupancy</span>
                  <span className="text-2xl font-bold tracking-tight">98%</span>
                </div>
                <div className="flex h-24 w-1/3 flex-col justify-between rounded-xl border border-stone-100 bg-white p-4 shadow-sm">
                  <span className="text-xs font-medium text-stone-400">Open Tasks</span>
                  <span className="text-2xl font-bold tracking-tight text-amber-500">3</span>
                </div>
              </div>
              <div className="flex-1 rounded-xl border border-stone-100 bg-white p-4 shadow-sm">
                <div className="mb-4 h-8 w-full rounded bg-stone-50" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-full rounded bg-stone-50" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <FadeIn
            direction="up"
            delay={1}
            className="absolute top-1/4 z-20 max-w-xs rounded-2xl border border-stone-100 bg-white p-5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] md:-left-12 md:max-w-sm"
          >
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-amber-100 p-3 text-amber-600">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h4 className="mb-1 text-sm font-bold text-stone-900">AI Insight</h4>
                <p className="text-sm leading-relaxed font-medium text-stone-500">
                  Rent increase opportunity detected: <span className="rounded bg-emerald-50 px-1 font-bold text-emerald-600">+£120/month</span> based on recent local market trends.
                </p>
              </div>
            </div>
          </FadeIn>
        </FadeIn>
      </section>

      <section className="border-y border-stone-200 bg-white py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 md:flex-row">
          <p className="text-sm font-semibold tracking-widest text-stone-400 uppercase">Built for modern landlords and property managers</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <div className="flex items-center gap-2 font-medium text-stone-600">
              <ShieldCheck className="h-5 w-5 text-stone-400" /> UK Compliant
            </div>
            <div className="flex items-center gap-2 font-medium text-stone-600">
              <Lock className="h-5 w-5 text-stone-400" /> GDPR Secure
            </div>
            <div className="flex items-center gap-2 font-medium text-stone-600">
              <Building className="h-5 w-5 text-stone-400" /> Portfolio Ready
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl overflow-hidden px-6 py-32">
        <FadeIn>
          <h2 className="mb-20 max-w-2xl text-[3rem] leading-tight font-medium tracking-tighter">Why Property Management Feels Like a 24/7 Job</h2>
        </FadeIn>

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          <FadeIn delay={0.1} className="flex lg:col-span-5" fullWidth>
            <div className="flex w-full flex-col justify-center rounded-[2.5rem] bg-stone-100 p-12">
              <h3 className="mb-8 text-sm font-bold tracking-widest text-stone-400 uppercase">The Old Way</h3>
              <ul className="space-y-6">
                {[
                  "Manual paperwork and scattered PDFs",
                  "Endless email chains with tenants",
                  "Tenant referencing delays",
                  "Reactive maintenance emergencies",
                  "Multiple disconnected tools",
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-4 text-lg font-medium text-stone-500">
                    <X className="h-6 w-6 shrink-0 text-stone-300" /> {text}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="flex lg:col-span-7" fullWidth>
            <div className="relative flex w-full flex-col justify-center overflow-hidden rounded-[2.5rem] bg-stone-950 p-12 text-white shadow-2xl lg:-translate-y-12">
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-amber-500/20 blur-[100px]" />
              <h3 className="mb-8 flex items-center gap-2 text-sm font-bold tracking-widest text-amber-500 uppercase">
                <Sparkles className="h-4 w-4" /> The Prople Way
              </h3>
              <ul className="relative z-10 space-y-6">
                {[
                  "AI tenant vetting & financial stability analysis",
                  "Automated lease management & adaptation",
                  "Predictive maintenance alerts before things break",
                  "Portfolio analytics centralized in one dashboard",
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-4 text-xl font-medium text-stone-200">
                    <CheckCircle2 className="h-6 w-6 shrink-0 text-amber-500" /> {text}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="platform" className="border-t border-stone-100 bg-white px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <FadeIn className="mb-24 max-w-2xl">
            <h2 className="mb-6 text-[3rem] leading-tight font-medium tracking-tighter">Everything You Need to Run Your Portfolio</h2>
            <p className="text-xl font-medium text-stone-500">
              Prople brings together property management, financial tracking, and AI insights seamlessly into one unified experience.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <FadeIn delay={0.1}>
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100">
                <Building className="h-6 w-6 text-stone-950" />
              </div>
              <h3 className="mb-4 text-2xl font-semibold tracking-tight">Property Management</h3>
              <p className="leading-relaxed font-medium text-stone-500">
                Organise properties, units and ownership structures. Track occupancy and overall performance in one place without touching a spreadsheet.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100">
                <Users className="h-6 w-6 text-stone-950" />
              </div>
              <h3 className="mb-4 text-2xl font-semibold tracking-tight">Tenant & Lease</h3>
              <p className="leading-relaxed font-medium text-stone-500">
                Manage tenants, deposits and renewals effortlessly. Automated reminders ensure that no expiring lease or missing document is ever missed.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100">
                <LineChart className="h-6 w-6 text-stone-950" />
              </div>
              <h3 className="mb-4 text-2xl font-semibold tracking-tight">Financial Tracking</h3>
              <p className="leading-relaxed font-medium text-stone-500">
                Track rent payments, expenses, and profitability across your entire portfolio with bank-grade reconciliation and clarity.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="ai-insights" className="relative overflow-hidden bg-stone-950 px-6 py-32 text-white">
        <div className="absolute top-[-20%] right-[-10%] h-[50%] w-[50%] rounded-full bg-amber-600/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[40%] w-[40%] rounded-full bg-stone-800/50 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <FadeIn className="mb-24 max-w-2xl">
            <h2 className="mb-6 flex items-center gap-2 text-sm font-bold tracking-widest text-amber-500 uppercase">
              <Zap className="h-4 w-4" /> Core Differentiator
            </h2>
            <h3 className="mb-6 text-[3.5rem] leading-tight font-medium tracking-tighter">Data That Talks Back to You</h3>
            <p className="text-xl font-medium text-stone-400">
              Prople doesn&apos;t just store information, it analyzes your portfolio and surfaces critical insights automatically, acting as your digital portfolio manager.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Rent Optimisation",
                desc: "AI analyzes macro and local data to suggest real-time rent adjustments based on market trends.",
                icon: TrendingUp,
              },
              {
                title: "Maintenance Prediction",
                desc: "Detects patterns to warn you of maintenance issues before they become expensive emergencies.",
                icon: AlertTriangle,
              },
              {
                title: "Portfolio Health Score",
                desc: "Every property receives a live performance score helping identify underperforming assets quickly.",
                icon: PieChart,
              },
              {
                title: "Automated Reports",
                desc: "Generate professional investor-grade portfolio reports instantly with zero manual compilation.",
                icon: FileText,
              },
            ].map((feature, i) => (
              <FadeIn key={i} delay={0.1 * i} className="rounded-[2rem] border border-stone-800 bg-stone-900/50 p-8 transition-colors hover:bg-stone-900">
                <feature.icon className="mb-6 h-8 w-8 text-amber-500" />
                <h4 className="mb-3 text-xl font-semibold tracking-tight text-white">{feature.title}</h4>
                <p className="leading-relaxed font-medium text-stone-400">{feature.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-32">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <FadeIn delay={0.1} className="group rounded-[2.5rem] border border-stone-200 bg-white p-10 shadow-xl shadow-stone-200/20 transition-transform duration-300 hover:-translate-y-2">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 transition-transform group-hover:scale-110">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="mb-4 text-2xl font-semibold tracking-tight">AI-Powered Tenant Vetting</h3>
            <p className="mb-8 leading-relaxed font-medium text-stone-500">
              Upload documents and let our Tenant Risk Indicator analyze financial stability and predict tenant reliability automatically.
            </p>
            <div className="mt-auto flex items-center gap-2 text-sm font-bold tracking-widest text-stone-950 uppercase">
              Learn More <ArrowRight className="h-4 w-4" />
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="group rounded-[2.5rem] border border-stone-200 bg-white p-10 shadow-xl shadow-stone-200/20 transition-transform duration-300 hover:-translate-y-2">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 transition-transform group-hover:scale-110">
              <Wrench className="h-6 w-6" />
            </div>
            <h3 className="mb-4 text-2xl font-semibold tracking-tight">Smart Maintenance Triage</h3>
            <p className="mb-8 leading-relaxed font-medium text-stone-500">
              AI communicates directly with tenants to diagnose the real issue before you spend money calling expensive contractors.
            </p>
            <div className="mt-auto flex items-center gap-2 text-sm font-bold tracking-widest text-stone-950 uppercase">
              Learn More <ArrowRight className="h-4 w-4" />
            </div>
          </FadeIn>

          <FadeIn delay={0.3} className="group rounded-[2.5rem] border border-stone-200 bg-white p-10 shadow-xl shadow-stone-200/20 transition-transform duration-300 hover:-translate-y-2">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 transition-transform group-hover:scale-110">
              <FileCheck className="h-6 w-6" />
            </div>
            <h3 className="mb-4 text-2xl font-semibold tracking-tight">Dynamic Legal Compliance</h3>
            <p className="mb-8 leading-relaxed font-medium text-stone-500">
              Utilizing Document AI, leases automatically adapt to changing UK regulatory requirements, extracting core info instantly.
            </p>
            <div className="mt-auto flex items-center gap-2 text-sm font-bold tracking-widest text-stone-950 uppercase">
              Learn More <ArrowRight className="h-4 w-4" />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-stone-100 px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <FadeIn className="mx-auto mb-24 max-w-3xl text-center">
            <h2 className="text-[3rem] font-medium tracking-tighter">Set Up Your Portfolio in Minutes</h2>
          </FadeIn>

          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="absolute top-12 left-[10%] right-[10%] z-0 hidden h-0.5 bg-stone-300 md:block" />
            {[
              { step: "01", title: "Add your properties", desc: "Import properties manually or integrate via CSV in seconds." },
              {
                step: "02",
                title: "Connect tenants & leases",
                desc: "Upload documents; our AI automatically extracts the critical terms.",
              },
              { step: "03", title: "Track finances", desc: "Link accounts to monitor rent and maintenance expenses live." },
              {
                step: "04",
                title: "Receive AI insights",
                desc: "Sit back as Prople actively monitors and optimizes your portfolio.",
              },
            ].map((s, i) => (
              <FadeIn key={i} delay={0.1 * i} className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-8 flex h-24 w-24 rotate-3 transform items-center justify-center rounded-[2rem] border border-stone-200 bg-white text-2xl font-bold shadow-xl transition-transform hover:rotate-0">
                  {s.step}
                </div>
                <h4 className="mb-3 text-xl font-semibold tracking-tight">{s.title}</h4>
                <p className="px-4 font-medium text-stone-500">{s.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[90rem] overflow-hidden px-6 py-32">
        <FadeIn className="mx-auto mb-20 max-w-3xl text-center">
          <h2 className="text-[3.5rem] leading-tight font-medium tracking-tighter">See Your Entire Portfolio in One View</h2>
        </FadeIn>

        <FadeIn
          delay={0.2}
          className="relative w-full overflow-hidden rounded-[2.5rem] border border-stone-200 bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)]"
        >
          <div className="flex h-16 items-center justify-between border-b border-stone-200 bg-[#FAFAF9] px-6">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <div className="h-3.5 w-3.5 rounded-full bg-red-400" />
                <div className="h-3.5 w-3.5 rounded-full bg-amber-400" />
                <div className="h-3.5 w-3.5 rounded-full bg-emerald-400" />
              </div>
              <div className="h-4 w-px bg-stone-300" />
              <div className="flex items-center gap-2 text-sm font-semibold text-stone-500">
                <Building className="h-4 w-4" /> Portfolio Overview
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-200">
                <Search className="h-4 w-4 text-stone-500" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-950 text-xs font-bold text-white">JD</div>
            </div>
          </div>

          <div className="flex min-h-[700px] flex-col lg:flex-row">
            <div className="flex-1 space-y-8 border-r border-stone-200 bg-[#FAFAF9] p-8">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {[
                  { label: "Portfolio Value", val: "£2.4M", trend: "+4.2%" },
                  { label: "Monthly Income", val: "£14,200", trend: "+2.1%" },
                  { label: "Occupancy Rate", val: "98%", trend: "Stable" },
                  { label: "Net Yield", val: "5.8%", trend: "-0.2%" },
                ].map((card, i) => (
                  <div key={i} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                    <p className="mb-2 text-xs font-bold tracking-wider text-stone-400 uppercase">{card.label}</p>
                    <div className="flex items-end justify-between">
                      <p className="text-2xl font-bold tracking-tight text-stone-950">{card.val}</p>
                      <span
                        className={`text-xs font-bold ${
                          card.trend.includes("+") ? "text-emerald-500" : card.trend.includes("-") ? "text-red-500" : "text-stone-400"
                        }`}
                      >
                        {card.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="group relative overflow-hidden rounded-3xl border-2 border-amber-200 bg-white p-6 shadow-sm transition-colors hover:border-amber-400">
                <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-amber-500" />
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-amber-100 p-2 text-amber-600">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight">Ask Prople AI</h3>
                </div>

                <div className="mb-4 flex items-center gap-3 rounded-xl border border-stone-200 bg-stone-50 p-3">
                  <Search className="ml-2 h-5 w-5 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Ask anything about your portfolio..."
                    className="flex-1 border-none bg-transparent font-medium text-stone-900 outline-none placeholder:text-stone-400"
                    readOnly
                    value="Which property performs worst?"
                  />
                  <button className="rounded-lg bg-amber-500 p-2.5 text-white transition-colors hover:bg-amber-600">
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="custom-scrollbar flex gap-2 overflow-x-auto pb-2">
                  {["How can I increase my rental income?", "Which leases expire this year?", "Show maintenance risks"].map((q, i) => (
                    <span
                      key={i}
                      className="cursor-pointer whitespace-nowrap rounded-full bg-stone-100 px-4 py-2 text-xs font-medium text-stone-600 transition-colors hover:bg-stone-200"
                    >
                      {q}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid h-64 grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="flex flex-col rounded-3xl border border-stone-200 bg-white p-6 shadow-sm lg:col-span-2">
                  <h4 className="mb-6 text-sm font-bold tracking-widest text-stone-400 uppercase">Monthly Revenue</h4>
                  <div className="flex h-full w-full flex-1 items-end gap-3 pb-2">
                    {[40, 55, 45, 70, 65, 80, 75, 90, 85, 100, 95, 110].map((h, i) => (
                      <div
                        key={i}
                        className="group relative flex-1 rounded-t-sm bg-amber-500/20 transition-colors hover:bg-amber-500"
                        style={{ height: `${h}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-stone-900 px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                          £{h}00
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
                  <h4 className="mb-6 flex justify-between text-sm font-bold tracking-widest text-stone-400 uppercase">
                    Top Properties <ArrowRight className="h-4 w-4" />
                  </h4>
                  <div className="flex-1 space-y-4 overflow-hidden">
                    {[
                      { name: "142 Victoria Road", yield: "6.2%", status: "Good" },
                      { name: "Apt 4, The Vertex", yield: "5.1%", status: "Warning" },
                      { name: "78 Mill Street", yield: "7.4%", status: "Good" },
                    ].map((p, i) => (
                      <div key={i} className="flex items-center justify-between border-b border-stone-100 pb-3 last:border-0">
                        <div>
                          <p className="max-w-[120px] truncate text-sm font-bold text-stone-950">{p.name}</p>
                          <p className="text-xs font-medium text-stone-500">Yield: {p.yield}</p>
                        </div>
                        <div className={`h-2 w-2 rounded-full ${p.status === "Good" ? "bg-emerald-500" : "bg-amber-500"}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col gap-8 bg-stone-50 p-8 lg:w-80">
              <div>
                <h4 className="mb-4 flex items-center gap-2 text-sm font-bold tracking-widest text-stone-400 uppercase">
                  <Bell className="h-4 w-4" /> Active Insights
                </h4>
                <div className="space-y-4">
                  <div className="rounded-xl border border-amber-200 bg-white p-4 shadow-sm">
                    <div className="mb-2 flex items-center gap-2 text-amber-600">
                      <TrendingUp className="h-4 w-4" /> <span className="text-xs font-bold tracking-wider uppercase">Rent Increase</span>
                    </div>
                    <p className="text-sm font-medium text-stone-600">+£120/mo opportunity detected at 142 Victoria Road.</p>
                  </div>
                  <div className="rounded-xl border border-red-200 bg-white p-4 shadow-sm">
                    <div className="mb-2 flex items-center gap-2 text-red-600">
                      <AlertTriangle className="h-4 w-4" /> <span className="text-xs font-bold tracking-wider uppercase">Maintenance Risk</span>
                    </div>
                    <p className="text-sm font-medium text-stone-600">Boiler failure probability high at Apt 4, The Vertex.</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-4 text-sm font-bold tracking-widest text-stone-400 uppercase">Recent Activity</h4>
                <div className="relative space-y-6 pl-4 before:absolute before:inset-y-0 before:left-[7px] before:w-px before:bg-stone-200">
                  {[
                    { title: "Payment Received", time: "2h ago", text: "£1,450 from Sarah Jenkins" },
                    { title: "Maintenance Request", time: "5h ago", text: "Leaking tap reported at 78 Mill St." },
                    { title: "Lease Renewal", time: "1d ago", text: "Automated renewal sent for Apt 4." },
                  ].map((act, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[20px] top-1.5 h-3 w-3 rounded-full border-2 border-stone-300 bg-white" />
                      <p className="text-sm font-bold text-stone-900">{act.title}</p>
                      <p className="text-xs font-medium text-stone-500">{act.text}</p>
                      <p className="mt-1 text-[10px] font-bold tracking-wider text-stone-400 uppercase">{act.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="bg-stone-950 px-6 py-32 text-white">
        <div className="mx-auto max-w-7xl">
          <FadeIn className="mb-24 text-center">
            <h2 className="text-[3rem] font-medium tracking-tighter">Designed for Modern Landlords</h2>
          </FadeIn>

          <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
            <FadeIn delay={0.1} className="flex flex-col items-center text-center">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-stone-800 bg-stone-900">
                <Sparkles className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="mb-4 text-2xl font-semibold tracking-tight">Simple by Design</h3>
              <p className="font-medium text-stone-400">A clean, intuitive interface that removes the bloat typical of legacy property software.</p>
            </FadeIn>

            <FadeIn delay={0.2} className="flex flex-col items-center text-center">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-stone-800 bg-stone-900">
                <Globe className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="mb-4 text-2xl font-semibold tracking-tight">Built for the UK Market</h3>
              <p className="font-medium text-stone-400">Compliance, local regulations, and tax nuances built natively into the platform&apos;s DNA.</p>
            </FadeIn>

            <FadeIn delay={0.3} className="flex flex-col items-center text-center">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-stone-800 bg-stone-900">
                <BarChart3 className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="mb-4 text-2xl font-semibold tracking-tight">Save Hours Every Week</h3>
              <p className="font-medium text-stone-400">Intelligent automation removes repetitive admin work, freeing you to focus on growth.</p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="pricing" className="border-y border-amber-600 bg-amber-500 px-6 py-32 text-center text-stone-950">
        <FadeIn className="mx-auto max-w-3xl">
          <h2 className="text-balance mb-6 text-[3rem] font-medium tracking-tighter">Built for the Next Generation of Landlords</h2>
          <p className="text-balance mb-12 text-xl leading-relaxed font-medium text-stone-900/80">
            Prople is currently in an invite-only phase, working with a select group of visionary property investors to redefine property management.
          </p>
          <a
            href="/onboarding"
            className="inline-block rounded-full bg-stone-950 px-10 py-5 text-lg font-bold tracking-wide text-white shadow-2xl transition-all hover:scale-105 hover:bg-stone-800"
          >
            Join the Waitlist
          </a>
        </FadeIn>
      </section>

      <section className="relative overflow-hidden bg-[#FAFAF9] px-6 py-40 text-center">
        <div className="absolute top-1/2 left-1/2 z-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-100/50 blur-[120px]" />
        <FadeIn className="relative z-10 mx-auto flex max-w-4xl flex-col items-center">
          <h2 className="text-balance mb-8 text-[4rem] leading-[0.95] font-medium tracking-tighter md:text-[5rem]">
            Start Managing Your Portfolio the <span className="text-amber-500">Smart Way</span>
          </h2>
          <p className="text-balance mb-12 text-2xl font-medium text-stone-500">
            Join the forward-thinking landlords already preparing for the AI-driven future of property management.
          </p>
          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <a
              href="/onboarding"
              className="rounded-full bg-stone-950 px-10 py-5 text-lg font-bold text-white transition-transform hover:scale-105 hover:bg-stone-800"
            >
              Get Early Access
            </a>
            <a href="/contact" className="rounded-full border-2 border-stone-200 bg-white px-10 py-5 text-lg font-bold text-stone-950 transition-colors hover:bg-stone-50">
              Book a Demo
            </a>
          </div>
        </FadeIn>
      </section>

      <footer className="border-t border-stone-900 bg-stone-950 px-6 py-20 text-stone-400">
        <div className="mx-auto mb-16 grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <a href="#" className="mb-6 flex items-center gap-2 text-2xl font-bold tracking-tighter text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500">
                <span className="mb-0.5 text-lg leading-none text-stone-950">P</span>
              </div>
              Prople
            </a>
            <p className="mb-6 max-w-sm font-medium text-stone-500">
              The AI-driven property portfolio management platform. Run your portfolio with less effort and smarter decisions.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-xs font-bold tracking-widest text-white uppercase">Product</h4>
            <ul className="space-y-4 font-medium">
              <li>
                <a href="#platform" className="transition-colors hover:text-amber-500">
                  Platform
                </a>
              </li>
              <li>
                <a href="#features" className="transition-colors hover:text-amber-500">
                  Features
                </a>
              </li>
              <li>
                <a href="#ai-insights" className="transition-colors hover:text-amber-500">
                  AI Insights
                </a>
              </li>
              <li>
                <a href="#pricing" className="transition-colors hover:text-amber-500">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-xs font-bold tracking-widest text-white uppercase">Resources</h4>
            <ul className="space-y-4 font-medium">
              <li>
                <a href="/resources" className="transition-colors hover:text-amber-500">
                  Blog
                </a>
              </li>
              <li>
                <a href="/resources" className="transition-colors hover:text-amber-500">
                  Guides
                </a>
              </li>
              <li>
                <a href="/contact" className="transition-colors hover:text-amber-500">
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-xs font-bold tracking-widest text-white uppercase">Company</h4>
            <ul className="space-y-4 font-medium">
              <li>
                <a href="/about" className="transition-colors hover:text-amber-500">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="transition-colors hover:text-amber-500">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-amber-500">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-amber-500">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-stone-800/50 pt-8 md:flex-row">
          <p className="text-sm font-medium">© 2026 Prople. All rights reserved.</p>
          <div className="flex gap-6 text-sm font-medium">
            <a href="#" className="transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
