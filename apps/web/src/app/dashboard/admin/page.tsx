"use client";

import { api } from "@packages/backend/convex/_generated/api";
import { useQuery } from "convex/react";

const fallback = {
  users: [
    { name: "Alex Lee", role: "landlord", status: "active" },
    { name: "Priya Patel", role: "property_manager", status: "active" },
    { name: "Jordan Smith", role: "accountant", status: "invited" },
  ],
  audit: [
    { action: "Property deleted", actor: "Alex Lee", timestamp: "Feb 04, 14:22" },
    { action: "Maintenance closed", actor: "Priya Patel", timestamp: "Feb 04, 10:03" },
    { action: "CSV exported", actor: "Jordan Smith", timestamp: "Feb 03, 18:41" },
  ],
};

export default function AdminDashboardPage() {
  const dashboard = useQuery(api.dashboard.getDashboard, {});
  const data = dashboard?.role === "admin" ? dashboard : null;
  const users = data?.users ?? fallback.users;
  const audit = data?.auditLogs ?? fallback.audit;

  return (
    <main className="bg-[#f6efe6] py-10">
      <div className="container max-w-5xl space-y-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#8b5e3c]">Admin</p>
          <h1 className="font-display text-4xl font-bold text-[#2c1f18]">User Provisioning & Audit</h1>
          <p className="mt-2 text-[#5b3a28]">Manage roles and review critical actions across Prople.</p>
        </div>

        <div className="rounded-2xl border border-[#e7d8c9] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-[#8b5e3c]">Users & roles</p>
            <span className="rounded-full bg-[#f1e3d5] px-3 py-1 text-xs font-semibold text-[#8b5e3c]">Clerk synced</span>
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {users.map((user) => (
              <div key={user.name} className="rounded-xl border border-[#e7d8c9] bg-[#fefbf7] p-3 text-sm text-[#2c1f18]">
                <p className="font-semibold">{user.name}</p>
                <p className="text-xs uppercase tracking-wide text-[#7b614d]">{user.role}</p>
                <span
                  className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    user.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#e7d8c9] bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-[#8b5e3c]">Audit log</p>
          <ul className="mt-3 space-y-3 text-sm text-[#2c1f18]">
            {audit.map((item) => (
              <li key={item.timestamp} className="flex items-center justify-between rounded-xl bg-[#fefbf7] px-3 py-2">
                <div>
                  <p className="font-semibold">{item.action}</p>
                  <p className="text-xs text-[#7b614d]">by {item.actor}</p>
                </div>
                <span className="text-xs font-semibold text-[#8b5e3c]">{item.timestamp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
