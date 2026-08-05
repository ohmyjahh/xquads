"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Copy,
  FileText,
  Lightbulb,
  Mail,
  Plug,
  Search,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#F43F5E";

const PROMPT_1 = `Procure na internet todas as informacoes disponiveis sobre mim:
sites que expoem dados pessoais, redes sociais, bases de dados,
vazamentos, credenciais expostas e qualquer coisa publica que
possa me comprometer online.

Meus dados para a busca:
- Nome completo: [SEU NOME COMPLETO]
- CPF: [SEU CPF]
- E-mails: [TODOS OS E-MAILS QUE VOCE USA]
- Telefones: [SEUS NUMEROS DE TELEFONE]

Para cada resultado, me devolva:
- Onde apareceu (o site ou serviço) e o link
- Quais dados meus estao expostos ali
- Quem e o responsavel pelo site, se der pra identificar

Nao invente resultados. Se uma busca nao retornar nada, diga que
nao encontrou. Nao coloque nenhuma senha minha nesta conversa;
apenas me avise se identificar que alguma vazou e onde.`;

const PROMPT_2 = `Com base nos lugares onde voce encontrou os meus dados expostos,
escreva um pedido de remocao para cada empresa ou site, solicitando
a retirada imediata dos meus dados pessoais.

Em cada texto, inclua:
- Um pedido claro e educado de exclusao dos meus dados
- O respaldo legal: cite a LGPD (Lei 13.709/2018), em especial o
  art. 18 (direito de eliminacao) e o art. 15 (termino do
  tratamento), quando o responsavel estiver no Brasil
- O prazo de resposta e o que farei se nao houver retorno (levar o
  caso a Autoridade Nacional de Protecao de Dados, a ANPD)

Deixe cada pedido pronto pra enviar, com um assunto de e-mail e o
corpo, adaptado ao tipo de cada site.`;

const PROMPT_3 = `@gmail envie um e-mail para cada uma das empresas com o texto de
remocao que voce escreveu para ela.

Para cada envio:
- Use o endereco de contato ou de privacidade do site
- Coloque o assunto e o corpo correspondentes aquela empresa
- Me mostre para quem esta enviando antes de disparar cada um
- Registre o status (enviado, sem endereco encontrado ou erro) para
  eu acompanhar

Comece por um envio, me mostre como ficou, e depois siga com os
demais.`;

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
      className="inline-flex items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1e] hover:border-[#F43F5E]/60 text-xs font-medium text-[#ccc] px-3 py-1.5 transition-colors cursor-pointer"
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

export default function DadosVazadosPage() {
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
            border: `1px solid ${ACCENT}55`,
          }}
        >
          <ShieldAlert className="h-3.5 w-3.5" />
          Privacidade digital
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Descubra onde os seus{" "}
          <span style={{ color: ACCENT }}>dados vazaram</span> e mande tirar do ar
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          A IA varre a internet atrás do seu nome, CPF, e-mail e telefone, acha
          onde os seus dados estão expostos, escreve o pedido de remoção com
          respaldo na LGPD e ainda dispara os e-mails pra você. Três prompts pra
          limpar a sua pegada.
        </p>
      </div>

      {/* Por que */}
      <section className="space-y-4">
        <SectionTitle icon={Search}>Os seus dados já estão circulando</SectionTitle>
        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            Se você usa a internet, os seus dados já vazaram em algum lugar. É o
            cadastro de uma loja que sofreu invasão, o site que revende lista de
            contatos, a base pública que junta nome, CPF, endereço e telefone numa
            ficha só. Tudo isso fica indexado, e é a matéria prima de golpe, spam e
            clonagem de identidade.
          </p>
          <p>
            O trabalhoso sempre foi achar esses lugares e correr atrás da remoção,
            um por um. A IA faz esse serviço: ela varre a web atrás dos seus dados,
            monta a lista de onde você está exposto, escreve os pedidos de exclusão
            com base na lei e dispara os e-mails. Você só confere e acompanha.
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
          Use com os seus dados, e só com os seus
        </h2>
        <p className="text-sm text-[#bbb] leading-relaxed">
          Isto existe pra você auditar e limpar a sua própria exposição. Rastrear
          os dados de outra pessoa sem autorização é invasão de privacidade e pode
          ser crime. E uma regra de ouro: nunca escreva uma senha sua dentro do
          prompt. Peça pra IA apenas te avisar se identificar que alguma vazou e
          onde, pra você trocar. Confira cada link antes de agir: a IA às vezes
          erra ou inventa resultado.
        </p>
      </section>

      {/* Como usar */}
      <section className="space-y-4">
        <SectionTitle icon={Lightbulb}>O que você precisa</SectionTitle>
        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-3 text-sm text-[#bbb] leading-relaxed">
          <p>
            <span className="font-semibold text-white">Uma IA com acesso à web.</span>{" "}
            O Claude com pesquisa ou o ChatGPT com busca dão conta dos dois
            primeiros prompts.
          </p>
          <p>
            <span className="font-semibold text-white">O conector do Gmail.</span>{" "}
            O terceiro prompt usa o Gmail conectado à IA pra disparar os e-mails. Se
            você não tiver, dá pra copiar os textos e enviar na mão.
          </p>
          <p>
            <span className="font-semibold text-white">Os seus dados à mão.</span>{" "}
            Nome, CPF, e-mails e telefones que você usa. Sem senhas.
          </p>
        </div>
      </section>

      {/* Gate + prompts */}
      {!unlocked ? (
        <LeadGate
          source="dadosvazados-page"
          accent={ACCENT}
          buttonTextColor="#ffffff"
          title="Libere os três prompts"
          description="Insira seus dados para desbloquear os prompts que acham os seus dados vazados, escrevem os pedidos de remoção e enviam os e-mails."
          contentNote="Você vai liberar: o prompt de busca dos seus dados expostos, o que escreve os pedidos de remoção com respaldo na LGPD e o que dispara os e-mails pelo Gmail."
          buttonLabel="Liberar os prompts"
          onUnlock={() => setUnlocked(true)}
        />
      ) : (
        <>
          <div className="flex items-center gap-2 text-sm" style={{ color: ACCENT }}>
            <Sparkles className="h-4 w-4" />
            Prompts liberados. Use os três na mesma conversa, na ordem.
          </div>

          {/* Prompt 1 */}
          <section className="space-y-4">
            <SectionTitle icon={Search}>Prompt 1: encontrar os seus dados</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Abra uma conversa nova, cole o prompt e preencha os seus dados nos
              campos entre colchetes. A IA varre a web e monta a lista de onde você
              aparece. Guarde a conversa: os próximos prompts vão no mesmo fio.
            </p>
            <PromptBlock code={PROMPT_1} copyLabel="Copiar prompt 1" />
          </section>

          {/* Prompt 2 */}
          <section className="space-y-4">
            <SectionTitle icon={FileText}>Prompt 2: os pedidos de remoção</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Com a lista em mãos, peça os textos de remoção. A IA escreve um pedido
              para cada empresa, já citando a LGPD, pronto pra enviar.
            </p>
            <PromptBlock code={PROMPT_2} copyLabel="Copiar prompt 2" />
          </section>

          {/* Passo do Gmail */}
          <section className="space-y-4">
            <SectionTitle icon={Plug}>Antes do prompt 3: conecte o Gmail</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Pra IA disparar os e-mails por você, ela precisa do Gmail conectado.
              No Claude ou no ChatGPT, ative o app ou conector do Gmail e faça login
              na sua conta. Depois é só chamar com @gmail. Se preferir, pule esse
              passo e envie os textos do prompt 2 na mão.
            </p>
          </section>

          {/* Prompt 3 */}
          <section className="space-y-4">
            <SectionTitle icon={Mail}>Prompt 3: enviar os e-mails</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Com o Gmail conectado, cole o prompt. A IA envia o pedido de remoção
              pra cada empresa. Peça pra ela te mostrar cada envio antes de disparar,
              pra você conferir o destinatário.
            </p>
            <PromptBlock code={PROMPT_3} copyLabel="Copiar prompt 3" />
          </section>
        </>
      )}

      {/* CTA */}
      <SalesCta utmContent="dadosvazados" />

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
