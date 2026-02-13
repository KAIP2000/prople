"use client";

import { api } from "@packages/backend/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  const profile = useQuery(api.onboarding.getCurrentProfile);
  const pathname = usePathname();
  const router = useRouter();
  const [finalizingAt, setFinalizingAt] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("pp_onboarding_finalizing");
    setFinalizingAt(stored ? Number(stored) : null);
  }, []);

  useEffect(() => {
    if (profile) {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("pp_onboarding_finalizing");
      }
      setFinalizingAt(null);
    }
  }, [profile]);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    if (profile === undefined) return;
    if (!profile && !pathname.startsWith("/onboarding/complete")) {
      if (finalizingAt && Date.now() - finalizingAt < 30000) return;
      router.replace("/onboarding/complete");
    }
  }, [finalizingAt, isLoaded, isSignedIn, pathname, profile, router]);

  return <>{children}</>;
}
