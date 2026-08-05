"use client";

import { useEffect, useState } from "react";
import {
  Bot,
  Bug,
  Check,
  Copy,
  Database,
  FileWarning,
  Globe,
  KeyRound,
  Lightbulb,
  Lock,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#EF4444";

const PROMPT = `Você é um engenheiro de segurança sênior (AppSec) fazendo uma
auditoria defensiva COMPLETA do MEU aplicativo, antes de eu
publicar. O objetivo é encontrar e corrigir vulnerabilidades no meu
próprio código, nunca explorar sistemas de terceiros.

Analise TODO o material que eu te der (front-end, back-end, banco
de dados, APIs, configs, variáveis de ambiente, dependências e
arquivos de deploy) e faça uma varredura rigorosa de cada item
abaixo. Não presuma que algo está seguro só porque não apareceu: se
faltar um arquivo pra confirmar, me diga qual.

1. SEGREDOS E CREDENCIAIS
- Chave de API, token, senha ou string de conexão escrita no
  front-end ou no código
- Segredo commitado no repositório ou no histórico do Git
- Uso de chave secreta (service_role, secret key) onde deveria ser
  a chave pública/anon
- Arquivo .env versionado; segredo exposto ao cliente por prefixo
  público de variável de ambiente

2. BANCO DE DADOS E ACESSO A DADOS
- Tabelas sem Row Level Security (RLS) ou com políticas que liberam
  tudo
- Regras públicas por padrão que expõem dados de outros usuários
- Acesso ao banco direto do front-end sem camada de proteção
- Credencial de banco fraca ou padrão; banco acessível pela internet
- Dado sensível sem criptografia em repouso

3. AUTENTICAÇÃO
- Endpoints e rotas sem checagem de login
- Senha guardada sem hash forte (MD5, SHA1 ou texto puro em vez de
  bcrypt ou argon2)
- JWT com segredo fraco ou fixo no código, algoritmo "none", sem
  expiração ou sem validação de assinatura
- Cookie de sessão sem HttpOnly, Secure e SameSite; sessão que não
  expira
- Reset de senha inseguro (token previsível, sem expiração, sem
  invalidar após o uso)
- Sem proteção contra força bruta e contra enumeração de usuário
  (erro que revela se o e-mail existe)
- OAuth ou login social sem validar state e redirect_uri
- Ausência de verificação de e-mail e de MFA em áreas críticas

4. AUTORIZAÇÃO E CONTROLE DE ACESSO
- Usuário acessando ou editando dado de outro trocando um id (IDOR)
- Verificação de permissão feita só no front-end
- Mass assignment: aceitar campo que o usuário não deveria enviar
  (role, is_admin, saldo, preço no corpo da requisição)
- Escalonamento de privilégio; rota de admin sem checagem de papel
- Função ou endpoint sensível acessível por quem não deveria

5. INJEÇÃO
- SQL e NoSQL injection (query montada por concatenação)
- XSS (conteúdo do usuário renderizado sem escapar)
- Command injection (exec ou spawn com input do usuário)
- Path traversal (../ em leitura ou escrita de arquivo)
- Template injection (SSTI) e injeção em cabeçalho HTTP
- Falta de validação e sanitização de input SEMPRE no servidor, não
  só no front

6. SEGURANÇA DE IA E LLM
- Prompt injection: input do usuário conseguindo sobrescrever as
  instruções do sistema
- Chave de API do modelo (OpenAI, Anthropic e outros) exposta no
  front ou sem proteção
- Falta de limite de uso e de custo, permitindo alguém drenar os
  seus créditos de IA
- Saída do modelo renderizada sem sanitizar (XSS vindo da resposta
  da IA)
- Dado sensível ou de outro usuário enviado ao provedor de IA sem
  necessidade
- Ação executada pela IA (deletar, pagar, enviar) sem confirmação
  humana

7. EXPOSIÇÃO DE DADOS E VAZAMENTO
- Mensagem de erro devolvendo stack trace, caminho de arquivo ou
  detalhe interno pro usuário
- API retornando mais campo do que o necessário (hash de senha,
  token, dado interno no JSON)
- Endpoint de listagem sem paginação ou limite, permitindo dump da
  base inteira
- Dado sensível em log, no console, em resposta ou em comentário do
  código
- Dado sensível guardado no localStorage ou sessionStorage do
  navegador

8. REQUISIÇÕES E SSRF
- Server-Side Request Forgery: o servidor fazendo requisição a uma
  URL controlada pelo usuário (importar de URL, proxy de imagem,
  webhook) sem validar o destino
- Falta de bloqueio de endereços internos nessas requisições
- Open redirect: redirecionar pra uma URL fornecida pelo usuário sem
  validar

9. CONFIGURAÇÃO, HEADERS E INFRAESTRUTURA
- CORS liberado pra qualquer origem
- Falta de rate limiting em rota sensível (login, cadastro, envio,
  pagamento, IA)
- Ausência de cabeçalho de segurança (CSP, HSTS, X-Frame-Options
  contra clickjacking, X-Content-Type-Options)
- Ausência de HTTPS/TLS ou conteúdo misto
- Modo debug ligado em produção; rota de debug, admin ou
  documentação aberta
- Source map publicado expondo o código; diretório listável; banner
  revelando versão
- Dependência desatualizada com vulnerabilidade conhecida

10. LÓGICA DE NEGÓCIO E PAGAMENTOS
- Preço, valor ou quantidade validados só no front (manipuláveis na
  requisição)
- Webhook de pagamento sem verificar a assinatura do provedor
- Falta de idempotência e risco de condição de corrida em operação
  financeira ou de estoque
- Cupom, limite ou permissão que dá pra burlar pela requisição

11. PRIVACIDADE E DADOS PESSOAIS (LGPD)
- Coleta de dado pessoal além do necessário
- Dado pessoal sem base legal, sem consentimento ou sem forma de
  exclusão
- PII trafegando ou armazenada sem proteção

Para CADA problema encontrado, entregue:
- Severidade: CRÍTICO, ALTO, MÉDIO ou BAIXO
- Categoria (uma das 11 acima)
- Onde está: arquivo e linha (ou trecho) exato
- Por que é um risco, em uma frase clara
- Como corrigir: a solução concreta, com exemplo de código quando
  fizer sentido

No fim, entregue:
- Um resumo com a contagem por severidade
- A lista do que eu PRECISO corrigir antes de publicar
  (bloqueadores), em ordem de prioridade
- Se algum arquivo faltou pra concluir a análise, diga qual

Seja rigoroso e conservador: na dúvida, aponte o risco em vez de
deixar passar. Não invente vulnerabilidade que não existe no código,
mas não deixe passar nenhuma que exista.`;

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
      className="inline-flex items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1e] hover:border-[#EF4444]/60 text-xs font-medium text-[#ccc] px-3 py-1.5 transition-colors cursor-pointer"
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

export default function AppSeguroPage() {
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
          <ShieldCheck className="h-3.5 w-3.5" />
          Segurança pra quem cria com IA
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Não publique o seu app antes de rodar esse{" "}
          <span style={{ color: ACCENT }}>prompt de segurança</span>
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          Um prompt master que audita o seu app vibe codado e te devolve um
          relatório dos furos de segurança: chave de API exposta no front, tabela
          do banco aberta, erro vazando informação pro usuário e mais. Você corrige
          antes que alguém encontre.
        </p>
      </div>

      {/* Por que */}
      <section className="space-y-4">
        <SectionTitle icon={Bug}>O lado que a IA não te avisa</SectionTitle>
        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            Construir um app com IA ficou fácil e rápido, e é aí que mora o perigo.
            A IA te entrega algo que funciona, mas quase nunca te avisa que a chave
            de API ficou exposta no front-end, que a tabela do banco está aberta pra
            qualquer um ler, ou que uma mensagem de erro está mandando o rastro
            interno do sistema direto pro usuário.
          </p>
          <p>
            Esses furos não aparecem quando você testa: o app abre, faz o que tinha
            que fazer, e parece pronto. Eles aparecem quando alguém mal
            intencionado bate na porta, e aí já era. O certo é auditar antes de
            publicar, e é isso que esse prompt faz em minutos.
          </p>
        </div>
      </section>

      {/* O que checa */}
      <section className="space-y-4">
        <SectionTitle icon={Sparkles}>O que o prompt procura</SectionTitle>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              icon: KeyRound,
              title: "Segredos expostos",
              text: "Chave de API, token ou senha no front-end ou commitados no repositório, e uso de chave secreta onde deveria ser a pública.",
            },
            {
              icon: Database,
              title: "Banco aberto",
              text: "Tabelas sem Row Level Security ou com regras públicas por padrão, expondo os dados de todos os usuários.",
            },
            {
              icon: Lock,
              title: "Autenticação frágil",
              text: "Senha sem hash forte, JWT mal configurado, cookie sem proteção, reset de senha inseguro e login sem defesa contra força bruta.",
            },
            {
              icon: ShieldCheck,
              title: "Falha de autorização",
              text: "Acesso a dados de outro usuário (IDOR), permissão só no front e mass assignment enviando role ou saldo na requisição.",
            },
            {
              icon: FileWarning,
              title: "Injeção e inputs",
              text: "SQL, NoSQL, XSS, command injection, path traversal e falta de validação de input no servidor.",
            },
            {
              icon: Bot,
              title: "Segurança de IA",
              text: "Prompt injection, chave do modelo exposta, sem limite de custo pra não drenarem seus créditos e output da IA sem sanitizar.",
            },
            {
              icon: Globe,
              title: "SSRF e requisições",
              text: "Servidor buscando URL que o usuário controla, sem bloquear endereço interno, e redirecionamento aberto.",
            },
            {
              icon: ScrollText,
              title: "Vazamento e config",
              text: "Erro com stack trace, API devolvendo dado demais, CORS liberado, sem rate limiting, headers de segurança e webhook de pagamento sem assinatura.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-2"
            >
              <item.icon className="h-5 w-5" style={{ color: ACCENT }} />
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-[#888] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="text-[13px] text-[#777] leading-relaxed">
          São 11 categorias no total, cobrindo os principais padrões de falha do
          OWASP para web, APIs e aplicações de IA.
        </p>
      </section>

      {/* Como usar */}
      <section className="space-y-4">
        <SectionTitle icon={Lightbulb}>Como usar</SectionTitle>
        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-3 text-sm text-[#bbb] leading-relaxed">
          <p>
            <span className="font-semibold text-white">No Claude Code, Cursor ou similar:</span>{" "}
            com o projeto aberto, cole o prompt e deixe a IA analisar o código
            inteiro. É a forma mais completa, porque ela enxerga todos os arquivos.
          </p>
          <p>
            <span className="font-semibold text-white">No Claude ou ChatGPT web:</span>{" "}
            cole o prompt e anexe os arquivos principais do app (o código do
            front, do back, as configs e o schema do banco). Quanto mais você der,
            mais fundo vai a auditoria.
          </p>
          <p className="flex items-start gap-2 text-[#999]">
            <Terminal className="h-4 w-4 shrink-0 mt-0.5" style={{ color: ACCENT }} />
            Depois do relatório, peça pra IA corrigir um furo de cada vez, começando
            pelos críticos, e teste o app a cada correção.
          </p>
        </div>
      </section>

      {/* Gate + prompt */}
      {!unlocked ? (
        <LeadGate
          source="appseguro-page"
          accent={ACCENT}
          buttonTextColor="#ffffff"
          title="Libere o prompt de auditoria"
          description="Insira seus dados para desbloquear o prompt master completo que audita a segurança do seu app antes de publicar."
          contentNote="Você vai liberar: o prompt master pronto pra copiar, que varre o seu código nas 11 categorias de risco (chave exposta, banco aberto, IA, SSRF, injeção e mais) e devolve um relatório por severidade com a correção de cada um."
          buttonLabel="Liberar o prompt"
          onUnlock={() => setUnlocked(true)}
        />
      ) : (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm" style={{ color: ACCENT }}>
            <ShieldCheck className="h-4 w-4" />
            Prompt liberado. Rode no seu código antes de publicar.
          </div>
          <SectionTitle icon={ShieldCheck}>O prompt master de auditoria</SectionTitle>
          <p className="text-[15px] text-[#aaa] leading-relaxed">
            Copie e cole na IA com o seu código junto. Ele te devolve o relatório
            dos furos, por gravidade, com onde está e como corrigir cada um. Rode
            sempre antes de colocar um app no ar.
          </p>
          <PromptBlock code={PROMPT} copyLabel="Copiar prompt" />
        </section>
      )}

      {/* CTA */}
      <SalesCta utmContent="appseguro" />

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
