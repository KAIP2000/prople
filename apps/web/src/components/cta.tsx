import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6 text-balance">
          Ready to simplify your portfolio?
        </h2>
        <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
          See how Prople helps you manage properties, tenants, and finances in one place.
        </p>
        <Link href="/contact">
          <Button
            size="lg"
            className="btn-interactive bg-black hover:bg-black/90 text-white font-semibold px-10 h-14 text-base rounded-xl"
          >
            Talk to Our Team
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
