import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pacote de agentes | Black Box IA",
  description: "Pacote de agentes Xquads, com o convite da Black Box IA de sexta, 27/11.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
