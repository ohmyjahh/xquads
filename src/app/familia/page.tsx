"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Copy,
  GitBranch,
  Image as ImageIcon,
  ListChecks,
  MessagesSquare,
  Search,
  ShieldAlert,
  Sparkles,
  TreePine,
  Users,
  Workflow,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#D9A441";

const PROMPT_1 = `Eu quero que voce crie toda a minha arvore genealogica. Entao me
pergunte tudo que voce precisar saber: nome completo, parentescos,
de onde a minha familia veio e todas as informacoes necessarias.

Va por partes: faca as perguntas em blocos, uma etapa de cada vez,
para eu conseguir responder com calma. Comece por mim e pelos meus
pais, depois avos, e va subindo. Conforme eu responder, monte a
arvore em texto e me mostre como ela esta ficando.`;

const PROMPT_2 = `Com base no meu nome e sobrenome, desenhe toda a minha linhagem
familiar ate onde voce conseguir rastrear.

Inclua:
- A origem e o significado de cada sobrenome
- As regioes e os paises de onde a familia provavelmente veio
- As possiveis rotas de migracao ate chegar onde estamos hoje
- O periodo aproximado de cada etapa

Deixe claro o que e registro e o que e estimativa a partir do
sobrenome, para eu nao confundir suposicao com fato.`;

const PROMPT_3 = `Usando tudo que voce sabe sobre mim, pesquise registros publicos,
bancos de dados de ancestralidade, obituarios e outras fontes
abertas. Reuna informacoes sobre parentes que eu ainda nao sei
que existem.

Para cada pessoa ou informacao que encontrar, me diga:
- O nome e o parentesco provavel
- A fonte de onde tirou aquilo
- O nivel de confianca: alto, medio ou baixo

Regra importante: nao invente. Se uma busca nao retornar nada,
diga que nao encontrou. Prefiro uma lista curta e verdadeira a
uma lista longa e inventada.`;

const PROMPT_4 = `Agora crie uma arvore genealogica visual, em imagem, colocando
todos os pontos que a gente levantou e mostrando como todos nos
conectamos.

Estilo da imagem:
- Organize por geracoes, dos mais antigos no topo aos mais novos embaixo
- Cada pessoa em uma caixa com nome e, quando houver, as datas
- Linhas claras ligando pais, filhos e casais
- Destaque a mim e o caminho direto ate os ancestrais mais antigos
- Visual limpo e legivel, facil de acompanhar de cima para baixo

Se faltar informacao em algum ramo, deixe a caixa marcada como
desconhecida em vez de inventar um nome.`;

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1e] hover:border-[#D9A441]/50 text-xs font-medium text-[#ccc] px-3 py-1.5 transition-colors cursor-pointer"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" style={{ color: ACCENT }} />
          Copiado!
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          {label}
        </>
      )}
    </button>
  );
}

function PromptBlock({ code, copyLabel }: { code: string; copyLabel: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <CopyButton text={code} label={copyLabel} />
      </div>
      <div className="rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-4 overflow-x-auto">
        <pre className="text-[13px] text-[#ccc] font-mono leading-relaxed whitespace-pre-wrap">
          {code}
        </pre>
      </div>
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <h2 className="flex items-center gap-2.5 text-xl sm:text-2xl font-bold text-white tracking-tight">
      <Icon className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
      {children}
    </h2>
  );
}

export default function FamiliaPage() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (hasCapturedLead()) setUnlocked(true);
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
          style={{
            color: ACCENT,
            backgroundColor: `${ACCENT}1A`,
            border: `1px solid ${ACCENT}33`,
          }}
        >
          <TreePine className="h-3.5 w-3.5" />
          Ancestralidade com IA
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Descubra a sua{" "}
          <span style={{ color: ACCENT }}>árvore genealógica</span> com a ajuda
          da IA
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          Quatro prompts em sequência para usar a IA como pesquisadora da sua
          história: ela entrevista você, rastreia a origem dos seus sobrenomes,
          varre registros públicos atrás de parentes que você nem sabia que
          existiam, e no fim desenha a árvore inteira em imagem.
        </p>
      </div>

      {/* Por que */}
      <section className="space-y-4">
        <SectionTitle icon={Users}>
          A sua história cabe em quatro perguntas certas
        </SectionTitle>
        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            Quase todo mundo sabe o nome dos avós e para por aí. Antes disso vira
            névoa: um bisavô que veio de outro país, um sobrenome que ninguém
            sabe de onde saiu, um ramo inteiro da família que se perdeu numa
            mudança de cidade. Essa história existe, está espalhada em registros
            de cartório, listas de imigração, obituários e bancos de
            ancestralidade, só que ninguém tem paciência de garimpar.
          </p>
          <p>
            A IA tem. Ela sabe puxar a origem de um sobrenome, cruzar datas,
            sugerir por onde a sua família migrou e organizar tudo isso numa
            linha do tempo. O que você precisa é pedir na ordem certa, e é isso
            que os quatro prompts abaixo fazem: um entrevista você, um rastreia a
            linhagem, um busca o que você não sabe, e o último transforma o
            resultado numa árvore visual.
          </p>
        </div>
      </section>

      {/* Os 4 prompts (previa) */}
      <section className="space-y-4">
        <SectionTitle icon={Sparkles}>O método em quatro prompts</SectionTitle>
        <div className="space-y-3">
          {[
            {
              n: "1",
              icon: MessagesSquare,
              title: "A entrevista",
              text: "A IA pergunta tudo que precisa saber, em blocos, e vai montando a árvore conforme você responde. Comece por aqui, numa conversa nova, e mantenha ela aberta para os próximos prompts.",
            },
            {
              n: "2",
              icon: GitBranch,
              title: "A linhagem",
              text: "A partir do seu nome e sobrenome, a IA rastreia a origem da família, o significado dos sobrenomes e as prováveis rotas de migração até você.",
            },
            {
              n: "3",
              icon: Search,
              title: "A busca",
              text: "A IA vasculha registros públicos, bancos de ancestralidade e obituários atrás de parentes que você não conhece, sempre dizendo a fonte e o nível de confiança de cada achado.",
            },
            {
              n: "4",
              icon: Workflow,
              title: "A árvore visual",
              text: "Tudo que foi levantado vira uma imagem: a árvore genealógica organizada por gerações, com nomes, datas e as ligações de parentesco.",
            },
          ].map((step) => (
            <div
              key={step.n}
              className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5"
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                {step.n}
              </div>
              <div className="space-y-1.5">
                <p className="flex items-center gap-2 text-sm font-semibold text-white">
                  <step.icon className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                  {step.title}
                </p>
                <p className="text-sm text-[#999] leading-relaxed">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-2">
          <p className="text-sm font-semibold text-white">O que você precisa</p>
          <p className="text-sm text-[#999] leading-relaxed">
            Uma IA com acesso à web e que gere imagem: ChatGPT com busca ou Claude
            com pesquisa resolvem. Tenha à mão o que você já sabe (nomes, datas,
            cidades e países da família), porque quanto mais você alimenta o
            primeiro prompt, mais longe a IA consegue ir nos outros três.
          </p>
        </div>
      </section>

      {/* Aviso */}
      <section
        className="rounded-2xl border p-6 space-y-3"
        style={{ borderColor: "#EF444455", backgroundColor: "#EF44440D" }}
      >
        <h2 className="flex items-center gap-2.5 text-lg font-bold text-white">
          <ShieldAlert className="h-5 w-5 shrink-0 text-red-400" />
          Confira antes de acreditar
        </h2>
        <p className="text-sm text-[#bbb] leading-relaxed">
          Genealogia é onde a IA mais inventa: ela cria nomes, datas e parentescos
          que soam verdadeiros e não existem. Trate tudo o que ela trouxer como
          pista a confirmar, não como certidão. Abra as fontes, cheque os
          registros e confirme com a própria família. E lembre que os dados que
          aparecem são de pessoas reais: use essa pesquisa para conhecer a sua
          história, não para expor a de ninguém.
        </p>
      </section>

      {/* Gate + prompts */}
      {!unlocked ? (
        <LeadGate
          source="familia-page"
          accent={ACCENT}
          buttonTextColor="#121214"
          title="Libere os quatro prompts"
          description="Insira seus dados para desbloquear os quatro prompts prontos da pesquisa genealógica, na ordem certa de usar."
          contentNote="Você vai liberar: o prompt da entrevista, o de rastreio da linhagem, o de busca em registros públicos e o que gera a árvore genealógica em imagem."
          buttonLabel="Liberar os prompts"
          onUnlock={() => setUnlocked(true)}
        />
      ) : (
        <>
          <div className="flex items-center gap-2 text-sm" style={{ color: ACCENT }}>
            <ImageIcon className="h-4 w-4" />
            Prompts liberados. Use um de cada vez, na mesma conversa.
          </div>

          {/* Prompt 1 */}
          <section className="space-y-4">
            <SectionTitle icon={MessagesSquare}>
              Prompt 1: a entrevista
            </SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Abra uma conversa nova e cole o prompt abaixo. A IA vai te fazer
              perguntas em blocos, então responda com calma. Guarde essa conversa:
              os próximos três prompts vão no mesmo fio, porque a IA precisa
              lembrar de tudo que você contou.
            </p>
            <PromptBlock code={PROMPT_1} copyLabel="Copiar prompt 1" />
          </section>

          {/* Prompt 2 */}
          <section className="space-y-4">
            <SectionTitle icon={GitBranch}>Prompt 2: a linhagem</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Na mesma conversa, peça o rastreio da linhagem a partir dos seus
              sobrenomes. Aqui a IA separa o que é registro do que é estimativa,
              então leia com atenção o que ela marca como suposição.
            </p>
            <PromptBlock code={PROMPT_2} copyLabel="Copiar prompt 2" />
          </section>

          {/* Prompt 3 */}
          <section className="space-y-4">
            <SectionTitle icon={Search}>
              Prompt 3: a busca por parentes
            </SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Agora a parte que mais surpreende: a IA procura em registros
              públicos e bancos de ancestralidade por gente que você não conhece.
              A linha que proíbe inventar não é enfeite. Abra cada fonte antes de
              acreditar em qualquer nome novo.
            </p>
            <PromptBlock code={PROMPT_3} copyLabel="Copiar prompt 3" />
          </section>

          {/* Prompt 4 */}
          <section className="space-y-4">
            <SectionTitle icon={ListChecks}>
              Prompt 4: a árvore visual
            </SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Para fechar, peça a imagem. A IA junta tudo que vocês levantaram e
              desenha a árvore por gerações. Se algum ramo ficou incompleto, ela
              marca como desconhecido em vez de preencher com invenção.
            </p>
            <PromptBlock code={PROMPT_4} copyLabel="Copiar prompt 4" />
          </section>
        </>
      )}

      {/* CTA */}
      <SalesCta utmContent="familia" />

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
