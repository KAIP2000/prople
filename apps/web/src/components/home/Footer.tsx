import Link from "next/link";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/solutions" },
      { label: "Pricing", href: "/pricing" },
      { label: "Security", href: "/resources" },
      { label: "Updates", href: "/resources" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/resources" },
      { label: "Careers", href: "/contact" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/resources" },
      { label: "Help Center", href: "/resources" },
      { label: "API", href: "/resources" },
      { label: "Status", href: "/resources" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#2c1f18] py-16 text-[#f6efe6]">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-[--color-brand] text-sm font-bold text-white">PR</span>
              <span className="font-display text-4xl font-bold tracking-tight text-white">Prople</span>
            </Link>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-slate-400">
              Real-time property intelligence and role-specific dashboards for owners, managers, accountants, and admins.
            </p>
            <div className="mt-6 flex gap-3">
              {["f", "x", "in", "ig"].map((social) => (
                <span key={social} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-sm font-semibold text-slate-100">
                  {social}
                </span>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-2xl font-bold text-white">{column.title}</h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-lg text-slate-200 transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-8 text-base text-slate-300">
          <p>© 2026 Prople. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/resources" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/resources" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
