"use client";

import { api } from "@packages/backend/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function CompleteOnboardingPage() {
  const { isSignedIn, isLoaded, getToken } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const finalizeOnboarding = useMutation(api.onboarding.finalizeOnboarding);
  const attachDraftToCurrentUser = useMutation(api.onboarding.attachDraftToCurrentUser);
  const [status, setStatus] = useState<"loading" | "pending" | "error">("loading");
  const [error, setError] = useState<string>("");
  const [retryTick, setRetryTick] = useState(0);
  const sessionId = searchParams.get("session") ?? "";
  const [localSession, setLocalSession] = useState("");
  const finalizationState = useQuery(api.onboarding.getFinalizationState, {
    sessionId: sessionId || undefined,
  });

  const effectiveSessionId = useMemo(() => {
    return sessionId || localSession || finalizationState?.sessionId || "";
  }, [finalizationState?.sessionId, localSession, sessionId]);

  useEffect(() => {
    if (sessionId || typeof window === "undefined") return;
    const stored = window.localStorage.getItem("pp_onboarding_session") || "";
    if (stored) {
      setLocalSession(stored);
    }
  }, [sessionId]);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !effectiveSessionId) return;
    void (async () => {
      try {
        setStatus("loading");
        await getToken({ template: "convex" });
        await attachDraftToCurrentUser({ sessionId: effectiveSessionId });
        const result = await finalizeOnboarding({ sessionId: effectiveSessionId });
        if (result.state === "finalized") {
          if (typeof window !== "undefined") {
            window.localStorage.setItem("pp_onboarding_finalizing", String(Date.now()));
          }
          const path =
            result.role === "landlord"
              ? "/dashboard/landlord"
              : result.role === "accountant"
                ? "/dashboard/accountant"
                : "/dashboard/property-manager";
          router.replace(`${path}${result.isFirstOnboarding ? "?welcome=1" : ""}`);
          return;
        }
        setStatus("pending");
      } catch (e) {
        setError((e as Error).message || "Finalization retry required");
        setStatus("error");
      }
    })();
  }, [attachDraftToCurrentUser, effectiveSessionId, finalizeOnboarding, getToken, isLoaded, isSignedIn, retryTick, router]);

  useEffect(() => {
    if (status !== "pending") return;
    const t = setTimeout(() => setRetryTick((v) => v + 1), 3000);
    return () => clearTimeout(t);
  }, [status]);

  if (!sessionId && !effectiveSessionId) {
    return (
      <main className="min-h-screen bg-[#0b0f19] text-white">
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
          <p className="text-sm text-slate-300">Still syncing your account. Please keep this page open.</p>
        </div>
      </main>
    );
  }

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-[#0b0f19] text-white">
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
          <p className="text-sm text-slate-300">Loading account...</p>
        </div>
      </main>
    );
  }

  if (!isSignedIn) {
    return (
      <main className="min-h-screen bg-[#0b0f19] text-white">
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
          <p className="text-sm text-slate-300">Please sign in to finish onboarding.</p>
          <Link
            href={`/sign-in?redirect_url=${encodeURIComponent(`/onboarding/complete${effectiveSessionId ? `?session=${effectiveSessionId}` : ""}`)}`}
            className="mt-5 inline-flex items-center justify-center rounded-2xl bg-white px-5 py-2 text-sm font-semibold text-slate-900"
          >
            Sign in
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0f19] text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
          <span className="h-7 w-7 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        </div>
        <h1 className="text-2xl font-semibold">Finalizing your setup</h1>
        <p className="mt-3 text-sm text-slate-300">
          {status === "loading" ? "Securing your workspace and provisioning dashboards." : null}
          {status === "pending" ? "Still syncing your account. Retrying..." : null}
          {status === "error" ? `Could not finish setup yet: ${error}` : null}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            className="rounded-2xl border border-white/20 px-4 py-2 text-sm font-semibold text-white"
            onClick={() => setRetryTick((v) => v + 1)}
          >
            Retry now
          </button>
          <Link href="/contact" className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-900">
            Contact support
          </Link>
        </div>
      </div>
    </main>
  );
}
