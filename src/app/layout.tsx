import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Prashant Verma",
  description: "Full-stack developer building intelligent systems that blend user experience with AI. Portfolio showcasing projects in React, Python, FastAPI, and more.",
  keywords: ["developer", "portfolio", "React", "Python", "full-stack", "AI", "machine learning"],
  authors: [{ name: "Prashant Verma" }],
  openGraph: {
    title: "Prashant Verma",
    description: "Full-stack developer building intelligent systems that blend user experience with AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-body antialiased">
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
