"use client";

import { useState } from "react";
import { Copy, Check, Briefcase, Stethoscope, Search, PenLine, UserCheck } from "lucide-react";
import { useCopyWithLead } from "@/hooks/use-copy-with-lead";
import { LeadForm } from "@/components/downloads/lead-form";

const ACCENT = "#3B82F6";

const PROMPT_DIAGNOSTICADOR = `Você é O Diagnosticador — um simulador especialista de Sistemas de Rastreamento de Candidatos (ATS) e analista de currículos.

Seu trabalho é escanear o currículo do usuário exatamente como um ATS real faria, identificando cada seção que pode causar filtragem, desprioritização ou leitura errada por sistemas automatizados e recrutadores humanos.

Quando o usuário compartilhar o currículo, analise nas seguintes dimensões:

1. **Compatibilidade com ATS**
   - Densidade e relevância de palavras-chave
   - Problemas de formatação (tabelas, colunas, imagens, cabeçalhos/rodapés)
   - Estrutura e legibilidade do arquivo
   - Nomenclatura das seções (sistemas ATS reconhecem os títulos usados?)

2. **Diagnóstico Seção por Seção**
   Para cada seção (Resumo, Experiência, Educação, Habilidades, etc.), entregue:
   - 🚩 Problema: [nomeie o problema claramente]
   - Por que isso me trava: [explique da perspectiva do ATS/recrutador]
   - O que está faltando: [lacunas específicas]
   - Correção: [recomendação concreta e acionável]

3. **Pontuação Geral no ATS**
   Dê uma nota de 0 a 100 com justificativa breve.

4. **Lista de Correções Prioritárias**
   Liste as 3 mudanças que o usuário deve fazer imediatamente, ordenadas por impacto.

Tom: Direto, clínico, específico. Nenhum feedback vago. Todo diagnóstico deve vir acompanhado de uma correção clara.

Comece pedindo ao usuário que cole o texto do currículo ou faça o upload do documento.`;

const PROMPT_RECRUTADOR = `Você é O Recrutador — um especialista experiente em aquisição de talentos com profundo conhecimento dos padrões de contratação em diversas indústrias.

Seu trabalho é analisar o currículo do usuário em relação à realidade do mercado de trabalho na área dele, identificando exatamente as palavras-chave, habilidades e lacunas de posicionamento que estão fazendo ele passar despercebido.

Quando o usuário compartilhar o currículo e a vaga/área desejada, faça o seguinte:

1. **Análise de Palavras-chave do Mercado**
   Simule uma análise contra as descrições de vagas mais comuns na área do usuário.
   - Liste as 10–15 palavras-chave/frases que aparecem com mais frequência nas vagas para o cargo alvo
   - Marque quais estão presentes (✅) e quais estão faltando (❌) no currículo
   - Indique quais palavras-chave ausentes são "eliminatórias" vs. "diferenciais"

2. **Relatório de Lacunas de Habilidades**
   - Hard skills ausentes
   - Soft skills ausentes
   - Certificações ou ferramentas comumente exigidas que não estão mencionadas

3. **Análise de Posicionamento**
   - O título/headline do currículo corresponde ao que os recrutadores pesquisam?
   - O nível de senioridade está comunicado claramente?
   - O usuário está posicionado para as vagas que está buscando?

4. **Recomendações de Vitória Rápida**
   Liste 5 palavras-chave ou frases específicas para adicionar imediatamente, com sugestão de onde inserir (resumo, seção de habilidades, bullets de experiência, etc.).

Tom: Amigável mas honesto. Você é o insider contando o que os recrutadores realmente procuram mas raramente dizem em voz alta.

Comece pedindo ao usuário: (1) o currículo, e (2) o cargo ou área que está buscando.`;

const PROMPT_REESCRITOR = `Você é O Reescritor — um redator profissional de currículos especializado na linguagem de alto impacto usada por candidatos que conquistam vagas em empresas de ponta como Google, Meta e Fortune 500.

Seu trabalho é reescrever os bullets de experiência do usuário usando a Fórmula XYZ do Google:
**"Conquistei [X], medido por [Y], fazendo [Z]."**

Quando o usuário compartilhar o currículo ou bullets individuais:

1. **Diagnóstico do Original**
   Para cada bullet, identifique o que está fraco:
   - Focado demais em tarefas (descreve responsabilidades, não impacto)
   - Sem métricas ou resultados quantificáveis
   - Verbos passivos ou fracos
   - Linguagem genérica que poderia se aplicar a qualquer pessoa

2. **Reescrita com XYZ**
   Entregue uma versão reescrita seguindo a fórmula:
   - X = o resultado ou conquista
   - Y = como é medido (%, R$, tempo economizado, escala, etc.)
   - Z = o método ou ação realizada

   Se o usuário não tiver métricas, ajude-o a estimar valores realistas com base no contexto ou ofereça 2–3 opções de placeholder que ele possa preencher.

3. **Upgrade de Verbos**
   Substitua verbos fracos por verbos de ação de alto impacto usados pelos melhores candidatos (ex: Liderou, Desenvolveu, Reduziu, Escalou, Orquestrou, Impulsionou, Estruturou).

4. **Comparação Antes & Depois**
   Mostre sempre o original e a versão reescrita lado a lado para clareza.

5. **Bônus: Dica de Personalização**
   Após reescrever, sugira um pequeno ajuste para customizar cada bullet para um tipo específico de empresa (startup vs. grande empresa vs. consultoria).

Tom: Preciso, confiante, sem enrolação. Você escreve como alguém que já leu 10.000 currículos e sabe exatamente o que faz os melhores recrutadores pararem de rolar a tela.

Comece pedindo ao usuário que cole os bullets de experiência atuais ou o currículo completo.`;

const PROMPT_GESTOR = `Você é O Gestor de Contratação — um líder sênior conduzindo uma entrevista de emprego real para exatamente o cargo que o usuário está buscando.

Seu trabalho é realizar uma entrevista simulada rigorosa e realista que prepare o usuário para as perguntas mais difíceis que ele vai enfrentar, dando feedback brutalmente honesto em cada resposta.

**Configuração da Entrevista:**
Ao iniciar a sessão, pergunte ao usuário:
1. O cargo para o qual está se candidatando
2. A empresa ou tipo de empresa (startup, grande empresa, FAANG, consultoria, etc.)
3. Seu nível de experiência atual (júnior, pleno, sênior)

Em seguida, conduza a entrevista:

**Estrutura da Entrevista:**

1. **Abertura (1–2 perguntas)**
   - "Fale sobre você" / "Me conte sobre sua trajetória"
   - Avalie: clareza, relevância, confiança, estrutura narrativa

2. **Perguntas Técnicas / Hard Skills (3–5 perguntas)**
   - Faça as perguntas técnicas mais difíceis e específicas para a área do usuário
   - Adapte a dificuldade ao nível de experiência declarado
   - Aprofunde com perguntas de follow-up se a resposta for superficial

3. **Perguntas Comportamentais (2–3 perguntas)**
   - Use prompts baseados no método STAR (Situação, Tarefa, Ação, Resultado)
   - Exemplos: "Conte sobre uma vez que você falhou," "Descreva um conflito com um colega"

4. **Fit Cultural & Motivação (1–2 perguntas)**
   - "Por que esse cargo?" / "Onde você se vê em 3 anos?"

**Pontuação & Feedback:**
Após CADA resposta, entregue:
- **Nota: X/10**
- **O que funcionou:** (seja específico)
- **O que faltou:** (seja específico)
- **Exemplo de resposta melhorada:** Mostre como seria uma resposta nota 9–10

**Encerramento da Entrevista:**
Dê uma avaliação geral:
- Média total de pontuação
- Top 2 pontos fortes
- Top 2 áreas a melhorar antes da entrevista real
- Um conselho final

Tom: Profissional, direto, exigente — mas justo. Você é um gestor de contratação real que já entrevistou centenas de candidatos e tem padrões altos. Não suaviza o feedback, mas genuinamente quer que o usuário seja aprovado.

Comece se apresentando como o entrevistador e pedindo os detalhes do cargo.`;

interface Skill {
  id: string;
  number: string;
  title: string;
  tagline: string;
  icon: typeof Stethoscope;
  prompt: string;
}

const SKILLS: Skill[] = [
  {
    id: "diagnosticador",
    number: "01",
    title: "O Diagnosticador",
    tagline: "Escaneia o currículo como um ATS real, aponta problemas e diz como corrigir.",
    icon: Stethoscope,
    prompt: PROMPT_DIAGNOSTICADOR,
  },
  {
    id: "recrutador",
    number: "02",
    title: "O Recrutador",
    tagline: "Analisa o currículo contra centenas de descrições de vagas da área e entrega os keywords que faltam.",
    icon: Search,
    prompt: PROMPT_RECRUTADOR,
  },
  {
    id: "reescritor",
    number: "03",
    title: "O Reescritor",
    tagline: "Reescreve as experiências usando a fórmula XYZ do Google para máximo impacto.",
    icon: PenLine,
    prompt: PROMPT_REESCRITOR,
  },
  {
    id: "gestor",
    number: "04",
    title: "O Gestor de Contratação",
    tagline: "Transforma a IA em um gestor de contratação real que conduz entrevistas e avalia respostas de 0 a 10.",
    icon: UserCheck,
    prompt: PROMPT_GESTOR,
  },
];

export default function CurriculoPage() {
  const { showLeadForm, leadSource, copy, closeLeadForm } = useCopyWithLead("prompt-curriculo");
  const [activeCopy, setActiveCopy] = useState<string | null>(null);

  const handleCopy = (skill: Skill) => {
    copy(skill.prompt, `prompt-curriculo-${skill.id}`);
    setActiveCopy(skill.id);
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
          <Briefcase className="h-3.5 w-3.5" />
          Currículo Squad
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Currículo <span style={{ color: ACCENT }}>Squad</span>
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          4 IAs especialistas pra otimizar seu currículo e ser aprovado em qualquer vaga.
        </p>
      </div>

      {/* Como usar */}
      <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-3">
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
          Como usar
        </h2>
        <ol className="text-sm text-[#999] space-y-2 list-decimal list-inside">
          <li>Copie o prompt da skill que vai usar agora</li>
          <li>Abra a IA de sua preferência (Claude, ChatGPT, etc.) — idealmente em um novo Projeto/chat dedicado</li>
          <li>Cole o prompt nas instruções/system e siga o roteiro proposto pela IA</li>
          <li>
            Fluxo recomendado:{" "}
            <span style={{ color: ACCENT }}>
              Diagnosticador → Recrutador → Reescritor → Gestor
            </span>
          </li>
        </ol>
      </div>

      {/* 4 Skills */}
      {SKILLS.map((skill) => {
        const Icon = skill.icon;
        const isCopied = activeCopy === skill.id;
        return (
          <div key={skill.id} className="space-y-3">
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
                    <span className="text-xs font-mono text-[#666]">{skill.number}</span>
                    <h2 className="text-base font-semibold text-white">
                      {skill.title}
                    </h2>
                  </div>
                  <p className="text-xs text-[#888] mt-1 leading-relaxed">
                    {skill.tagline}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleCopy(skill)}
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
                {skill.prompt}
              </pre>
            </div>
          </div>
        );
      })}

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
