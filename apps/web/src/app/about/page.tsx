import Link from "next/link"
import Header from "@/components/Header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Target, Eye, Heart, Shield, MapPin } from "lucide-react"

const values = [
  {
    icon: Target,
    title: "Simplicity first",
    description: "We strip away the unnecessary. Every feature earns its place by making your life easier, not more complicated.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "No hidden fees, no confusing jargon. What you see is what you get, from our pricing to our platform.",
  },
  {
    icon: Heart,
    title: "Customer obsessed",
    description: "We listen to our users. Our roadmap is shaped by real feedback from UK landlords and property managers.",
  },
  {
    icon: Shield,
    title: "Security at the core",
    description: "Your data is sensitive. We treat it that way, with encryption, UK data centres, and full GDPR compliance.",
  },
]

const team = [
  { name: "Eleanor Hayes", role: "Co-Founder & CEO", initials: "EH", bio: "Former property manager with 15 years in the UK rental sector." },
  { name: "Robert Langley", role: "Co-Founder & CTO", initials: "RL", bio: "Software engineer specialising in secure, scalable platforms." },
  { name: "Priya Sharma", role: "Head of Product", initials: "PS", bio: "Product leader focused on making complex tools feel simple." },
  { name: "Tom Richardson", role: "Head of Customer Success", initials: "TR", bio: "Dedicated to helping every user get the most from PropFolio." },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 border border-amber-200 px-4 py-1.5 mb-8">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">About Us</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight text-balance mb-6">
            We are building the future of{" "}
            <span className="text-amber-700">UK property management</span>
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            PropFolio was founded by people who understand the day-to-day reality of managing property in the UK. We built the tool we wished existed.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-6 text-balance">
                Our story
              </h2>
              <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
                <p>
                  PropFolio started in 2022 when two friends, a property manager and a software engineer, realised that most landlords were still running their portfolios on spreadsheets, paper folders, and memory.
                </p>
                <p>
                  They knew there had to be a better way. Something that worked the way UK landlords actually think, without the bloat of enterprise software or the limitations of generic tools.
                </p>
                <p>
                  Today, PropFolio serves thousands of property owners and managers across England, Scotland, Wales, and Northern Ireland. We are proud to be a UK-based company, building a platform that understands the nuances of British property law and practice.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Founded", value: "2022" },
                  { label: "Team size", value: "35+" },
                  { label: "Properties managed", value: "5,000+" },
                  { label: "UK coverage", value: "Nationwide" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 rounded-xl bg-muted">
                    <p className="text-3xl font-serif font-bold text-amber-700 mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-amber-700 uppercase tracking-wider mb-4">What we believe</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground text-balance">
              Our values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="card-interactive text-center rounded-2xl border border-border bg-card p-6">
                <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center mx-auto mb-5">
                  <value.icon className="w-7 h-7 text-amber-700" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-amber-700 uppercase tracking-wider mb-4">The team</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground text-balance">
              Meet the people behind PropFolio
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="card-interactive bg-card border border-border rounded-2xl p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{member.initials}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-1">{member.name}</h3>
                <p className="text-sm text-amber-700 font-semibold mb-3">{member.role}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <MapPin className="h-5 w-5 text-amber-700" />
            <span className="text-sm font-medium text-muted-foreground">Based in Manchester, serving the whole of the UK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-6 text-balance">
            Want to join our team?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            We are always looking for talented people who care about building great products. Check out our open positions or drop us a line.
          </p>
          <Link href="/contact">
            <Button size="lg" className="btn-interactive bg-black hover:bg-black/90 text-white font-semibold px-8 h-14 text-base rounded-xl">
              Get in Touch
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
