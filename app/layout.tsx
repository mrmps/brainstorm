import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO and OpenGraph metadata based on app/page.tsx
export const metadata: Metadata = {
  title: {
    default: "Brainstorm – Every possibility. Ranked.",
    template: "%s | Brainstorm",
  },
  description:
    "Generate 500+ answers to any question, then see the best ones first. No more wondering if there's something better.",
  metadataBase: new URL("https://brainstorm.cool"),
  openGraph: {
    title: "Brainstorm – Every possibility. Ranked.",
    description:
      "Generate 500+ answers to any question, then see the best ones first. No more wondering if there's something better.",
    url: "https://brainstorm.cool",
    siteName: "Brainstorm",
    images: [
      {
        url: "https://brainstorm.cool/og.png",
        width: 1200,
        height: 630,
        alt: "Brainstorm – Every possibility. Ranked.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brainstorm – Every possibility. Ranked.",
    description:
        "Generate 500+ answers to any question, then see the best ones first. No more wondering if there's something better.",
    images: ["https://brainstorm.cool/og.png"],
    creator: "@brainstormcool",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  keywords: [
    "brainstorm",
    "AI",
    "ideas",
    "ranking",
    "startup",
    "name generator",
    "creative",
    "possibilities",
    "open-ended questions",
    "contextual AI",
    "inference",
  ],
  authors: [
    { name: "Brainstorm Team", url: "https://brainstorm.cool" },
  ],
  themeColor: "#2E7850",
  category: "productivity",
  applicationName: "Brainstorm",
  generator: "Next.js",
};

// Moved `themeColor` to viewport per Next.js guidance
export const viewport = {
  themeColor: "#2E7850",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Fallback OG image for crawlers that don't parse metadata */}
        <meta property="og:image" content="https://brainstorm.cool/og.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
