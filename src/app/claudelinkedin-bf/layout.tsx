import type { Metadata } from "next";
import { Archivo } from "next/font/google";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "Claude se candidata a 500 vagas no LinkedIn | Black Box IA",
  description: "Sequência de prompts para o Claude se candidatar a vagas no LinkedIn, com o convite da Black Box IA de sexta, 27/11.",
  robots: { index: false, follow: false },
};

export default function ClaudeLinkedinBlackBoxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={archivo.variable} style={{ fontFamily: "var(--font-archivo), system-ui, sans-serif" }}>
      {children}
    </div>
  );
}
