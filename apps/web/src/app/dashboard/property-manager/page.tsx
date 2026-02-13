"use client";

import { api } from "@packages/backend/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, MapPin, TriangleAlert } from "lucide-react";

const fallback = {
  summary: [
    { label: "Units occupied", value: "124 / 138", badge: "94% filled" },
    { label: "Vacancies", value: "9", badge: "6 new this week" },
    { label: "Expiring leases (30d)", value: "6", badge: "review" },
    { label: "Overdue rent", value: "$18,400", badge: "12 tenants" },
  ],
  rentProgress: [
    { label: "Collected", percent: 72, amount: "$132,900" },
    { label: "Pending", percent: 18, amount: "$33,200" },
    { label: "Delinquent", percent: 10, amount: "$18,400" },
  ],
  maintenance: [
    { title: "HVAC outage - Willow Courts #302", urgency: "Emergency", status: "In progress" },
    { title: "Elevator inspection - Harbor Lofts", urgency: "High", status: "Scheduled" },
    { title: "Unit turnover cleaning - Maple Row #7B", urgency: "Medium", status: "Waiting vendor" },
  ],
  rentRoll: [
    { tenant: "Diaz Family", unit: "1203", status: "Overdue", amount: "$2,150" },
    { tenant: "Kim LLC", unit: "4A", status: "Pending", amount: "$3,420" },
    { tenant: "Lopez", unit: "7B", status: "Paid", amount: "$2,050" },
  ],
  mapPins: [
    { name: "Willow Courts", status: "occupied", city: "Seattle" },
    { name: "Harbor Lofts", status: "vacant", city: "Portland" },
    { name: "Maple Row", status: "occupied", city: "Tacoma" },
  ],
};

export default function PropertyManagerDashboardPage() {
  const profile = useQuery(api.onboarding.getCurrentProfile);
  const dashboard = useQuery(api.dashboard.getDashboard, {});
  const markWelcomeSeen = useMutation(api.onboarding.markWelcomeSeen);
  const params = useSearchParams();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (!profile) return;
    if (params.get("welcome") === "1" && !profile.welcomeSeenAt) {
      setShowWelcome(true);
    }
  }, [params, profile]);

  if (profile && profile.role !== "property_manager") {
    return (
      <main className="container py-14">
        <p className="text-slate-700">This dashboard is for property managers only.</p>
        <Link href="/dashboard/landlord" className="mt-4 inline-block text-sm font-semibold text-[--color-brand]">
          Go to Landlord dashboard
        </Link>
      </main>
    );
  }

  const data = dashboard?.role === "property_manager" ? dashboard : null;
  const summary = data?.summary ?? fallback.summary;
  const rentProgress = data?.rentProgress ?? fallback.rentProgress;
  const maintenance = data?.maintenance ?? fallback.maintenance;
  const rentRoll = data?.rentRoll ?? fallback.rentRoll;
  const mapPins = data?.mapPins ?? fallback.mapPins;

  return (
    <main className="bg-[#f6efe6] py-10">
      <div className="container max-w-6xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#8b5e3c]">Manager</p>
            <h1 className="font-display text-4xl font-bold text-[#2c1f18]">Portfolio Operations Summary</h1>
            <p className="mt-2 text-[#5b3a28]">Vacancies, rent roll, maintenance, and map view for your assigned properties.</p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-xl border border-[#d8c4b0] bg-white px-4 py-2 text-sm font-semibold text-[#2c1f18]">Add Property</button>
            <button className="rounded-xl bg-[--color-brand] px-4 py-2 text-sm font-semibold text-white">Log Maintenance</button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {summary.map((item) => (
            <div key={item.label} className="rounded-2xl border border-[#e7d8c9] bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#8b5e3c]">{item.label}</p>
              <p className="mt-2 font-display text-3xl font-bold text-[#2c1f18]">{item.value}</p>
              <p className="text-xs font-semibold text-[#7b614d]">{item.badge}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-[#e7d8c9] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#8b5e3c]">Rent roll — February</p>
                <p className="text-xl font-bold text-[#2c1f18]">Collection tracker</p>
              </div>
              <span className="rounded-full bg-[#f1e3d5] px-3 py-1 text-xs font-semibold text-[#8b5e3c]">Auto reminders on</span>
            </div>
            <div className="mt-5 space-y-3">
              {rentProgress.map((row) => (
                <div key={row.label}>
                  <div className="flex items-center justify-between text-sm font-semibold text-[#3b281d]">
                    <span>{row.label}</span>
                    <span>{row.amount}</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-[#f6efe6]">
                    <div className="h-full rounded-full bg-[--color-brand]" style={{ width: `${row.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[#e7d8c9] bg-[#fefbf7] p-4">
              <p className="text-sm font-semibold text-[#8b5e3c]">Tenants needing action</p>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                {rentRoll.map((tenant) => (
                  <div key={tenant.tenant} className="rounded-xl border border-[#e7d8c9] bg-white p-3">
                    <p className="text-sm font-bold text-[#2c1f18]">{tenant.tenant}</p>
                    <p className="text-xs text-[#7b614d]">Unit {tenant.unit}</p>
                    <p className="mt-1 text-sm font-semibold text-[#8b5e3c]">{tenant.amount}</p>
                    <span
                      className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        tenant.status === "Paid"
                          ? "bg-emerald-100 text-emerald-700"
                          : tenant.status === "Pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {tenant.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-[#e7d8c9] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[#8b5e3c]">Maintenance queue</p>
                <span className="text-xs font-semibold text-[#7b614d]">Urgency first</span>
              </div>
              <ul className="mt-3 space-y-3">
                {maintenance.map((item) => (
                  <li key={item.title} className="rounded-xl border border-[#e7d8c9] bg-[#fefbf7] p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold text-[#2c1f18]">{item.title}</p>
                        <p className="text-xs text-[#7b614d]">{item.status}</p>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                          item.urgency === "Emergency"
                            ? "bg-rose-100 text-rose-700"
                            : item.urgency === "High"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-[#f1e3d5] text-[#8b5e3c]"
                        }`}
                      >
                        <TriangleAlert className="h-3 w-3" />
                        {item.urgency}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[#e7d8c9] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[#8b5e3c]">Map view</p>
                <span className="text-xs font-semibold text-[#7b614d]">Status by color</span>
              </div>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {mapPins.map((pin) => (
                  <div
                    key={pin.name}
                    className="flex items-center gap-2 rounded-xl border border-[#e7d8c9] bg-[#fefbf7] px-3 py-2 text-sm text-[#2c1f18]"
                  >
                    <MapPin className="h-4 w-4 text-[#8b5e3c]" />
                    <div>
                      <p className="font-semibold">{pin.name}</p>
                      <p className="text-xs text-[#7b614d]">{pin.city}</p>
                    </div>
                    <span
                      className={`ml-auto inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        pin.status === "occupied" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {pin.status === "occupied" ? "Occupied" : "Vacancies"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#e7d8c9] bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-[#8b5e3c]">Unit turnover</p>
              <div className="mt-2 flex items-center gap-2 text-sm text-[#3b281d]">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Toggle a unit to Vacant to trigger cleaning + marketing alerts automatically.
              </div>
            </div>
          </div>
        </div>
      </div>

      {showWelcome ? (
        <div className="fixed inset-0 grid place-items-center bg-slate-950/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-xl font-bold text-[#101828]">Welcome to Prople</h3>
            <p className="mt-2 text-sm text-slate-600">Your manager workspace is ready. Add your first property or wait for an owner invite.</p>
            <button
              className="mt-5 rounded-xl bg-[--color-brand] px-4 py-2 text-sm font-semibold text-white"
              onClick={async () => {
                await markWelcomeSeen({});
                setShowWelcome(false);
              }}
            >
              Go to Portfolio
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}
