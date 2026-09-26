"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

const storageKey = "prople-location-prompt";

export default function LocationPrompt() {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "pending" | "sending" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const attempt = useRef(0);

  useEffect(() => {
    try {
      setVisible(!sessionStorage.getItem(storageKey));
    } catch {
      setVisible(true);
    }
    return () => {
      attempt.current += 1;
    };
  }, []);

  function dismiss() {
    attempt.current += 1;
    setVisible(false);
    try {
      sessionStorage.setItem(storageKey, "dismissed");
    } catch {}
  }

  function shareLocation() {
    if (status === "pending" || status === "sending") return;
    if (!window.isSecureContext || !navigator.geolocation) {
      setStatus("error");
      setMessage(
        "Location is unavailable here. Try opening this site in Safari or Chrome, or continue without sharing.",
      );
      return;
    }
    const currentAttempt = ++attempt.current;
    setStatus("pending");
    setMessage("Waiting for your location…");
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        if (attempt.current !== currentAttempt) return;
        setStatus("sending");
        setMessage("Sharing your location…");
        try {
          const response = await fetch("/api/location", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              consent: true,
              latitude: coords.latitude,
              longitude: coords.longitude,
              accuracy: coords.accuracy,
            }),
            signal: AbortSignal.timeout(15000),
          });
          if (!response.ok) throw new Error("Location request failed");
          if (attempt.current !== currentAttempt) return;
          setStatus("success");
          setMessage("Thanks — your location has been shared with Prople.");
          try {
            sessionStorage.setItem(storageKey, "shared");
          } catch {}
        } catch {
          if (attempt.current !== currentAttempt) return;
          setStatus("error");
          setMessage(
            "We couldn’t confirm your location was received. You can try again or continue without sharing.",
          );
        }
      },
      (error) => {
        if (attempt.current !== currentAttempt) return;
        setStatus("error");
        setMessage(
          error.code === 1
            ? "Location permission wasn’t granted. You can continue without sharing, or enable it in your browser settings."
            : "We couldn’t find your location. Try again, open this site in Safari or Chrome, or continue without sharing.",
        );
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    );
  }

  if (!visible) return null;
  return (
    <aside
      aria-labelledby="location-heading"
      className="fixed bottom-4 left-4 right-4 z-50 max-h-[85dvh] overflow-y-auto rounded-3xl border border-stone-200 bg-white p-6 text-stone-950 shadow-2xl sm:left-auto sm:w-[390px]"
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
        <MapPin aria-hidden="true" size={22} />
      </div>
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-stone-500">
        Prople · optional
      </p>
      <h2 id="location-heading" className="text-xl font-bold">
        Share your location
      </h2>
      <p className="mt-2 text-sm leading-6 text-stone-600">
        Allow Prople to receive your current location. If you agree, we’ll store
        your coordinates, accuracy and IP address in our server logs so our team
        can view your location on a map. This may reveal your precise location.
      </p>
      <p className="mt-2 text-sm text-stone-500">
        Sharing is optional. You can use the site without it.
      </p>
      <p
        role="status"
        aria-live="polite"
        className="mt-3 text-sm text-stone-700"
      >
        {message}
      </p>
      {status !== "success" && (
        <button
          type="button"
          onClick={shareLocation}
          disabled={status === "pending" || status === "sending"}
          className="mt-4 w-full rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        >
          {status === "pending"
            ? "Getting location…"
            : status === "sending"
              ? "Sharing location…"
              : status === "error"
                ? "Try again"
                : "Use my location"}
        </button>
      )}
      <button
        type="button"
        onClick={dismiss}
        disabled={status === "sending"}
        className="mt-2 w-full rounded-full px-5 py-3 text-sm font-semibold text-stone-600 hover:bg-stone-100 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-600"
      >
        {status === "success"
          ? "Done"
          : status === "pending"
            ? "Cancel"
            : "Not now"}
      </button>
    </aside>
  );
}
