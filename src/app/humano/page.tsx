"use client";

import { useState } from "react";
import { Copy, Check, PenLine, Sparkles, Search, Wand2, FileCheck2 } from "lucide-react";
import { useCopyWithLead } from "@/hooks/use-copy-with-lead";
import { LeadForm } from "@/components/downloads/lead-form";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#F59E0B";

const PROMPT_ATIVAR = `De agora em diante, humanize tudo que você escrever pra mim. Nada pode ter cara de texto gerado por IA.

Isso vale pra qualquer coisa que uma pessoa vai ler: post e legenda de Instagram, roteiro, VSL, copy de anúncio, e-mail, mensagem de WhatsApp, página de vendas, bio, artigo. Mesmo quando eu não pedir "humaniza", aplique.

Antes da gente fechar isso como regra, me responde uma coisa: o que faz um texto parecer escrito por máquina? Lista os padrões que você reconhece — as construções, as palavras, os vícios de formatação. Quero ver se estamos alinhados antes de você começar a escrever.`;

const PROMPT_PESQUISAR = `Agora vá na Wikipedia e abra a página do WikiProject AI Cleanup chamada "Signs of AI writing".

Leia ela inteira e extraia todos os padrões que ela aponta como sinal de texto gerado por IA — construções retóricas, vocabulário marcado, vícios de formatação, estrutura e tom de chatbot.

Me devolve o catálogo completo, organizado por categoria. Para cada padrão: o nome, por que ele denuncia a IA, um exemplo do erro e a versão reescrita de um jeito humano em português. Não resume nem corta nada — quero a lista inteira, porque no próximo passo vou transformar isso numa regra permanente sua.`;

const PROMPT_SKILL = `/skill-creator

Pega tudo que a gente levantou sobre escrita humanizada e transforma numa skill.

Nome: humano

A skill precisa:
- Acionar sozinha sempre que for escrever ou reescrever qualquer texto que uma pessoa vai ler (post, legenda, roteiro, VSL, copy, e-mail, mensagem, página de vendas, bio, artigo) — mesmo sem eu pedir humanização
- NÃO acionar pra código, dados, planilha ou resposta técnica de chat
- Listar cada padrão que entrega a IA, com o exemplo ruim e o que escrever no lugar
- Fechar com um checklist rápido pra rodar antes de me entregar qualquer texto

Escreve as regras de um jeito acionável, não teórico. É pra usar todo dia.`;

const SKILL_PRONTA = `---
name: humano
description: Regras de escrita humanizada para remover os sinais de IA de qualquer texto em português. Use SEMPRE que for escrever, reescrever ou editar texto destinado a publicação ou comunicação, como posts e legendas de Instagram, roteiros, VSL, copy de anúncio, e-mails, mensagens de WhatsApp e broadcast, artigos, ebooks, descrições de produto, páginas de vendas, bios e documentos. Acione mesmo quando o usuário não pedir humanização de forma explícita; se o pedido envolve produzir texto que uma pessoa vai ler, aplique estas regras. Não acione para código, dados, planilhas ou respostas puramente técnicas de chat.
---

# Humano — escrita sem cara de IA

Catálogo de padrões que denunciam texto gerado por IA (baseado no "Signs of AI writing" da Wikipedia / WikiProject AI Cleanup) e o que fazer no lugar. O alvo não é "burlar detector" — é escrever de um jeito que soe como gente, direto e com voz própria.

## Princípio

Isto não é uma lista de palavras proibidas. São padrões de frequência e automatismo. Travessão, triplete, gerúndio: nenhum é errado isolado. O problema é a IA cair neles no automático, sempre, em todo parágrafo. Use qualquer recurso de propósito e pontual quando o ritmo pedir — nunca no piloto automático. Na dúvida, prefira a versão mais simples e direta.

Antes de entregar qualquer texto, rode o checklist do fim. Se passar batido em algum item, reescreva o trecho.

## 1. Construções retóricas (os tells mais fortes)

Negação / paralelismo negativo. O tell número um. Não escrever "não é X, é Y", "não se trata de X, e sim de Y", "mais do que X, é Y".
- Ruim: "Isso não é um curso. É uma transformação."
- Bom: "Esse curso muda como você vende. Ponto."

A versão esticada em duas frases também conta:
- Ruim: "Ele começou pequeno. Hoje, no entanto, comanda uma operação que fatura milhões."

Regra de três. Não empilhar três adjetivos nem fechar toda lista com exatamente três itens por reflexo.
- Ruim: "Uma ferramenta inovadora, poderosa e transformadora."
- Bom: "Uma ferramenta que resolve um problema chato em dois cliques."

Falsas escalas / ranges vazios. Não usar "de X a Y" quando não existe espectro real, só duas coisas soltas.
- Ruim: "De pequenos negócios a grandes corporações, todo mundo precisa disso."

## 2. Linguagem e tom

Puffery (elogio vazio). Cortar "renomado", "líder de mercado", "referência no setor", "icônico", "revolucionário", "de ponta" quando não há dado que sustente. Mostrar o fato, deixar o leitor concluir.

Comentário de "significância" no fim, normalmente com gerúndio. A IA gruda uma análise vazia no fim da frase. Cortar.
- Ruim: "Ele lançou o produto em 2020, consolidando sua posição no mercado."
- Ruim: "...revolucionando a forma como as pessoas trabalham."
- Bom: "Ele lançou o produto em 2020. Vendeu 10 mil cópias no primeiro mês."

Inserção editorial de opinião. Cortar "é importante notar que", "vale ressaltar", "vale lembrar que", "é interessante observar", "nenhuma conversa estaria completa sem". Se o ponto importa, vá direto nele.

Atribuição vaga. Não escrever "especialistas afirmam", "estudos mostram", "muitos acreditam" sem dizer quem ou qual. Ou nomeia a fonte, ou corta.

Formalidade desnecessária. Preferir a palavra simples: "usar" no lugar de "utilizar", "morreu" no lugar de "faleceu/partiu", "ajudar" no lugar de "auxiliar", "sobre" no lugar de "acerca de", "fazer" no lugar de "realizar".

## 3. Vocabulário marcado de IA (PT-BR)

Evitar como muleta (não banir, mas desconfiar quando aparecem): mergulhar/aprofundar-se, tapeçaria, intrincado, crucial, fundamental, fomentar, robusto, aprimorar, panorama/cenário, no cerne de, pavimentar o caminho, desbloquear (potencial), elevar (ao próximo nível), navegar (por desafios), abraçar (a mudança), jornada, alavancar, holístico, sinergia, em constante evolução, paisagem (do mercado), testemunho (de), ressoar.

## 4. Formatação

Negrito. Só com intenção. Não negritar termo-chave em toda frase como se fosse apostila. Negrito demais vira padrão que o leitor liga a IA.

Listas. Não transformar em lista o que cabe num parágrafo. Não usar o formato "Termo: definição do termo" repetido. Lista serve quando os itens são paralelos e a pessoa vai escanear — não como enfeite.

Travessão. Não usar travessão pra ênfase onde vírgula, parêntese ou ponto resolvem. A IA abusa do travessão; escrita humana comum usa bem menos.

Emoji em título. Não. Emoji solto no meio do texto, só se o canal e a voz pedirem (ex: legenda de Instagram informal), e com parcimônia.

Capitalização. Título em português é com inicial maiúscula só na primeira palavra e nomes próprios — não Title Case Em Toda Palavra.

## 5. Estrutura

Esqueleto formulaico. Não forçar seções genéricas tipo "Desafios", "Benefícios", "Perspectivas Futuras", "Conclusão" em qualquer assunto. A estrutura segue o conteúdo, não um molde.

Fechamento tipo redação escolar. Cortar a conclusão que reafirma tudo e elogia. Nada de "Em um mundo cada vez mais digital...", "Ao final, fica claro que...".

Resumo compulsivo. Não abrir o último parágrafo com "No geral", "Em resumo", "Em conclusão", "Em suma" repetindo o que já foi dito — ainda mais em texto curto que não precisa de resumo.

## 6. Tells de chatbot

- Disclaimers de IA: "até minha data de corte", "como uma IA", "não tenho acesso a", "não posso navegar".
- Quebra de quarta parede / servilismo: "Claro! Aqui está...", "Espero que isso ajude!", "Fico à disposição!", "Ótima pergunta!".
- Obsessão com soar científico: uso forçado de "baseado em evidências", "empírico", "comprovadamente", "dados mostram" pra dar falsa autoridade.

## O que fazer no lugar (voz humana)

- Ritmo variado. Misturar frase curta com longa. Frase de uma palavra às vezes. Isso sozinho já tira metade da cara de robô.
- Voz ativa e sujeito concreto. Quem faz o quê. Menos nominalização ("a realização da otimização" → "otimizar").
- Opinião e ponto de vista quando o contexto permite. Texto humano se posiciona; texto de IA fica em cima do muro.
- Concretude. Número específico, exemplo real, nome próprio — no lugar de adjetivo genérico.
- Escrever como a pessoa fala. Contração, gíria pontual, pergunta retórica de verdade. Ler em voz alta: se travou ou soou empolado, reescrever.
- Imperfeição proposital. Começar frase com "E" ou "Mas". Parágrafo de uma linha. Tudo isso é humano.

## Checklist antes de entregar

1. Tem algum "não é X, é Y" (ou variação em duas frases)? Reescrever.
2. Tem triplete de adjetivos ou lista de exatamente três por reflexo? Quebrar o padrão.
3. Tem gerúndio de "significância" no fim de frase ("consolidando", "transformando", "revolucionando")? Cortar.
4. Tem "é importante notar", "vale ressaltar", "no geral", "em conclusão"? Cortar.
5. Tem palavra-muleta da lista da seção 3? Trocar por palavra simples.
6. Negrito, travessão ou lista demais? Enxugar.
7. Todas as frases têm tamanho parecido? Variar o ritmo.
8. Li em voz alta e soou como gente falando? Se não, mexer.

Se o usuário tiver uma amostra da própria escrita, calibrar o tom por ela — as regras acima tiram a cara de IA; a voz específica vem do material de referência dele.`;

interface Step {
  id: string;
  number: string;
  title: string;
  tagline: string;
  icon: typeof Sparkles;
  prompt: string;
}

const STEPS: Step[] = [
  {
    id: "ativar",
    number: "01",
    title: "Ativar a humanização",
    tagline: "Declara a regra e faz a IA revelar o que ela acha que tem cara de robô — pra vocês alinharem antes de começar.",
    icon: Sparkles,
    prompt: PROMPT_ATIVAR,
  },
  {
    id: "pesquisar",
    number: "02",
    title: "Puxar os padrões da Wikipedia",
    tagline: 'Manda a IA ler o "Signs of AI writing" e trazer o catálogo completo de sinais de IA, com exemplo e correção.',
    icon: Search,
    prompt: PROMPT_PESQUISAR,
  },
  {
    id: "skill",
    number: "03",
    title: "Criar a skill com o /skill-creator",
    tagline: 'Empacota tudo numa skill permanente chamada "humano", que aciona sozinha toda vez que você for escrever.',
    icon: Wand2,
    prompt: PROMPT_SKILL,
  },
  {
    id: "pronta",
    number: "04",
    title: "A skill pronta (atalho)",
    tagline: "Não quer fazer os 3 passos? Copia a skill inteira já montada e salva direto no teu Claude.",
    icon: FileCheck2,
    prompt: SKILL_PRONTA,
  },
];

export default function HumanoPage() {
  const { showLeadForm, leadSource, copy, closeLeadForm } = useCopyWithLead("prompt-humano");
  const [activeCopy, setActiveCopy] = useState<string | null>(null);

  const handleCopy = (step: Step) => {
    copy(step.prompt, `prompt-humano-${step.id}`);
    setActiveCopy(step.id);
    setTimeout(() => setActiveCopy(null), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">
      {showLeadForm && (
        <LeadForm
          onClose={closeLeadForm}
          source={leadSource}
          type="copy"
          onSuccess={closeLeadForm}
        />
      )}

      {/* Header */}
      <div className="text-center space-y-3">
        <div
          className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium"
          style={{
            color: ACCENT,
            backgroundColor: `${ACCENT}1A`,
            borderColor: `${ACCENT}33`,
          }}
        >
          <PenLine className="h-3.5 w-3.5" />
          Escrita Humanizada
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Escrita <span style={{ color: ACCENT }}>Humana</span>
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          3 prompts em sequência pra criar sua própria skill que tira a cara de IA de tudo que você escreve.
        </p>
      </div>

      {/* Como usar */}
      <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-3">
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
          Como usar
        </h2>
        <ol className="text-sm text-[#999] space-y-2 list-decimal list-inside">
          <li>Abra o Claude Code num projeto (as skills ficam salvas pra sempre)</li>
          <li>Cole o Passo 01, depois o 02, depois o 03 — um de cada vez, no mesmo chat</li>
          <li>No fim do Passo 03 a skill <span style={{ color: ACCENT }}>humano</span> nasce sozinha e passa a rodar em todo texto</li>
          <li>Com pressa? Pula pro Passo 04 e cola a skill já pronta direto</li>
        </ol>
      </div>

      {/* 4 Passos */}
      {STEPS.map((step) => {
        const Icon = step.icon;
        const isCopied = activeCopy === step.id;
        return (
          <div key={step.id} className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${ACCENT}1A` }}
                >
                  <Icon className="h-5 w-5" style={{ color: ACCENT }} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#666]">{step.number}</span>
                    <h2 className="text-base font-semibold text-white">
                      {step.title}
                    </h2>
                  </div>
                  <p className="text-xs text-[#888] mt-1 leading-relaxed">
                    {step.tagline}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleCopy(step)}
                className="shrink-0 inline-flex items-center gap-2 rounded-lg text-white text-sm font-medium px-4 py-2 transition-colors cursor-pointer"
                style={{ backgroundColor: ACCENT }}
              >
                {isCopied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copiar
                  </>
                )}
              </button>
            </div>

            <div className="rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-5 max-h-[400px] overflow-y-auto">
              <pre className="text-sm text-[#ccc] whitespace-pre-wrap font-mono leading-relaxed">
                {step.prompt}
              </pre>
            </div>
          </div>
        );
      })}

      {/* CTA */}
      <SalesCta utmContent="humano" />

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
