"use client";

import { useState } from "react";
import { Copy, Check, Palette } from "lucide-react";

const PROMPT = `# BRIEFING: Identidade Visual — "a Fundação"

Você é um diretor de arte sênior especializado em branding para marcas de tecnologia e educação. Sua tarefa é criar uma identidade visual completa para **"a Fundação"**, uma escola de IA brasileira, e apresentá-la em um **único artifact HTML** estilo brand guidelines / style guide interativo.

## CONTEXTO DA MARCA

**Nome:** a Fundação (sempre com "a" minúsculo, como parte da assinatura)
**Categoria:** Escola de Inteligência Artificial
**Posicionamento:** Base estrutural do conhecimento em IA. Não é mais um curso de "prompts mágicos" — é a camada fundacional que separa quem usa IA de quem domina IA.
**Público:** Profissionais técnicos, empreendedores e criadores que querem construir sobre fundamentos sólidos, não atalhos.
**Personalidade:** Sóbria, intelectual, confiante, levemente brutalista. Referências conceituais: Asimov, bibliotecas antigas reinterpretadas em chave futurista, arquitetura modernista, tipografia editorial contemporânea.
**Tom visual:** Editorial + técnico. Nada de gradientes roxos genéricos de IA. Nada de circuitos, cérebros ou robôs. Pense *Kinfolk* encontrando *Wired* — mas com densidade brasileira.

## SISTEMA VISUAL A SER CRIADO

### 1. Logotipo principal
- Wordmark em tipografia serifada contemporânea (ex: inspirações em *Tiempos*, *GT Sectra*, *Canela*, *Migra*) OU sans geométrica densa de alto contraste (ex: *Editorial New*, *PP Editorial*, *Neue Haas Grotesk Display*). Escolha uma direção e justifique.
- O "a" minúsculo deve ter tratamento especial — pode ser destacado por tamanho, cor, itálico ou posicionamento.
- Construir também um **monograma / símbolo** derivado das letras (F, aF, ou uma marca geométrica inspirada em "fundação" — pilar, base, pedra angular, grade modular).

### 2. Variações do logo
- Versão principal (horizontal)
- Versão empilhada
- Monograma isolado
- Versão monocromática (preto / branco)
- Versão em contorno

### 3. Paleta de cores
- Máximo 5 cores
- Uma cor primária de alta personalidade (evite azul tech genérico — considere off-blacks, bone/cream, um acento saturado inesperado)
- Neutros calibrados
- Forneça HEX + nome interno para cada cor

### 4. Tipografia
- Tipografia de display (títulos)
- Tipografia de texto (corpo)
- Tipografia técnica/mono (código, dados, detalhes)
- Especifique pesos e hierarquia com exemplos reais

### 5. Elementos gráficos auxiliares
- Grid / padrão modular (referência à ideia de "fundação")
- Tratamento de números e listas
- Estilo de fotografia/imagem (descrever mood, não gerar imagens)

## APLICAÇÕES OBRIGATÓRIAS (renderizar visualmente)

1. **Cartão de visita** (frente e verso)
2. **Capa de LinkedIn** (formato 1584x396)
3. **Post quadrado de Instagram** (anúncio de aula/conteúdo) — 1:1
4. **Story de Instagram** (9:16) — aviso de início de turma
5. **Certificado de conclusão** (A4 horizontal)
6. **Slide de abertura de aula** (16:9)
7. **Favicon / app icon**
8. **Assinatura de e-mail**
9. **Camiseta / merch** — mockup simples com o monograma

## FORMATO DE ENTREGA

Entregue **um único artifact HTML** estruturado como brand book navegável, com:

- Navegação lateral ou superior entre seções
- Cada seção como um "chapter" bem espaçado (estilo editorial, muito whitespace)
- Todos os elementos do logo renderizados em **SVG inline** (nunca como imagem externa)
- Aplicações renderizadas com HTML/CSS puro — sem imagens externas, tudo vetorial/tipográfico
- Use @import do Google Fonts para carregar as tipografias escolhidas
- Dark mode da página inteiramente preto #0A0A0A com detalhes em bone #F5F0E8 (ou direção equivalente coerente com a identidade escolhida)
- Responsivo e navegável em desktop

## RESTRIÇÕES CRÍTICAS

- ❌ Nada de emojis na identidade
- ❌ Nada de gradientes arco-íris, roxo-azul-rosa tech
- ❌ Nada de ícones de cérebro, circuito, robô, chip
- ❌ Nada de "AI" escrito em glitch, neon ou estilo cyberpunk batido
- ❌ Nada de lorem ipsum — escreva copy real em português brasileiro, no tom da marca
- ✅ Densidade tipográfica, hierarquia editorial, silêncio visual
- ✅ A marca precisa parecer que existiria em uma livraria da Vila Madalena, não em um pitch deck do Vale do Silício

## ENTREGA

Antes do código, escreva 3-4 parágrafos de **rationale criativo** explicando as decisões (direção tipográfica, significado da paleta, conceito do símbolo). Depois entregue o artifact HTML completo.`;

export default function IdVisualPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#F5F0E8]/10 border border-[#F5F0E8]/20 px-4 py-1.5 text-xs font-medium text-[#F5F0E8]">
          <Palette className="h-3.5 w-3.5" />
          Brand Book + Aplicações
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Identidade <span className="text-[#F5F0E8]">Visual</span>
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          Copie o prompt abaixo, cole na IA e receba um brand book completo
          em HTML — logotipo, paleta, tipografia e todas as aplicações da marca.
        </p>
      </div>

      {/* Como usar */}
      <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-3">
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
          Como usar
        </h2>
        <ol className="text-sm text-[#999] space-y-2 list-decimal list-inside">
          <li>Copie o prompt clicando no botão abaixo</li>
          <li>
            Ajuste o contexto da marca (nome, posicionamento, público) se não
            for "a Fundação"
          </li>
          <li>Cole em Claude, ChatGPT ou IA de sua preferência</li>
          <li>
            A IA entrega o rationale criativo + artifact HTML navegável com
            todo o sistema visual
          </li>
        </ol>
      </div>

      {/* Prompt */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
            Prompt
          </h2>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-lg bg-[#F5F0E8] hover:bg-[#e8e0d2] text-[#0A0A0A] text-sm font-medium px-4 py-2 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copiar prompt
              </>
            )}
          </button>
        </div>

        <div className="rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-5 max-h-[500px] overflow-y-auto">
          <pre className="text-sm text-[#ccc] whitespace-pre-wrap font-mono leading-relaxed">
            {PROMPT}
          </pre>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por{" "}
        <span className="text-[#F5F0E8]">@rafa.grandi</span>
      </p>
    </div>
  );
}
