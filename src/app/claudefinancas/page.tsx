"use client";

import { useState, useSyncExternalStore } from "react";
import {
  Wallet,
  Landmark,
  PieChart,
  CalendarDays,
  ShieldCheck,
  Globe,
  AlertTriangle,
  ArrowUpRight,
  FileText,
  Lock,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#4ADE80";
const ARTIGO =
  "https://claude.com/resources/articles/introducing-personal-finance-in-claude";
const AJUDA = "https://support.claude.com/en/articles/18185620-use-personal-finance-with-claude";

const RECURSOS = [
  {
    icone: Wallet,
    nome: "Responde para onde foi o dinheiro",
    texto:
      "Você pergunta com as suas palavras, do tipo \"onde foi o meu dinheiro neste mês?\", e ele soma o que saiu das contas conectadas e separa por categoria.",
  },
  {
    icone: PieChart,
    nome: "Compara com os meses anteriores",
    texto:
      "Perguntou se aquele gasto está acima do normal? Ele volta nos meses passados, aponta o que mudou e mostra a assinatura que renovou sem você notar.",
  },
  {
    icone: CalendarDays,
    nome: "Mostra o que ainda vai sair",
    texto:
      "Lista as contas que caem antes do próximo salário e quanto deve sobrar depois delas.",
  },
  {
    icone: Landmark,
    nome: "Acha o que passa batido",
    texto:
      "Cobrança que entrou duas vezes, tarifa que ninguém pediu, conta que subiu aos poucos durante o ano.",
  },
];

const SEGURANCA = [
  "A conexão é feita pelo Plaid: você entra no site do seu banco e autoriza o acesso de leitura. O Claude não pede e não vê a sua senha do banco.",
  "Ele vê só as contas que você conectar: nome do banco, nome e tipo da conta, os quatro últimos dígitos, saldo, limite e até dois anos de transações.",
  "A conversa dentro da área de finanças não é usada para treinar os modelos. O que você fala fora dela segue as suas configurações de privacidade.",
  "Você desconecta a conta quando quiser e o Claude deixa de ver os dados.",
  "Não tem anúncio nem recomendação paga, e a Anthropic não oferece cartão, empréstimo ou conta própria.",
  "O acesso é só de leitura: ele não move, não gerencia e não investe o seu dinheiro. E pode errar nas contas, então confira os números importantes no seu banco.",
];

const LIMITES = [
  "Está em beta e começou a sair só nos Estados Unidos, na semana de 5 de novembro de 2026.",
  "Só nos planos pagos Pro, Max e Ultra. Não tem no plano gratuito.",
  "A conexão acontece pelo Plaid com bancos dos Estados Unidos. Não existe data para chegar ao Brasil.",
  "O artigo oficial é em inglês.",
  "Não é recomendação de investimento e não substitui contador nem consultor financeiro.",
];

const PASSOS = [
  {
    n: "1",
    titulo: "Abra a área de finanças",
    texto:
      "Quando ela aparecer na barra lateral do Claude, é só clicar em Personal Finance. Não tem instalação nem programa novo.",
  },
  {
    n: "2",
    titulo: "Conecte uma conta",
    texto:
      "Escolha o banco, entre direto no site dele e autorize o acesso de leitura. Comece com uma conta só para ver como funciona.",
  },
  {
    n: "3",
    titulo: "Faça a primeira pergunta",
    texto:
      "Algo simples e útil: \"quanto consigo guardar por mês?\" ou \"o que vence antes do meu salário?\". A resposta vem em linguagem comum, com os números que sustentam a conta.",
  },
];

export default function ClaudeFinancasPage() {
  const [formUnlocked, setFormUnlocked] = useState(false);

  const storedLead = useSyncExternalStore(() => () => {}, () => hasCapturedLead(), () => false);
  const review = useSyncExternalStore(
    () => () => {},
    () => ["localhost", "127.0.0.1"].includes(window.location.hostname),
    () => false
  );
  const unlocked = review || storedLead || formUnlocked;

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
          <Wallet className="h-4 w-4" />
          Novidade do Claude · anúncio de 5 de novembro de 2026
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          O Claude passou a olhar para o seu dinheiro{" "}
          <span style={{ color: ACCENT }}>e responde onde ele foi parar</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          A Anthropic lançou o Personal Finance dentro do Claude. Você conecta a conta do banco e
          do cartão, pergunta do seu jeito e recebe a resposta em linguagem comum. O acesso é só
          de leitura: ele não move, não gerencia e não investe o seu dinheiro.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">O que ele faz</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {RECURSOS.map((r) => (
            <article key={r.nome} className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4">
              <h3 className="flex items-center gap-2 font-semibold">
                <r.icone className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                {r.nome}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">{r.texto}</p>
            </article>
          ))}
        </div>
        <p className="text-sm leading-relaxed text-[#777]">
          Os exemplos do anúncio são de um mês fictício: 4.309,37 dólares de gastos, mais da
          metade em aluguel e contas da casa, e 1.393,22 dólares sobrando antes do próximo
          pagamento. Serve para mostrar o tipo de resposta, não é um número seu.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">Segurança e privacidade</h2>
        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
          <ul className="space-y-3">
            {SEGURANCA.map((s) => (
              <li key={s} className="flex gap-3 text-sm leading-relaxed text-[#bbb]">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {!unlocked ? (
        <LeadGate
          source="claudefinancas-page"
          accent={ACCENT}
          buttonTextColor="#052e16"
          title="Receba o resumo em português e o link oficial"
          description="Preencha seus dados para liberar o resumo do anúncio e o link do artigo da Anthropic."
          contentNote="Você vai liberar: o resumo em português do que foi anunciado, o link do artigo oficial e o link da central de ajuda do Claude."
          buttonLabel="Liberar o resumo e o link"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <div className="space-y-6">
          <section
            className="rounded-xl border p-5"
            style={{ borderColor: "#F59E0B66", backgroundColor: "#F59E0B14" }}
          >
            <h2 className="flex items-center gap-2 font-semibold text-[#FBBF24]">
              <AlertTriangle className="h-5 w-5" />
              Antes de tudo: isso ainda não funciona para quem está no Brasil
            </h2>
            <ul className="mt-3 space-y-2">
              {LIMITES.map((l) => (
                <li key={l} className="flex gap-3 text-sm leading-relaxed text-[#ddd]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FBBF24]" />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-[#bbb]">
              Ou seja: dá para entender como a ferramenta funciona e se preparar, mas não dá para
              usar a sua conta do banco hoje. O que você recebe aqui é o resumo do anúncio e o
              link do artigo oficial.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">Como começar quando chegar</h2>
            {PASSOS.map((p) => (
              <article
                key={p.n}
                className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-bold"
                  style={{ backgroundColor: `${ACCENT}26`, color: ACCENT }}
                >
                  {p.n}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold">{p.titulo}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#999]">{p.texto}</p>
                </div>
              </article>
            ))}
          </section>

          <section className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Lock className="h-4 w-4" style={{ color: ACCENT }} />
              O que ele ainda não faz
            </h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#999]">
              <li>Não paga conta, não transfere e não investe. Só lê e responde.</li>
              <li>Não dá recomendação de investimento.</li>
              <li>
                A Anthropic diz que o próximo passo é fazer o Claude trabalhar ao lado de
                profissionais licenciados e empresas reguladas, e ainda está estudando como.
              </li>
            </ul>
          </section>

          <div className="space-y-3">
            <a
              href={ARTIGO}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-xl px-6 py-5 text-lg font-bold transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: ACCENT, color: "#052e16", boxShadow: `0 10px 36px ${ACCENT}40` }}
            >
              <FileText className="h-5 w-5 shrink-0" />
              Ler o artigo oficial
              <ArrowUpRight className="h-5 w-5 shrink-0" />
            </a>
            <a
              href={AJUDA}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] px-6 py-4 text-sm font-semibold text-[#bbb] transition-colors hover:text-white"
            >
              <Globe className="h-4 w-4 shrink-0" />
              Central de ajuda do Claude, com os passos de configuração
              <ArrowUpRight className="h-4 w-4 shrink-0" />
            </a>
            <p className="text-center text-xs text-[#777]">
              Artigo em inglês, publicado em 5 de novembro de 2026 · conferido em 6 de novembro
              de 2026
            </p>
          </div>
        </div>
      )}

      <SalesCta utmContent="claudefinancas" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
