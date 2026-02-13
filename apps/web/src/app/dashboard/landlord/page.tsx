"use client";

import { api } from "@packages/backend/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const fallback = {
  cards: [
    { label: "Portfolio Value", value: "$12.4M", delta: "+3.1% MoM" },
    { label: "Occupancy", value: "94%", delta: "+2 pts" },
    { label: "Net Cash Flow (Monthly)", value: "$182,400", delta: "+$14,200" },
    { label: "Total Equity", value: "$4.7M", delta: "+$210k" },
  ],
  incomeVsExpense: [
    { month: "Mar", income: 310, expense: 182 },
    { month: "Apr", income: 326, expense: 191 },
    { month: "May", income: 332, expense: 205 },
    { month: "Jun", income: 338, expense: 214 },
    { month: "Jul", income: 341, expense: 221 },
    { month: "Aug", income: 348, expense: 219 },
    { month: "Sep", income: 355, expense: 226 },
    { month: "Oct", income: 362, expense: 232 },
    { month: "Nov", income: 365, expense: 241 },
    { month: "Dec", income: 372, expense: 244 },
    { month: "Jan", income: 378, expense: 248 },
    { month: "Feb", income: 384, expense: 252 },
  ],
  noiTrend: [
    { month: "Mar", noi: 128 },
    { month: "Apr", noi: 135 },
    { month: "May", noi: 141 },
    { month: "Jun", noi: 144 },
    { month: "Jul", noi: 147 },
    { month: "Aug", noi: 153 },
    { month: "Sep", noi: 158 },
    { month: "Oct", noi: 162 },
    { month: "Nov", noi: 165 },
    { month: "Dec", noi: 168 },
    { month: "Jan", noi: 172 },
    { month: "Feb", noi: 176 },
  ],
  properties: [
    { name: "Willow Courts", roi: "12.4%", occupancy: "97%", value: "$4.2M", equity: "$1.8M" },
    { name: "Harbor Lofts", roi: "10.9%", occupancy: "92%", value: "$3.1M", equity: "$1.1M" },
    { name: "Maple Row", roi: "9.6%", occupancy: "95%", value: "$2.7M", equity: "$0.9M" },
    { name: "Cedar Commons", roi: "8.2%", occupancy: "90%", value: "$2.4M", equity: "$0.7M" },
  ],
  renewals: [
    { label: "Lease renewal • Harbor Lofts #1203", date: "Feb 18", status: "Due soon" },
    { label: "Tax installment • Maple Row", date: "Mar 01", status: "Scheduled" },
    { label: "Insurance renewal • Willow Courts", date: "Mar 12", status: "Quote requested" },
  ],
  expenses: [
    { label: "Boiler replacement • Willow Courts", amount: "$12,800", date: "Feb 02" },
    { label: "Roof patch • Cedar Commons", amount: "$4,400", date: "Jan 27" },
  ],
};

export default function LandlordDashboardPage() {
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

  if (profile && profile.role !== "landlord") {
    return (
      <main className="container py-14">
        <p className="text-slate-700">This dashboard is for landlords only.</p>
        <Link href="/dashboard/property-manager" className="mt-4 inline-block text-sm font-semibold text-[--color-brand]">
          Go to Property Manager dashboard
        </Link>
      </main>
    );
  }

  const data = dashboard?.role === "landlord" ? dashboard : null;
  const cards = data?.cards ?? fallback.cards;
  const incomeVsExpense = data?.incomeVsExpense ?? fallback.incomeVsExpense;
  const noiTrend = data?.noiTrend ?? fallback.noiTrend;
  const properties = data?.properties ?? fallback.properties;
  const renewals = data?.renewals ?? fallback.renewals;
  const expenses = data?.expenses ?? fallback.expenses;

  return (
    <main className="bg-[#f6efe6] py-10">
      <div className="container max-w-6xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#8b5e3c]">Owner • Live</p>
            <h1 className="font-display text-4xl font-bold text-[#2c1f18]">Nestora-style Landlord Dashboard</h1>
            <p className="mt-2 text-[#5b3a28]">Real-time KPIs powered by Convex + Clerk RBAC.</p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-xl border border-[#d8c4b0] bg-white px-4 py-2 text-sm font-semibold text-[#2c1f18]">Add Property</button>
            <button className="rounded-xl bg-[--color-brand] px-4 py-2 text-sm font-semibold text-white">Upload Lease</button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div key={card.label} className="rounded-2xl border border-[#e7d8c9] bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#8b5e3c]">{card.label}</p>
              <p className="mt-2 font-display text-3xl font-bold text-[#2c1f18]">{card.value}</p>
              <p className="text-sm font-semibold text-emerald-600">{card.delta}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl border border-[#e7d8c9] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#8b5e3c]">Income vs Expense</p>
                <p className="text-xl font-bold text-[#2c1f18]">Last 12 months</p>
              </div>
              <span className="rounded-full bg-[#f1e3d5] px-3 py-1 text-xs font-semibold text-[#8b5e3c]">Auto-rent on 1st</span>
            </div>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incomeVsExpense}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1e3d5" />
                  <XAxis dataKey="month" stroke="#7b614d" />
                  <YAxis stroke="#7b614d" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="income" fill="#8b5e3c" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="expense" fill="#d8c4b0" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-[#e7d8c9] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[#8b5e3c]">NOI Trend</p>
                <span className="text-xs font-semibold text-emerald-600">+9.2% YoY</span>
              </div>
              <div className="mt-3 h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={noiTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1e3d5" />
                    <XAxis dataKey="month" stroke="#7b614d" />
                    <YAxis stroke="#7b614d" />
                    <Tooltip />
                    <Line type="monotone" dataKey="noi" stroke="#8b5e3c" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl border border-[#e7d8c9] bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-[#8b5e3c]">Upcoming renewals</p>
              <ul className="mt-3 space-y-3">
                {renewals.map((item) => (
                  <li key={item.label} className="flex items-start justify-between gap-3 rounded-xl bg-[#f6efe6] px-3 py-2">
                    <div>
                      <p className="text-sm font-semibold text-[#2c1f18]">{item.label}</p>
                      <p className="text-xs text-[#7b614d]">{item.date}</p>
                    </div>
                    <span className="text-xs font-semibold text-[#8b5e3c]">{item.status}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[#e7d8c9] bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-[#8b5e3c]">Recent large expenses</p>
              <ul className="mt-3 space-y-2">
                {expenses.map((item) => (
                  <li key={item.label} className="flex items-center justify-between rounded-lg px-2 py-1">
                    <div className="text-sm text-[#3b281d]">{item.label}</div>
                    <div className="text-sm font-semibold text-[#2c1f18]">{item.amount}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#e7d8c9] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#8b5e3c]">Top performing properties</p>
              <p className="text-xl font-bold text-[#2c1f18]">Portfolio health</p>
            </div>
            <Link href="/resources" className="text-sm font-semibold text-[--color-brand]">
              View analytics &rarr;
            </Link>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {properties.map((property) => (
              <div key={property.name} className="rounded-xl border border-[#e7d8c9] bg-[#fefbf7] p-4">
                <p className="text-lg font-bold text-[#2c1f18]">{property.name}</p>
                <p className="text-sm text-[#7b614d]">Occupancy {property.occupancy}</p>
                <div className="mt-2 flex items-center gap-4 text-sm font-semibold text-[#8b5e3c]">
                  <span>ROI {property.roi}</span>
                  <span>Value {property.value}</span>
                  <span>Equity {property.equity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showWelcome ? (
        <div className="fixed inset-0 grid place-items-center bg-slate-950/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-xl font-bold text-[#101828]">Welcome to Prople</h3>
            <p className="mt-2 text-sm text-slate-600">Your landlord workspace is ready. Add your first tenant to get started.</p>
            <button
              className="mt-5 rounded-xl bg-[--color-brand] px-4 py-2 text-sm font-semibold text-white"
              onClick={async () => {
                await markWelcomeSeen({});
                setShowWelcome(false);
              }}
            >
              View Dashboard
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}
