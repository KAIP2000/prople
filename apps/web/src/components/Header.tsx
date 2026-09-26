"use client";

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  Bars3Icon,
  BoltIcon,
  BuildingOffice2Icon,
  ChartBarIcon,
  ChevronDownIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  CurrencyPoundIcon,
  DocumentCheckIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  HomeModernIcon,
  KeyIcon,
  LifebuoyIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, ComponentType } from "react";

type NavItem = {
  name: string;
  href: string;
  icon: ComponentType<ComponentProps<"svg">>;
};

const solutionGroups: Array<{
  title: string;
  icon: ComponentType<ComponentProps<"svg">>;
  accent: string;
  items: NavItem[];
}> = [
  {
    title: "Letting Agent Solutions",
    icon: HomeModernIcon,
    accent: "bg-[#ff1ea8]",
    items: [
      { name: "Core Platform", href: "/solutions#property-management", icon: BuildingOffice2Icon },
      { name: "Tenant Referencing", href: "/solutions#tenant-referencing", icon: DocumentCheckIcon },
      { name: "Rent Protection", href: "/solutions#rent-protection", icon: ShieldCheckIcon },
      { name: "Tenant Payments", href: "/solutions#rent-collection", icon: CurrencyPoundIcon },
      { name: "Guarantor Network", href: "/solutions#guarantor", icon: UserGroupIcon },
      { name: "PEPs & Sanctions Checks", href: "/solutions#compliance", icon: ClipboardDocumentCheckIcon },
      { name: "Contracts", href: "/solutions#contracts", icon: DocumentTextIcon },
      { name: "Utility Management", href: "/solutions#utility-management", icon: BoltIcon },
      { name: "Maintenance", href: "/solutions#maintenance", icon: ClipboardDocumentListIcon },
      { name: "CRM Integrations", href: "/solutions#integrations", icon: ChartBarIcon },
      { name: "Accounting", href: "/solutions#accounting", icon: ChartBarIcon },
      { name: "Tenancy Management", href: "/solutions#tenancy-management", icon: ClipboardDocumentListIcon },
      { name: "End of Tenancy", href: "/solutions#end-of-tenancy", icon: KeyIcon },
    ],
  },
  {
    title: "Landlord Solutions",
    icon: KeyIcon,
    accent: "bg-[#ff1ea8]",
    items: [
      { name: "Property Protection", href: "/solutions#property-protection", icon: ShieldCheckIcon },
      { name: "Buildings & Contents Insurance", href: "/solutions#insurance", icon: HomeModernIcon },
      { name: "Landlord Hub", href: "/solutions#landlord-hub", icon: BuildingOffice2Icon },
    ],
  },
  {
    title: "Tenant Solutions",
    icon: UserCircleIcon,
    accent: "bg-[#ff1ea8]",
    items: [
      { name: "Tenant Support", href: "/solutions#tenant-support", icon: LifebuoyIcon },
      { name: "Need help with a guarantor?", href: "/solutions#guarantor-help", icon: UserGroupIcon },
      { name: "Contents & Liability Insurance", href: "/solutions#tenant-insurance", icon: ShieldCheckIcon },
      { name: "Broadband and Media", href: "/solutions#broadband-media", icon: GlobeAltIcon },
      { name: "Utility Management", href: "/solutions#utility-management", icon: BoltIcon },
      { name: "Manage your bills", href: "/solutions#billing", icon: ClipboardDocumentListIcon },
    ],
  },
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
  const isActivePath = (href: string) => {
    const [basePath] = href.split("#");
    return pathname === href || pathname === basePath;
  };

  return (
    <Disclosure as="header" className="sticky top-4 z-40 px-3 lg:px-6">
      {({ open }) => (
        <>
          <div className="container">
            <div className="relative flex h-[72px] items-center justify-between rounded-2xl border border-[#dccab7] bg-white/95 px-4 shadow-[0_10px_35px_rgba(67,42,25,0.12)] backdrop-blur lg:h-[84px] lg:px-8">
              <div className="shrink-0">
                <BrandLogo />
              </div>

              <nav className="absolute inset-x-0 hidden h-full items-center justify-center gap-10 lg:flex">
                <Menu as="div" className="static">
                  {({ open: menuOpen }) => (
                    <>
                      <MenuButton className={`${navLinkClass} inline-flex items-center gap-1`}>
                        Solutions <ChevronDownIcon className={`h-4 w-4 transition ${menuOpen ? "rotate-180" : ""}`} />
                      </MenuButton>
                      <MenuItems className="absolute left-1/2 top-full z-50 grid max-h-[calc(100vh-8rem)] w-[min(1160px,calc(100vw-6rem))] -translate-x-1/2 grid-cols-3 overflow-y-auto overflow-x-hidden rounded-2xl border border-[#dfd1c3] bg-[#f7f7f8] p-6 shadow-[0_30px_70px_rgba(28,16,9,0.2)]">
                        {solutionGroups.map((group, index) => {
                          const GroupIcon = group.icon;
                          return (
                            <div
                              key={group.title}
                              className={`px-4 ${index < solutionGroups.length - 1 ? "border-r border-[#d4c5b5]" : ""}`}
                            >
                              <div className="mb-5 flex items-center gap-3">
                                <span className={`grid h-10 w-10 place-items-center rounded-lg text-white ${group.accent}`}>
                                  <GroupIcon className="h-5 w-5" />
                                </span>
                                <p className="text-[1.05rem] font-bold text-[#2b1d15]">{group.title}</p>
                              </div>
                              <div className="space-y-1">
                                {group.items.map((item) => {
                                  const ItemIcon = item.icon;
                                  return (
                                    <MenuItem key={item.name}>
                                      <Link
                                        href={item.href}
                                        className="flex items-start gap-3 rounded-xl px-2 py-2.5 text-[1.04rem] text-[#3d2a1f] transition hover:bg-white/85"
                                      >
                                        <ItemIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#3d2a1f]" />
                                        <span className="leading-snug">{item.name}</span>
                                      </Link>
                                    </MenuItem>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </MenuItems>
                    </>
                  )}
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
                  className="rounded-[18px] border-[2.5px] border-[#2c1f18] bg-white px-6 py-2.5 text-sm font-bold leading-none text-[#2c1f18] shadow-md transition hover:bg-[#f6efe6] hover:shadow-lg"
                >
                  Get Started
                </Link>
              </div>

              <DisclosureButton className="rounded-lg p-2 text-slate-600 lg:hidden">
                <span className="sr-only">Open menu</span>
                {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
              </DisclosureButton>
            </div>
          </div>

          <DisclosurePanel className="container mt-3 lg:hidden">
            <div className="rounded-2xl border border-[#dccab7] bg-white/95 p-4 shadow-[0_10px_35px_rgba(67,42,25,0.12)] backdrop-blur">
              {solutionGroups.map((group) => (
                <div key={group.title} className="mb-4 last:mb-0">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#8b5e3c]">{group.title}</p>
                  <div className="grid gap-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`rounded-lg px-3 py-2 text-sm font-medium ${
                          isActivePath(item.href) ? "bg-[#f1e7db] text-[#2c1f18]" : "text-[#4f3523]"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <div className="mb-4 mt-2 grid gap-1">
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
