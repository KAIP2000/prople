import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import ConvexClientProvider from "./ConvexClientProvider";
import LocationPrompt from "@/components/LocationPrompt";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Prople",
  description: "Real-time property portfolio intelligence for owners, managers, and accountants.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(manrope.variable, spaceGrotesk.variable, "text-[--color-ink] bg-[--color-sand]")}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
        <LocationPrompt />
      </body>
    </html>
  );
}
