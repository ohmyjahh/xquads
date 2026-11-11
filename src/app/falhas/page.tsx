"use client";

import { useState, useSyncExternalStore } from "react";
import { ShieldAlert, ArrowUpRight, Copy, AlertTriangle, CheckCircle2 } from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#F87171";

const ALERTAS = [
  "Teste só no que é seu, ou onde você tem autorização por escrito. Mexer em sistema de terceiros sem permissão pode dar problema sério.",
  "Esta lista é uma triagem, não uma auditoria profissional. Se o app guarda dado de cliente ou recebe pagamento, vale pagar uma revisão de quem entende.",
  "Se uma chave ou senha já apareceu onde não devia (no código, no navegador ou num print), trate como comprometida: gere uma nova no provedor e revogue a antiga.",
];

type Falha = {
  n: string;
  nome: string;
  oQueE: string;
  testar: string;
  corrigir: string;
  fonte: { nome: string; url: string };
};

const FALHAS: Falha[] = [
  {
    n: "1",
    nome: "Chave secreta no navegador",
    oQueE:
      "No Next.js, só as variáveis com o prefixo NEXT_PUBLIC_ vão para o navegador, e elas ficam embutidas no JavaScript que qualquer visitante baixa. Se uma chave secreta ganhou esse prefixo, ou foi escrita direto no código da tela, ela está pública.",
    testar:
      "Abra o seu site, abra as ferramentas do navegador (F12), vá em Fontes ou Rede e procure pelos primeiros caracteres da chave. Outra forma: depois do build, procure a chave nos arquivos gerados para o navegador.",
    corrigir:
      "Faça a chamada que usa a chave dentro de uma rota do servidor, use uma variável sem NEXT_PUBLIC_ e gere uma chave nova, porque a antiga já era pública.",
    fonte: {
      nome: "Next.js: variáveis de ambiente",
      url: "https://nextjs.org/docs/app/guides/environment-variables",
    },
  },
  {
    n: "2",
    nome: "Banco aberto",
    oQueE:
      "No Supabase, a documentação manda ligar o Row Level Security (RLS) em toda tabela exposta pela API. Sem isso, a tabela fica legível e gravável por qualquer um que tenha a chave pública. A chave service_role ignora o RLS e deve ficar só no servidor.",
    testar:
      "Sem fazer login, use a chave pública do projeto para pedir os dados de cada tabela pela API. Se voltarem linhas que um visitante anônimo não deveria ver, o banco está aberto. No painel, confira se o RLS está ligado em cada tabela.",
    corrigir:
      "Ligue o RLS, crie as policies que dizem quem lê e quem escreve cada linha e revise as permissões. Se você usa outro banco, a ideia é a mesma: nenhuma tabela legível por visitante anônimo sem uma regra.",
    fonte: {
      nome: "Supabase: Row Level Security",
      url: "https://supabase.com/docs/guides/database/postgres/row-level-security",
    },
  },
  {
    n: "3",
    nome: "Ver ou mexer no dado de outro usuário",
    oQueE:
      "É o primeiro item do OWASP Top 10 de 2025 (Broken Access Control). Exemplos da própria OWASP: trocar o número da conta na URL e abrir a conta de outra pessoa, abrir uma página de admin digitando o endereço, ou proteger algo só escondendo na tela.",
    testar:
      "Crie dois usuários. Logado como o primeiro, copie o endereço ou a requisição de um dado dele e troque o identificador pelo do segundo. Tente abrir a página de admin sem ser admin. Tente a mesma ação direto pelo terminal, sem passar pela tela.",
    corrigir:
      "Cheque no servidor, em toda leitura e escrita, se o registro pertence a quem está pedindo. Negue por padrão e libere só o necessário. Esconder o botão não protege nada.",
    fonte: {
      nome: "OWASP Top 10:2025, A01 Broken Access Control",
      url: "https://top10.owasp.org/2025/A01_2025-Broken_Access_Control/",
    },
  },
  {
    n: "4",
    nome: "Upload sem checagem",
    oQueE:
      "Aceitar qualquer arquivo de qualquer tamanho e guardar com o nome que o usuário mandou. O tipo declarado pelo navegador pode ser forjado.",
    testar:
      "Tente enviar um arquivo muito grande e um arquivo com a extensão trocada (por exemplo, um texto renomeado para imagem). Se o app aceita, falta checagem.",
    corrigir:
      "Defina um limite de tamanho, valide o tipo real do arquivo, gere você mesmo o nome (um identificador aleatório), guarde fora da pasta pública e deixe só usuário autorizado enviar.",
    fonte: {
      nome: "OWASP: File Upload Cheat Sheet",
      url: "https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html",
    },
  },
  {
    n: "5",
    nome: "Consulta montada com o texto do usuário",
    oQueE:
      "Juntar o que a pessoa digitou direto no comando do banco. A OWASP diz que concatenar valor não confiável na consulta anula a proteção.",
    testar:
      "Nos campos de busca e de login, digite uma aspa simples. Se aparecer erro do banco ou o comportamento mudar, a consulta está sendo montada na mão.",
    corrigir:
      "Use consultas parametrizadas: o comando fica separado dos valores, e o banco recebe os valores por fora. Nome de tabela e coluna não entram como parâmetro: escolha de uma lista fixa.",
    fonte: {
      nome: "OWASP: SQL Injection Prevention Cheat Sheet",
      url: "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html",
    },
  },
  {
    n: "6",
    nome: "Webhook sem verificar a assinatura",
    oQueE:
      "O webhook é o endereço que recebe aviso de pagamento. Se o app aceita qualquer requisição nesse endereço, qualquer um pode fingir que pagou. A Stripe, por exemplo, assina cada evento e manda o header Stripe-Signature.",
    testar:
      "Envie uma requisição falsa para o endereço do webhook, sem a assinatura. Ela precisa ser recusada. Se o app processou, falta a verificação.",
    corrigir:
      "Verifique a assinatura com o segredo do endpoint antes de processar qualquer evento. Na Stripe isso usa o corpo bruto da requisição. Outros provedores têm um mecanismo parecido: confira a documentação do seu.",
    fonte: {
      nome: "Stripe: webhooks",
      url: "https://docs.stripe.com/webhooks",
    },
  },
  {
    n: "7",
    nome: "Pacote ou ferramenta adulterada",
    oQueE:
      "A OWASP chama de falha na cadeia de suprimentos: código, ferramenta ou dependência de terceiros alterada de forma maliciosa. Instalar sem olhar é a porta de entrada.",
    testar:
      "Rode o npm audit no projeto: ele pede um relatório de vulnerabilidades conhecidas nas dependências. Liste os pacotes que o app instalou e pergunte de cada um: eu preciso disso, e de onde ele veio?",
    corrigir:
      "Atualize o que o relatório apontar, remova dependência que ninguém usa, instale só de fontes oficiais e nunca rode projeto, teste técnico ou ferramenta que um desconhecido mandou sem ler antes.",
    fonte: {
      nome: "OWASP Top 10:2025, A03 Software Supply Chain Failures",
      url: "https://top10.owasp.org/2025/A03_2025-Software_Supply_Chain_Failures/",
    },
  },
];

const CHECKLIST = [
  "Nenhuma chave secreta aparece no código que vai para o navegador (busquei no site e no build).",
  "As chaves e senhas ficam em variáveis de ambiente do servidor, e o arquivo .env não está no repositório.",
  "O RLS está ligado em todas as tabelas expostas, com policies.",
  "A chave service_role (ou secret) só existe no servidor.",
  "Toda leitura e escrita confere, no servidor, se o registro é de quem pediu (testei com dois usuários).",
  "As páginas de admin são protegidas no servidor, não só escondidas na tela.",
  "O upload tem limite de tamanho, tipo validado e nome gerado pelo app.",
  "As consultas ao banco são parametrizadas, sem juntar texto do usuário.",
  "Os webhooks verificam a assinatura antes de processar.",
  "Rodei o npm audit, removi dependência sem uso e não instalei nada de fonte estranha.",
];

const NOTICIAS = [
  {
    titulo: "Câmaras frias de bolsas de sangue na França",
    texto:
      "O serviço francês de sangue (EFS) disse que câmaras frias de três unidades foram afetadas por hackers, com limites de temperatura elevados a níveis muito altos. Segundo o EFS, a equipe interveio e não houve perda de produtos sanguíneos.",
    fonte: { nome: "BBC", url: "https://www.bbc.co.uk/news/articles/c8vgxyvz6y9ro" },
    fonte2: {
      nome: "CNN Brasil",
      url: "https://www.cnnbrasil.com.br/economia/money/tecnologia/ataque-hacker-atinge-freezers-do-banco-de-sangue-da-franca",
    },
  },
  {
    titulo: "Binance: entrevistas de emprego falsas",
    texto:
      "Segundo a BBC, os hackers que roubaram US$ 6,3 bilhões da Binance, um recorde, usaram entrevistas de emprego falsas, downloads de software malicioso nos computadores de engenheiros e uma ferramenta de IA interna comprometida, conforme a própria empresa.",
    fonte: { nome: "BBC", url: "https://www.bbc.com/news/articles/ck5ynwz9gy67o" },
  },
  {
    titulo: "FGC: dados de clientes acessados",
    texto:
      "O Fundo Garantidor de Créditos informou, em 5 de novembro, que nome, CPF, e-mail e data de nascimento de pessoas indenizadas foram acessados. Não há informação sobre quantas pessoas foram afetadas, e o fundo diz que não houve perda financeira.",
    fonte: {
      nome: "Folha (C-Level)",
      url: "https://c-level.folha.uol.com.br/financas/2026/11/fgc-sofre-incidente-de-seguranca-envolvendo-dados-pessoais-de-clientes-e-alerta-para-possiveis-golpes.shtml",
    },
  },
];

function CopyButton({ text, label }: { text: string; label: string }) {
  const [state, setState] = useState<"idle" | "ok" | "error">("idle");

  async function copiar() {
    try {
      await navigator.clipboard.writeText(text);
      setState("ok");
      setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 3000);
    }
  }

  return (
    <button
      type="button"
      onClick={copiar}
      className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors"
      style={{ borderColor: `${ACCENT}66`, color: ACCENT }}
    >
      <Copy className="h-3.5 w-3.5" />
      {state === "ok" ? "Copiado" : state === "error" ? "Não copiou, selecione o texto" : label}
    </button>
  );
}

export default function FalhasPage() {
  const [formUnlocked, setFormUnlocked] = useState(false);

  const storedLead = useSyncExternalStore(() => () => {}, () => hasCapturedLead(), () => false);
  const review = useSyncExternalStore(
    () => () => {},
    () => ["localhost", "127.0.0.1"].includes(window.location.hostname),
    () => false
  );
  const unlocked = review || storedLead || formUnlocked;

  const checklistTexto = CHECKLIST.map((c, i) => `${i + 1}. ${c}`).join("\n");

  return (
    <div className="mx-auto max-w-3xl space-y-12 pb-16 text-white">
      {review && (
        <div
          className="rounded-xl px-4 py-3 text-center text-xs font-mono"
          style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
        >
          PRÉVIA LOCAL · conteúdo aberto. Em produção, o acesso fica protegido.
        </div>
      )}

      <header className="space-y-5 pt-6 text-center">
        <span
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
          style={{ borderColor: `${ACCENT}4D`, color: ACCENT }}
        >
          <ShieldAlert className="h-4 w-4" />
          Segurança · antes de publicar o app
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          7 falhas de segurança para checar no seu app{" "}
          <span style={{ color: ACCENT }}>antes de publicar</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Do segredo exposto no navegador ao pacote adulterado: o que testar, como corrigir e um
          checklist de 10 itens para rodar antes de colocar o app no ar.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">As 7 falhas</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {FALHAS.map((f) => (
            <article
              key={f.n}
              className="flex items-center gap-3 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                style={{ backgroundColor: `${ACCENT}26`, color: ACCENT }}
              >
                {f.n}
              </span>
              <h3 className="font-semibold leading-snug">{f.nome}</h3>
            </article>
          ))}
        </div>
      </section>

      {!unlocked ? (
        <LeadGate
          source="falhas-page"
          accent={ACCENT}
          buttonTextColor="#450a0a"
          title="Receba as falhas, os testes e o checklist"
          description="Preencha seus dados para liberar as 7 falhas com o teste e a correção de cada uma e o checklist de 10 itens."
          contentNote="Você vai liberar: as 7 falhas com o teste e a correção, o checklist de 10 itens e as fontes."
          buttonLabel="Liberar o material"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-8">
          <section
            className="rounded-xl border p-5"
            style={{ borderColor: "#F59E0B66", backgroundColor: "#F59E0B14" }}
          >
            <h2 className="flex items-center gap-2 font-semibold text-[#FBBF24]">
              <AlertTriangle className="h-5 w-5" />
              Leia antes de testar
            </h2>
            <ul className="mt-3 space-y-2">
              {ALERTAS.map((a) => (
                <li key={a} className="flex gap-3 text-sm leading-relaxed text-[#ddd]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FBBF24]" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">As falhas, o teste e a correção</h2>
            {FALHAS.map((f) => (
              <article
                key={f.n}
                className="space-y-3 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5"
              >
                <h3 className="flex items-center gap-3 text-lg font-semibold">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                    style={{ backgroundColor: `${ACCENT}26`, color: ACCENT }}
                  >
                    {f.n}
                  </span>
                  {f.nome}
                </h3>
                <p className="text-sm leading-relaxed text-[#999]">
                  <span className="font-semibold text-[#bbb]">O que é: </span>
                  {f.oQueE}
                </p>
                <p className="text-sm leading-relaxed text-[#999]">
                  <span className="font-semibold text-[#bbb]">Como testar: </span>
                  {f.testar}
                </p>
                <p className="text-sm leading-relaxed text-[#999]">
                  <span className="font-semibold text-[#bbb]">Como corrigir: </span>
                  {f.corrigir}
                </p>
                <a
                  href={f.fonte.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold"
                  style={{ color: ACCENT }}
                >
                  Fonte: {f.fonte.nome}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </article>
            ))}
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">O checklist de 10 itens</h2>
            <article className="space-y-2 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
              {CHECKLIST.map((c, i) => (
                <p key={c} className="flex gap-3 text-sm leading-relaxed text-[#bbb]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                  <span>
                    <span className="font-semibold text-white">{i + 1}. </span>
                    {c}
                  </span>
                </p>
              ))}
              <div className="pt-2">
                <CopyButton text={checklistTexto} label="Copiar o checklist" />
              </div>
            </article>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">Por que isso importa agora</h2>
            <p className="text-sm leading-relaxed text-[#999]">
              Estes casos recentes não são sobre apps feitos com IA. Mostram o tamanho do risco de
              um sistema mal protegido.
            </p>
            {NOTICIAS.map((n) => (
              <article
                key={n.titulo}
                className="space-y-2 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5"
              >
                <h3 className="font-semibold">{n.titulo}</h3>
                <p className="text-sm leading-relaxed text-[#999]">{n.texto}</p>
                <p className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold" style={{ color: ACCENT }}>
                  <a href={n.fonte.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1">
                    {n.fonte.nome}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  {"fonte2" in n && n.fonte2 && (
                    <a href={n.fonte2.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1">
                      {n.fonte2.nome}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </p>
              </article>
            ))}
            <p className="text-center text-xs text-[#777]">Informações conferidas em 10 de novembro de 2026</p>
          </section>
        </div>
      )}

      <SalesCta utmContent="falhas" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
