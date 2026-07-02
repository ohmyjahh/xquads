import {
  Sparkles,
  Download,
  FolderArchive,
  ToggleRight,
  UploadCloud,
  ShieldCheck,
  Crown,
  Megaphone,
  Search,
  PenLine,
  Mail,
  BarChart3,
  Lightbulb,
} from "lucide-react";
import { SalesCta } from "@/components/sales-cta";
import { RepoCard } from "./repo-card";

export const metadata = {
  title: "Marketing Skills para o Claude | Xquads",
  description:
    "Conheça o repositório com mais de 60 skills de marketing para IA e aprenda o passo a passo de como instalar uma skill dentro do Claude web (claude.ai).",
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
      {children}
    </h2>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-[#D97757]/5 border border-[#D97757]/15 p-4">
      <Lightbulb className="h-4 w-4 text-[#D97757] mt-0.5 shrink-0" />
      <p className="text-sm text-[#bbb] leading-relaxed">{children}</p>
    </div>
  );
}

const CATEGORIES = [
  { icon: PenLine, label: "Copywriting & conteúdo" },
  { icon: Search, label: "SEO & descoberta" },
  { icon: Megaphone, label: "Ads & distribuição" },
  { icon: Mail, label: "E-mail & CRO" },
  { icon: BarChart3, label: "Analytics & testes A/B" },
  { icon: Sparkles, label: "Estratégia & vendas" },
];

interface StepProps {
  n: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}

function Step({ n, icon: Icon, title, children }: StepProps) {
  return (
    <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 sm:p-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D97757]/15 text-sm font-bold text-[#D97757]">
          {n}
        </span>
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-[#D97757]" />
          <h3 className="text-base font-semibold text-white">{title}</h3>
        </div>
      </div>
      <div className="space-y-2 text-[15px] text-[#aaa] leading-relaxed pl-11">
        {children}
      </div>
    </div>
  );
}

function Path({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md bg-[#141416] border border-[#2a2a2e] px-1.5 py-0.5 text-[13px] text-[#D97757] font-medium">
      {children}
    </code>
  );
}

export default function MktSkillsPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-12">
      {/* ============ HEADER ============ */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#D97757]/10 border border-[#D97757]/20 px-4 py-1.5 text-xs font-medium text-[#D97757]">
          <Sparkles className="h-3.5 w-3.5" />
          Marketing + IA
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Skills de Marketing para o Claude
        </h1>
        <p className="text-[15px] sm:text-base text-[#999] max-w-xl mx-auto leading-relaxed">
          Um repositório aberto com mais de 60 habilidades de marketing prontas
          para dar ao Claude conhecimento especializado. Abaixo, o projeto e o
          passo a passo para instalar qualquer uma delas no Claude web.
        </p>
      </div>

      {/* ============ PARTE 1 — O REPOSITÓRIO ============ */}
      <div className="space-y-5">
        <SectionTitle>O repositório</SectionTitle>

        <RepoCard />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {CATEGORIES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 rounded-lg border border-[#2a2a2e] bg-[#141416] px-3 py-2.5"
            >
              <Icon className="h-4 w-4 shrink-0 text-[#D97757]" />
              <span className="text-[13px] text-[#bbb] leading-tight">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ============ CTA ============ */}
      <SalesCta utmContent="guia-mkt" />

      {/* ============ PARTE 2 — MANUAL ============ */}
      <div className="space-y-5">
        <SectionTitle>Como instalar uma skill no Claude web</SectionTitle>
        <p className="text-[15px] text-[#aaa] leading-relaxed">
          O passo a passo abaixo mostra como pegar uma skill do repositório e
          colocá-la para funcionar dentro do <strong>claude.ai</strong>. Todo o
          processo leva poucos minutos.
        </p>

        <Tip>
          Pré-requisito: as habilidades personalizadas estão disponíveis nos
          planos <strong>Pro</strong>, <strong>Max</strong>,{" "}
          <strong>Team</strong> ou <strong>Enterprise</strong>.
        </Tip>

        <div className="space-y-4">
          <Step n={1} icon={Download} title="Baixe a skill do GitHub">
            <p>
              No repositório, clique em <Path>Code</Path> {"›"}{" "}
              <Path>Download ZIP</Path> e extraia os arquivos no seu computador.
              Dentro dele você encontra uma pasta para cada skill (por exemplo{" "}
              <Path>copywriting</Path>, <Path>seo-audit</Path>,{" "}
              <Path>ads</Path>).
            </p>
          </Step>

          <Step n={2} icon={FolderArchive} title="Compacte a pasta da skill">
            <p>
              Escolha a skill que você quer usar e compacte apenas a pasta dela
              em um arquivo <Path>.zip</Path>. Essa pasta precisa conter o
              arquivo <Path>SKILL.md</Path> — é ele que define a habilidade.
            </p>
          </Step>

          <Step n={3} icon={UploadCloud} title="Adicione a skill no Claude">
            <p>
              No claude.ai, siga esta ordem exata:
            </p>
            <ol className="mt-1 space-y-1.5 list-none">
              <li className="flex items-center gap-2">
                <span className="text-[#D97757] font-semibold">1.</span>
                <Path>Personalizar</Path>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#D97757] font-semibold">2.</span>
                <Path>Habilidades</Path>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#D97757] font-semibold">3.</span>
                <Path>Adicionar</Path>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#D97757] font-semibold">4.</span>
                <Path>Upload de arquivo</Path>
              </li>
            </ol>
            <p className="mt-2">
              Envie o arquivo <Path>.zip</Path> que você criou no passo 2.
            </p>
          </Step>

          <Step n={4} icon={ToggleRight} title="Ative a skill">
            <p>
              Ainda em <Path>Personalizar</Path> {"›"} <Path>Habilidades</Path>,
              use o botão de ligar/desligar ao lado da skill para deixá-la
              ativa. Habilidades desativadas não ficam disponíveis para o
              Claude. Pronto — a partir daqui é só conversar normalmente e o
              Claude usa a habilidade quando fizer sentido.
            </p>
          </Step>
        </div>

        <div className="flex items-start gap-3 rounded-lg bg-[#141416] border border-[#2a2a2e] p-4">
          <ShieldCheck className="h-4 w-4 text-[#D97757] mt-0.5 shrink-0" />
          <p className="text-sm text-[#999] leading-relaxed">
            <span className="text-white font-medium">Segurança:</span> instale
            skills apenas de fontes confiáveis e revise o conteúdo antes de
            ativar — principalmente dependências de código e conexões externas.
          </p>
        </div>

        <div className="flex items-start gap-3 rounded-lg bg-[#D97757]/5 border border-[#D97757]/15 p-4">
          <Crown className="h-4 w-4 text-[#D97757] mt-0.5 shrink-0" />
          <p className="text-sm text-[#bbb] leading-relaxed">
            Depois de instalar a primeira, repita o processo para montar sua
            própria caixa de ferramentas de marketing dentro do Claude.
          </p>
        </div>
      </div>

      {/* ============ FOOTER ============ */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span className="text-[#D97757]">@rafa.grandi</span>
      </p>
    </div>
  );
}
