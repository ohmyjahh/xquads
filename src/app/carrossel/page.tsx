"use client";

import { useState } from "react";
import { Copy, Check, Layers } from "lucide-react";

const PROMPT = `Analise os prints que estou enviando. Sao slides de um carrossel de Instagram de referencia. Quero que voce extraia o padrao visual e de conteudo e crie uma predefinicao completa — um documento tecnico que serve como blueprint para recriar esse estilo em qualquer tema.

Analise CADA detalhe dos prints e documente no formato abaixo. Nao invente — so documente o que voce VE nos prints.

---

## Estrutura obrigatoria da predefinicao:

### 1. Titulo e Conceito
- De um nome descritivo para o estilo (ex: "Carrossel Editorial", "Tech Tutorial", "Tweet Thread")
- Descreva o conceito em 2-3 frases: qual a estetica, a quem se destina, qual a sensacao visual

### 2. Formato
- Dimensao: 1080x1350px (retrato Instagram)
- Quantidade de slides observada

### 3. Sistema de Cores
Tabela com TODOS os elementos e suas cores exatas (extraia os hex dos prints):
- Fundo(s) — pode ter mais de um se alterna claro/escuro
- Cor accent/destaque
- Texto principal
- Texto secundario
- Bordas, cards, elementos decorativos
- Qualquer outra cor que aparecer

**Regras de accent:** como a cor de destaque e aplicada em cada tipo de fundo

**Regra de Contraste (OBRIGATORIA):**
- Fundo claro -> texto NUNCA pode ser claro. Usar sempre texto escuro ou accent escuro.
- Fundo escuro -> texto NUNCA pode ser escuro. Usar sempre texto claro ou accent vibrante.
- O texto deve SEMPRE ter contraste alto com o fundo. Sem excecao.

### 4. Tipografia
Tabela com:
- Cada uso (headline, body, labels, etc.)
- Tipo de fonte observado (serif, sans-serif, monospace, system font)
- Peso (bold, regular, light)
- Tamanho aproximado em px
- Qualquer regra especial (uppercase, letter-spacing, etc.)

### 5. Elementos Visuais Recorrentes
Liste CADA elemento visual que aparece nos slides:
- Descreva forma, cor, tamanho, posicao
- Quando e usado (em todos os slides? so em alguns?)
- Exemplos: grid de fundo, icones, avatares, mockups, bordas, setas, dots, badges, botoes, fotos, shapes decorativos

### 6. Estrutura dos Slides
Para CADA tipo de slide diferente que voce observar, crie um diagrama ASCII mostrando o layout:

Inclua:
- Slide de capa
- Slides de conteudo (cada variacao)
- Slide de CTA/fechamento
- Qual fundo cada tipo usa

### 7. Regras de Alternancia de Fundo
- Qual a sequencia de fundos claro/escuro? E fixa ou variavel?
- Tabela mapeando tipo de slide -> fundo

### 8. Componentes Modulares (se houver)
Se os slides usam componentes reutilizaveis (cards, listas, terminais, mockups, etc.):
- Liste cada componente
- Descreva quando usar cada um
- Regra: nunca repetir o mesmo componente em slides consecutivos

### 9. Estilo de Conteudo
- Tom de voz (educacional, editorial, provocativo, tutorial, casual, etc.)
- Tipo de frases (curtas, longas, paragrafos, bullets, etc.)
- O que USAR (dados, nomes, numeros, perguntas, etc.)
- O que NAO usar (emojis, hashtags, bullets, etc.)
- Como e o CTA (botao, frase, comentario, nenhum)

### 10. Regras de Aplicacao
Lista numerada de regras que DEVEM ser seguidas ao criar um carrossel nesse estilo. Inclua:
- Restricoes de layout
- Limites de accent por slide
- Regras de imagem (se houver)
- Regras de texto
- O que nunca fazer

### 11. Diferencas de Outros Estilos (opcional)
Se voce conhece os estilos abaixo, adicione uma tabela comparativa:
- Editorial (fundo alternado, Playfair + Inter, fotos de CEOs, tom jornalistico)
- Tech Tutorial (terminal mockup, graph paper, sans-serif black, passos numerados)
- Tweet Thread (fundo escuro fixo, system font, simulacao de tweet, sem accent)

---

## Regras para voce seguir:

1. **So documente o que voce VE nos prints.** Nao invente elementos que nao estao la.
2. **Extraia cores reais.** Tente identificar os hex codes a partir do que voce observa. Se nao tiver certeza, indique "aproximado".
3. **Seja preciso nos tamanhos.** Estime em pixels baseado na proporcao do slide (1080x1350).
4. **Use diagramas ASCII** para layouts — nao apenas descreva, MOSTRE a posicao dos elementos.
5. **A predefinicao deve ser um blueprint autonomo** — alguem que nunca viu os prints deve conseguir recriar o estilo so lendo o documento.
6. **A regra de contraste e OBRIGATORIA** — se nos prints o autor errou o contraste, corrija na predefinicao.
7. **Formato do arquivo:** Markdown (.md), mesmo formato dos exemplos.`;

export default function CarrosselPage() {
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
        <div className="inline-flex items-center gap-2 rounded-full bg-[#EA8049]/10 border border-[#EA8049]/20 px-4 py-1.5 text-xs font-medium text-[#EA8049]">
          <Layers className="h-3.5 w-3.5" />
          Gerador de Predefinicoes
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Carrossel <span className="text-[#EA8049]">Prompt</span>
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          Copie o prompt abaixo, cole na IA junto com os prints de um carrossel
          de referencia, e ela vai gerar uma predefinicao completa do estilo.
        </p>
      </div>

      {/* Como usar */}
      <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-3">
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
          Como usar
        </h2>
        <ol className="text-sm text-[#999] space-y-2 list-decimal list-inside">
          <li>
            Copie o prompt clicando no botao abaixo
          </li>
          <li>
            Abra a IA de sua preferencia (Claude, ChatGPT, etc.)
          </li>
          <li>
            Cole o prompt e suba os prints do carrossel de referencia
          </li>
          <li>
            A IA vai analisar e gerar a predefinicao completa em Markdown
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
            className="inline-flex items-center gap-2 rounded-lg bg-[#EA8049] hover:bg-[#d4703d] text-white text-sm font-medium px-4 py-2 transition-colors cursor-pointer"
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
        <span className="text-[#EA8049]">@rafa.grandi</span>
      </p>
    </div>
  );
}
