import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Árvore genealógica com IA | Black Box IA",
  description: "Quatro prompts para descobrir sua árvore genealógica, com o convite da Black Box IA de sexta, 27/11.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
