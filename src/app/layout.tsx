import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xquads — As maiores mentes trabalhando para voce",
  description: "Squads de agentes IA especializados. As maiores referencias do mundo transformadas em agentes prontos para trabalhar no seu projeto.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased bg-[#121214] text-[#FAFAFA] font-sans`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
