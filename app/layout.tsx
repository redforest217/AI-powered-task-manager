import LoadingProvider from "@/components/LoadingProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI-powered Smart Task Manager",
  description:
    "AI-powered smart task manager that helps you organize your tasks efficiently.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased relative min-h-screen bg-slate-950 text-[#FFFFFC] font-sans">
        <div className="fixed inset-0 -z-10">
          <div className="h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#63e_100%)]"></div>
        </div>

        <LoadingProvider>{children}</LoadingProvider>
      </body>
    </html>
  );
}
