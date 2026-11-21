import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "+50 códigos de produtividade | Black Box IA",
  description: "Biblioteca de códigos de produtividade, com o convite da Black Box IA de sexta, 27/11.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
