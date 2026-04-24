import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prashant Verma | The Anomaly",
  description: "Full-stack developer building intelligent systems that blend user experience with AI. Neo-brutalist portfolio showcasing projects in React, Python, FastAPI, and more.",
  keywords: ["developer", "portfolio", "React", "Python", "full-stack", "AI", "machine learning"],
  authors: [{ name: "Prashant Verma" }],
  openGraph: {
    title: "Prashant Verma | The Anomaly",
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
      </body>
    </html>
  );
}
