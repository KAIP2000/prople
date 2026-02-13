"use client";

import { api } from "@packages/backend/convex/_generated/api";
import { useQuery } from "convex/react";
import { Download, FileText, ShieldCheck } from "lucide-react";
import { useMemo } from "react";

const fallback = {
  cards: [
    { label: "Total transactions (90d)", value: "684", helper: "Read-only" },
    { label: "Income", value: "$1.12M", helper: "Rent + fees" },
    { label: "Expenses", value: "$482k", helper: "CapEx included" },
    { label: "Last export", value: "Feb 1, 2026", helper: "CSV" },
  ],
  transactions: [
    { id: "txn1", property: "Willow Courts", type: "income", category: "Rent", amount: "$2,450", date: "Feb 01", receipt: true },
    { id: "txn2", property: "Harbor Lofts", type: "expense", category: "Repairs", amount: "$1,280", date: "Jan 29", receipt: true },
    { id: "txn3", property: "Maple Row", type: "expense", category: "Insurance", amount: "$960", date: "Jan 27", receipt: false },
    { id: "txn4", property: "Harbor Lofts", type: "income", category: "Parking", amount: "$310", date: "Jan 25", receipt: true },
  ],
};

export default function AccountantDashboardPage() {
  const dashboard = useQuery(api.dashboard.getDashboard, {});
  const data = dashboard?.role === "accountant" ? dashboard : null;
  const cards = data?.cards ?? fallback.cards;
  const transactions = data?.transactions ?? fallback.transactions;

  const totals = useMemo(() => {
    const income = transactions.filter((t) => t.type === "income").length;
    const expenses = transactions.filter((t) => t.type === "expense").length;
    return { income, expenses };
  }, [transactions]);

  return (
    <main className="bg-[#f6efe6] py-10">
      <div className="container max-w-6xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#8b5e3c]">Accountant</p>
            <h1 className="font-display text-4xl font-bold text-[#2c1f18]">Audit-safe Ledger</h1>
            <p className="mt-2 text-[#5b3a28]">Read-only transactions, tax categories, receipts, and CSV exports.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl bg-[--color-brand] px-4 py-2 text-sm font-semibold text-white shadow-sm">
            <Download className="h-4 w-4" /> Download CSV
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div key={card.label} className="rounded-2xl border border-[#e7d8c9] bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#8b5e3c]">{card.label}</p>
              <p className="mt-2 font-display text-3xl font-bold text-[#2c1f18]">{card.value}</p>
              <p className="text-xs font-semibold text-[#7b614d]">{card.helper}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-[#e7d8c9] bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-[#8b5e3c]">Transactions</p>
              <p className="text-xl font-bold text-[#2c1f18]">
                {transactions.length} rows • {totals.income} income / {totals.expenses} expenses
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#7b614d]">
              <span className="rounded-full bg-[#f1e3d5] px-3 py-1">Read-only enforced</span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">Receipts attached</span>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-[#e7d8c9]">
            <table className="min-w-full divide-y divide-[#e7d8c9] text-sm">
              <thead className="bg-[#fefbf7] text-[#7b614d]">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Property</th>
                  <th className="px-4 py-3 text-left font-semibold">Category</th>
                  <th className="px-4 py-3 text-left font-semibold">Amount</th>
                  <th className="px-4 py-3 text-left font-semibold">Date</th>
                  <th className="px-4 py-3 text-left font-semibold">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e7d8c9] bg-white text-[#2c1f18]">
                {transactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-[#f6efe6]">
                    <td className="px-4 py-3">
                      <p className="font-semibold">{txn.property}</p>
                      <p className={`text-xs font-semibold ${txn.type === "income" ? "text-emerald-700" : "text-rose-700"}`}>
                        {txn.type === "income" ? "Income" : "Expense"}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#3b281d]">{txn.category}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-[#2c1f18]">{txn.amount}</td>
                    <td className="px-4 py-3 text-sm text-[#3b281d]">{txn.date}</td>
                    <td className="px-4 py-3">
                      {txn.receipt ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-semibold text-emerald-700">
                          <FileText className="h-3 w-3" /> View
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-[#7b614d]">Pending</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-[#e7d8c9] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#3b281d]">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            Accountants in Prople cannot modify data. Owners/managers keep write access; you export safely.
          </div>
        </div>
      </div>
    </main>
  );
}
