"use client";

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

const solutions = [
  { name: "Portfolios", href: "/solutions#property-management" },
  { name: "Payments & Rent", href: "/solutions#rent-collection" },
  { name: "Maintenance", href: "/solutions#maintenance" },
  { name: "Accounting", href: "/solutions#accounting" },
];

const navItems = [
  { name: "Resources", href: "/resources" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const navLinkClass = "text-[15px] font-semibold text-[#4f3523] transition hover:text-[#2c1f18]";

function BrandLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <img src="/images/prople-icon.svg" alt="Prople icon" className="h-9 w-9 rounded-xl shadow-sm" />
      <span className="font-display text-[1.9rem] font-bold tracking-[-0.02em] text-[#2c1f18] max-[430px]:text-[1.35rem]">
        Prople
      </span>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();

  return (
    <Disclosure as="header" className="sticky top-0 z-30 border-b border-[#d9c7b3]/80 bg-white/90 backdrop-blur">
      {({ open }) => (
        <>
          <div className="container relative flex h-[72px] items-center justify-between lg:h-[84px]">
            <div className="shrink-0">
              <BrandLogo />
            </div>

            <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 lg:flex">
              <Menu as="div" className="relative">
                <MenuButton className={`${navLinkClass} inline-flex items-center gap-1`}>
                  Solutions <ChevronDownIcon className="h-4 w-4" />
                </MenuButton>
                <MenuItems anchor="bottom" className="mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                  {solutions.map((item) => (
                    <MenuItem key={item.name}>
                      <Link href={item.href} className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                        {item.name}
                      </Link>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>

              {navItems.map((item) => (
                <Link key={item.name} href={item.href} className={navLinkClass}>
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-4 lg:flex">
              <Link href="/sign-in" className={`${navLinkClass} px-1`}>
                Sign In
              </Link>
              <Link
                href="/onboarding"
                className="rounded-xl border-2 border-[#2c1f18] bg-white px-5 py-2.5 text-sm font-bold text-[#2c1f18] shadow-md transition hover:bg-[#f6efe6] hover:shadow-lg"
              >
                Get Started
              </Link>
            </div>

            <DisclosureButton className="rounded-lg p-2 text-slate-600 lg:hidden">
              <span className="sr-only">Open menu</span>
              {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </DisclosureButton>
          </div>

          <DisclosurePanel className="border-t border-[#e7d8c9] bg-white lg:hidden">
            <div className="container py-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#8b5e3c]">Solutions</p>
              <div className="mb-4 grid gap-1">
                {solutions.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`rounded-lg px-3 py-2 text-sm font-medium ${
                      pathname === item.href ? "bg-[#f1e7db] text-[#2c1f18]" : "text-[#4f3523]"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="mb-4 grid gap-1">
                {navItems.map((item) => (
                  <Link key={item.name} href={item.href} className="rounded-lg px-3 py-2 text-sm font-medium text-[#4f3523]">
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/sign-in"
                  className="rounded-lg border border-[#c9b6a3] px-4 py-2 text-center text-sm font-semibold text-[#2c1f18]"
                >
                  Sign In
                </Link>
                <Link href="/onboarding" className="rounded-lg border-2 border-[#2c1f18] bg-white px-4 py-2 text-center text-sm font-bold text-[#2c1f18]">
                  Get Started
                </Link>
              </div>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
