import { ArrowRight, Rocket } from "lucide-react";

const SALES_URL_BASE =
  "https://www.raxo.com.br/vibecodingvsl?utm_source=instagram&utm_medium=organico&utm_campaign=xquads-isca-nov25";

interface SalesCtaProps {
  /** Identifica a página de origem no utm_content */
  utmContent: string;
}

export function SalesCta({ utmContent }: SalesCtaProps) {
  const href = `${SALES_URL_BASE}&utm_content=${utmContent}`;

  return (
    <div className="rounded-2xl border border-[#EA8049]/30 bg-gradient-to-br from-[#EA8049]/15 via-[#1a1a1e] to-[#1a1a1e] p-6 sm:p-8 text-center space-y-4">
      <div className="inline-flex items-center gap-2 rounded-full bg-[#EA8049]/15 px-3 py-1 text-[11px] font-semibold text-[#EA8049] uppercase tracking-wider">
        <Rocket className="h-3.5 w-3.5" />
        Nova possibilidade no mercado
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
        Está surgindo uma nova fonte de renda: usar inteligência artificial
        para criar projetos, seja para a sua empresa ou para vender para outras
      </h2>
      <p className="text-sm text-[#999] max-w-lg mx-auto leading-relaxed">
        Pessoas sem nenhuma base em programação estão criando sistemas, painéis
        e automações com IA e cobrando caro por isso. Se você quer conhecer
        esse caminho, clica no botão aqui embaixo.
      </p>
      <a
        href={href}
        className="inline-flex items-center gap-2 rounded-xl bg-[#EA8049] hover:bg-[#c5603a] text-white text-base font-semibold px-8 py-4 transition-colors"
      >
        Quero conhecer
        <ArrowRight className="h-5 w-5" />
      </a>
    </div>
  );
}
