"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Copy,
  Eye,
  Lightbulb,
  Puzzle,
  ScanFace,
  Search,
  ShieldAlert,
  Sparkles,
  Trash2,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#38BDF8";

const PROMPT_1 = `Analise esta foto e liste todas as caracteristicas especificas
que me tornam reconhecivel, para que voce consiga me identificar
em qualquer lugar da internet.

Descreva com o maximo de detalhe:
- Formato e estrutura do rosto
- Cor, estilo e comprimento do cabelo
- Cor e formato dos olhos
- Tom de pele
- Tracos marcantes: sardas, cicatrizes, covinhas, pintas, oculos,
  barba, piercings, tatuagens visiveis
- Faixa etaria aproximada e tipo fisico

Guarde essa descricao, porque vou usar ela pra procurar por mim
mesmo na internet nos proximos passos.`;

const PROMPT_2 = `Usando a minha selfie e a descricao que voce acabou de montar,
use o Chrome para fazer busca reversa de imagem do meu rosto nas
principais ferramentas e encontre todos os lugares onde eu apareco
na internet.

Passe o meu rosto pelas ferramentas de busca reversa de imagem
(Google Lens, Bing Visual Search, TinEye e buscadores de rosto) e,
para cada resultado, me devolva:
- O link direto da pagina
- Que tipo de site e
- Se sou eu mesmo, comparando com a descricao do rosto
- O nivel de confianca de que sou eu: alto, medio ou baixo

Nao invente resultados. Se uma busca nao retornar nada, diga que
nao encontrou. Prefiro uma lista curta e verdadeira a uma longa e
inventada. Entregue tudo numa lista unica com o link de cada lugar
onde eu apareco.`;

const PROMPT_3 = `Agora, para cada um desses sites onde eu apareco, escreva um pedido
de remocao personalizado para tirar as minhas fotos do ar.

Para cada site, adapte o pedido ao tipo dele (rede social, site de
empresa, agregador de dados, buscador de rosto ou portal de
noticia) e inclua:
- Um texto educado e direto pedindo a remocao da minha imagem
- A mencao de que a imagem e dado pessoal e que eu nao autorizei o
  uso, citando a LGPD (Lei 13.709/2018) quando o site tiver
  responsavel no Brasil
- O canal certo pra enviar o pedido: formulario da plataforma,
  e-mail de contato, opt out ou encarregado de dados

Deixe cada pedido pronto pra copiar, colar e enviar.`;

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
      className="inline-flex items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1e] hover:border-[#38BDF8]/50 text-xs font-medium text-[#ccc] px-3 py-1.5 transition-colors cursor-pointer"
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

export default function MeuRostoPage() {
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
          <ScanFace className="h-3.5 w-3.5" />
          Privacidade digital
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Peça pro Claude achar{" "}
          <span style={{ color: ACCENT }}>todas as suas fotos</span> na internet
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          Com o conector do navegador ligado, o Claude sobe o seu rosto nas
          ferramentas de busca reversa sozinho e volta com o link de cada lugar
          onde você aparece. Uma selfie e três prompts, e ainda escreve os pedidos
          de remoção pra você.
        </p>
      </div>

      {/* Por que */}
      <section className="space-y-4">
        <SectionTitle icon={Eye}>
          Você não sabe metade dos lugares onde o seu rosto está
        </SectionTitle>
        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            Boa parte do que existe da sua cara na internet não foi você quem
            publicou. É a foto do crachá no site da empresa antiga, a marcação de
            um amigo, o registro de um evento em que você foi plateia, o perfil
            que você criou anos atrás e esqueceu. Cada uma fica indexada, e juntas
            formam um rastro que qualquer pessoa consegue puxar em minutos.
          </p>
          <p>
            Antes, mapear isso dava um trabalho enorme: descrever a sua aparência,
            rodar busca reversa em várias ferramentas na mão, abrir link por link.
            Agora o Claude faz esse serviço pesado sozinho. Com o conector do
            Google Chrome ligado, ele abre o próprio navegador, passa o seu rosto
            pelas buscas reversas e volta com a lista de onde você aparece. Os
            resultados costumam ser honestamente assustadores.
          </p>
        </div>
      </section>

      {/* Instalar o conector */}
      <section className="space-y-4">
        <SectionTitle icon={Puzzle}>Antes: ligue o conector do Chrome</SectionTitle>
        <p className="text-[15px] text-[#aaa] leading-relaxed">
          É o conector que dá ao Claude o navegador próprio pra fazer as buscas. Se
          liga uma vez só e fica valendo. No Claude, faça assim:
        </p>
        <div className="space-y-3">
          {[
            {
              n: "1",
              title: "Abra as configurações do lado esquerdo",
              text: "No painel da esquerda, clique em personalizar e depois em conectores.",
            },
            {
              n: "2",
              title: "Vá em navegar conectores",
              text: "Clique no mais e escolha navegar conectores, pra ver a lista de conectores disponíveis.",
            },
            {
              n: "3",
              title: "Procure Google Chrome e instale",
              text: "Busque por Google Chrome na lista e clique em instalar. Pronto, o Claude ganha o navegador pra trabalhar.",
            },
          ].map((step) => (
            <div
              key={step.n}
              className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5"
            >
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
                style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
              >
                {step.n}
              </div>
              <div className="space-y-1.5">
                <p className="text-sm font-semibold text-white">{step.title}</p>
                <p className="text-sm text-[#999] leading-relaxed">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-2">
          <p className="text-sm font-semibold text-white">O que você precisa</p>
          <p className="text-sm text-[#999] leading-relaxed">
            O Claude com o conector do Chrome ligado e uma selfie nítida, de rosto,
            de frente e com boa luz. A foto sobe pro chat do Claude, nunca pra esta
            página: aqui não existe upload nenhum.
          </p>
        </div>
      </section>

      {/* Aviso etico */}
      <section
        className="rounded-2xl border p-6 space-y-3"
        style={{ borderColor: "#EF444455", backgroundColor: "#EF44440D" }}
      >
        <h2 className="flex items-center gap-2.5 text-lg font-bold text-white">
          <ShieldAlert className="h-5 w-5 shrink-0 text-red-400" />
          Isto é sobre a sua cara, e só sobre a sua
        </h2>
        <p className="text-sm text-[#bbb] leading-relaxed">
          O método existe para você auditar e limpar a própria pegada digital.
          Rodar isso com a foto de outra pessoa para descobrir onde ela aparece ou
          por onde circula não é auditoria de privacidade, é perseguição, e no
          Brasil perseguição é crime desde a Lei 14.132/2021. Use com a sua
          imagem, ou com a de alguém que pediu a sua ajuda e sabe exatamente o que
          você está fazendo.
        </p>
      </section>

      {/* Gate + prompts */}
      {!unlocked ? (
        <LeadGate
          source="meurosto-page"
          accent={ACCENT}
          buttonTextColor="#0b1220"
          title="Libere os três prompts"
          description="Insira seus dados para desbloquear os três prompts: descrever o seu rosto, achar você na internet e escrever os pedidos de remoção."
          contentNote="Você vai liberar: o prompt que descreve o seu rosto, o que faz o Claude rodar a busca reversa pelo navegador e o bônus que escreve os pedidos de remoção de cada site."
          buttonLabel="Liberar os prompts"
          onUnlock={() => setUnlocked(true)}
        />
      ) : (
        <>
          <div className="flex items-center gap-2 text-sm" style={{ color: ACCENT }}>
            <Sparkles className="h-4 w-4" />
            Prompts liberados. Use um de cada vez, no mesmo chat, com a selfie anexada.
          </div>

          {/* Prompt 1 */}
          <section className="space-y-4">
            <SectionTitle icon={ScanFace}>Prompt 1: descreva o seu rosto</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Abra uma conversa nova, anexe a sua selfie e cole o prompt. Guarde
              essa conversa: os próximos dois prompts vão no mesmo fio, porque o
              Claude precisa lembrar da descrição que acabou de montar.
            </p>
            <PromptBlock code={PROMPT_1} copyLabel="Copiar prompt 1" />
          </section>

          {/* Prompt 2 */}
          <section className="space-y-4">
            <SectionTitle icon={Search}>Prompt 2: a busca reversa (o truque)</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Com o conector do Chrome ligado, cole o prompt e deixe o Claude
              trabalhar. Ele abre o próprio navegador, passa o seu rosto pelas
              buscas reversas e volta com os links. Abra cada resultado antes de
              acreditar: a IA às vezes devolve link que não confere.
            </p>
            <PromptBlock code={PROMPT_2} copyLabel="Copiar prompt 2" />
          </section>

          {/* Prompt 3 */}
          <section className="space-y-4">
            <SectionTitle icon={Trash2}>Prompt 3: os pedidos de remoção (bônus)</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Achou onde você aparece? Agora tire do ar. O Claude escreve um pedido
              de remoção sob medida para cada site, já citando a LGPD quando o site
              tem dono no Brasil. É só enviar.
            </p>
            <PromptBlock code={PROMPT_3} copyLabel="Copiar prompt 3" />
          </section>
        </>
      )}

      {/* CTA */}
      <SalesCta utmContent="meurosto" />

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
