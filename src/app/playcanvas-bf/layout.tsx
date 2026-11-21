import type { Metadata } from "next";
import { Archivo } from "next/font/google";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "Repositórios do PlayCanvas | Black Box IA",
  description: "Repositórios do PlayCanvas, com o convite da Black Box IA de sexta, 27/11.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={archivo.variable} style={{ fontFamily: "var(--font-archivo), system-ui, sans-serif" }}>
      {children}
    </div>
  );
}
