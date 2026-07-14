"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Bell,
  Camera,
  Check,
  Copy,
  Eye,
  FileText,
  ListChecks,
  ScanFace,
  Search,
  ShieldAlert,
  Split,
  Trash2,
  Workflow,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#22D3EE";

const PROMPT_1 = `Vou enviar uma foto minha. Analise essa foto em detalhe e crie
uma descricao completa da minha aparencia, do tipo que serviria
para me identificar em outras fotos.

Inclua:
- Formato e estrutura do rosto
- Cor, estilo e comprimento do cabelo
- Cor e formato dos olhos
- Tom de pele
- Tracos marcantes: sardas, cicatrizes, covinhas, pintas,
  oculos, barba, piercings, tatuagens visiveis
- Faixa etaria aproximada
- Porte e tipo fisico
- Qualquer outro identificador unico

Seja o mais especifico possivel. Vou usar essa descricao para
procurar por mim mesmo em fotos publicadas na internet e pedir
a remocao das que eu nao autorizei.`;

const PROMPT_2 = `Use a minha foto e o perfil de aparencia que voce acabou de montar.
Quero mapear onde eu apareco na internet.

Faca as buscas abaixo:

1. Procure meu nome no Google: [SEU NOME COMPLETO]. Inclua a aba
   de Imagens e compare cada resultado com o perfil de aparencia.
2. Procure meu nome nestas plataformas: LinkedIn, Facebook,
   Instagram, X (Twitter), TikTok, YouTube.
3. Procure meu nome combinado com os contextos que me ligam:
   [CIDADE], [EMPRESA ATUAL], [EMPRESA ANTERIOR], [FACULDADE],
   [PROFISSAO].
4. Procure meu nome em sites agregadores de dados pessoais,
   listas publicas, atas, diarios oficiais e portais de eventos.

Para cada resultado, me devolva:
- A URL direta
- Que tipo de site e
- Descricao da foto ou do conteudo
- Se eu mesmo aparento ter publicado ou se foi outra pessoa
- Nivel de confianca de que sou eu: alta, media ou baixa

Regra importante: nao invente resultados. Se uma busca nao
retornar nada, diga que nao encontrou. Prefiro uma lista curta
e verdadeira a uma lista longa e inventada.

Entregue tudo em uma lista unica.`;

const PROMPT_3 = `Aqui estao os resultados que eu encontrei na mao, rodando a busca
reversa da minha foto no Google Lens e no TinEye:

[COLE AQUI AS URLS]

Junte esses resultados com tudo que voce ja tinha encontrado e
monte uma lista mestre de todos os lugares onde eu apareco na
internet, organizada por categoria:

1. Fotos que eu mesmo publiquei
2. Fotos publicadas por outras pessoas
3. Fotos em sites de empresas ou organizacoes
4. Fotos em sites de noticia ou imprensa
5. Fotos em sites agregadores de dados pessoais
6. Origem desconhecida ou nao identificada

Para cada item, informe:
- URL
- Quem publicou: eu, terceiro, empresa ou desconhecido
- Se da para pedir a remocao e por qual caminho: formulario da
  plataforma, contato do site, pedido de eliminacao por LGPD ou
  ferramenta do Google
- Prioridade de remocao: alta, media ou baixa, considerando o
  quanto aquilo me expoe

Ordene a lista da maior para a menor prioridade de remocao e
me diga por onde comecar.`;

const EMAIL_LGPD = `Assunto: Solicitacao de eliminacao de dados pessoais (LGPD)

Prezados,

Sou [SEU NOME COMPLETO], titular dos dados pessoais publicados
na pagina abaixo:

[URL DA PAGINA]

A pagina contem a minha imagem, que e dado pessoal nos termos do
art. 5, I, da Lei 13.709/2018 (LGPD). Nao autorizei esse
tratamento e nao identifico hipotese legal que o ampare.

Com base no art. 18, incisos IV e VI, da LGPD, solicito a
eliminacao da minha imagem e dos meus demais dados pessoais
dessa pagina, assim como a interrupcao de qualquer
compartilhamento com terceiros.

Peco a confirmacao da providencia no prazo previsto no art. 19
da mesma lei.

Atenciosamente,
[SEU NOME COMPLETO]
[SEU E-MAIL DE CONTATO]`;

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
      className="inline-flex items-center gap-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1e] hover:border-[#22D3EE]/50 text-xs font-medium text-[#ccc] px-3 py-1.5 transition-colors cursor-pointer"
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
        <pre className="text-[13px] text-[#ccc] font-mono leading-relaxed whitespace-pre">
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

export default function FotoPage() {
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
          Descubra onde a{" "}
          <span style={{ color: ACCENT }}>sua foto</span> está circulando na
          internet
        </h1>
        <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
          Um método de três prompts para usar a IA como auditora da sua própria
          imagem: ela monta o seu perfil de aparência, varre a web atrás de
          você, e devolve uma lista de tudo que dá para tirar do ar.
        </p>
      </div>

      {/* Por que isso importa */}
      <section className="space-y-4">
        <SectionTitle icon={Eye}>
          Você não escolheu metade dessas fotos
        </SectionTitle>
        <div className="space-y-4 text-[15px] text-[#aaa] leading-relaxed">
          <p>
            Boa parte do que existe do seu rosto na internet não foi você quem
            publicou. É a foto do crachá no site da empresa antiga, a marcação
            de um amigo numa festa, o registro de um evento em que você foi
            plateia, o perfil que você criou em 2014 e esqueceu que existia.
            Cada uma dessas imagens fica indexada, e todas juntas formam um
            rastro que qualquer pessoa consegue puxar em minutos.
          </p>
          <p>
            Esse rastro não fica parado. Bancos de reconhecimento facial se
            formaram raspando bilhões de fotos públicas de redes sociais e sites
            abertos, sem pedir autorização a ninguém. Existem buscadores em que
            se joga um rosto e se recebe de volta cada página onde aquele rosto
            aparece. Sites agregadores republicam a sua foto de perfil ao lado
            de nome, idade, cidade e nomes de parentes, montados a partir de
            fontes espalhadas.
          </p>
          <p>
            E foto pública de rosto virou matéria prima de golpe. Perfil falso,
            clonagem de identidade e vídeo gerado por IA começam todos pelo
            mesmo lugar: alguém pega a sua cara em algum canto da internet.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              title: "Raspagem em massa",
              text: "Sua foto pública pode já estar dentro de um banco de reconhecimento facial que você nunca autorizou.",
            },
            {
              title: "Agregadores de dados",
              text: "Sites que juntam foto, nome, idade, cidade e parentes numa ficha só, e vendem ou exibem de graça.",
            },
            {
              title: "Golpes com a sua cara",
              text: "Perfil falso, clonagem de identidade e deepfake começam com uma foto sua que estava fácil de achar.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-1.5"
            >
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-[#888] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* O que a IA faz e o que voce faz */}
      <section className="space-y-4">
        <SectionTitle icon={Split}>
          O que a IA faz e o que você faz
        </SectionTitle>
        <p className="text-[15px] text-[#aaa] leading-relaxed">
          Aqui vai a parte que quase ninguém conta: nenhuma IA arrasta a sua
          foto para dentro do Google Imagens sozinha. Busca reversa de imagem é
          uma coisa que você faz na mão, e leva dois minutos. Quem promete que a
          IA faz isso inteiro está vendendo fumaça. O trabalho pesado de verdade
          é outro: descrever a sua aparência com precisão, varrer a web pelo seu
          nome em dezenas de combinações, e transformar dezenas de links soltos
          numa lista organizada e priorizada. Isso a IA faz muito bem.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <div
            className="rounded-xl border p-5 space-y-3"
            style={{
              borderColor: `${ACCENT}4D`,
              backgroundColor: `${ACCENT}0D`,
            }}
          >
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.15em]"
              style={{ color: ACCENT }}
            >
              A IA faz
            </p>
            <ul className="space-y-2 text-sm text-[#bbb] leading-relaxed">
              <li>Monta o perfil de aparência a partir da sua foto</li>
              <li>Busca o seu nome na web e nas plataformas</li>
              <li>Compara os resultados com o perfil e diz se é você</li>
              <li>Classifica tudo por origem e prioridade de remoção</li>
              <li>Escreve os pedidos de remoção</li>
            </ul>
          </div>
          <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#888]">
              Você faz
            </p>
            <ul className="space-y-2 text-sm text-[#bbb] leading-relaxed">
              <li>Roda a busca reversa no Google Lens e no TinEye</li>
              <li>Cola as URLs encontradas de volta no chat</li>
              <li>Confere se cada resultado é você mesmo</li>
              <li>Dispara os pedidos de remoção</li>
            </ul>
          </div>
        </div>

        <div className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-2">
          <p className="text-sm font-semibold text-white">O que você precisa</p>
          <p className="text-sm text-[#999] leading-relaxed">
            Uma IA que enxergue imagem e tenha acesso à web: Claude com pesquisa
            na web ou ChatGPT com busca resolvem. Uma foto sua nítida, de rosto,
            bem iluminada, de frente. E vinte minutos. A foto sobe para o chat da
            IA, nunca para esta página: aqui não existe upload nenhum.
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
          Isto é sobre a sua cara, e só sobre a sua
        </h2>
        <p className="text-sm text-[#bbb] leading-relaxed">
          O método existe para você auditar e limpar a própria pegada digital.
          Rodar isso com a foto de outra pessoa para descobrir onde ela aparece,
          onde trabalha ou por onde circula não é auditoria de privacidade, é
          perseguição, e no Brasil perseguição é crime desde a Lei 14.132/2021.
          Use com a sua imagem, ou com a de alguém que pediu a sua ajuda e sabe
          exatamente o que você está fazendo.
        </p>
      </section>

      {/* Os 3 passos */}
      <section className="space-y-4">
        <SectionTitle icon={Workflow}>O método em três prompts</SectionTitle>
        <div className="space-y-3">
          {[
            {
              n: "1",
              title: "Perfil de aparência",
              text: "Você envia a foto e a IA descreve você em detalhe: formato do rosto, cabelo, olhos, tom de pele, traços marcantes, porte físico. Esse perfil vira o critério de comparação usado no resto do processo, e é o que separa um resultado que é mesmo você de um homônimo qualquer.",
            },
            {
              n: "2",
              title: "Varredura",
              text: "A IA busca o seu nome na web, nas redes e nos agregadores, cruzando cada achado com o perfil do passo 1. Em paralelo, você roda a busca reversa da foto no Google Lens e no TinEye e junta o que aparecer.",
            },
            {
              n: "3",
              title: "Lista mestre e remoção",
              text: "Tudo é consolidado numa lista única, separada por quem publicou, e priorizada pelo tanto que te expõe. Cada item vem com o caminho de remoção correspondente.",
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
                <p className="text-sm text-[#999] leading-relaxed">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gate */}
      {!unlocked ? (
        <LeadGate
          source="foto-page"
          accent={ACCENT}
          title="Desbloqueie os três prompts prontos"
          description="Insira seus dados para liberar os prompts traduzidos e o passo a passo completo da auditoria da sua imagem."
          contentNote="Você vai liberar: os três prompts prontos para copiar, o passo a passo da busca reversa no Google Lens e no TinEye, os canais de remoção de cada tipo de site e um modelo de e-mail de exclusão baseado na LGPD."
          buttonLabel="Liberar os prompts"
          onUnlock={() => setUnlocked(true)}
        />
      ) : (
        <>
          {/* Prompt 1 */}
          <section className="space-y-4">
            <SectionTitle icon={Camera}>
              Prompt 1: o perfil de aparência
            </SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Abra uma conversa nova na sua IA, anexe a foto e cole o prompt
              abaixo. Guarde essa conversa: os próximos dois prompts vão no
              mesmo fio, porque a IA precisa lembrar do perfil que acabou de
              montar. Se a descrição sair genérica, peça mais especificidade e
              mande uma segunda foto, de outro ângulo.
            </p>
            <PromptBlock code={PROMPT_1} copyLabel="Copiar prompt 1" />
          </section>

          {/* Busca reversa */}
          <section className="space-y-4">
            <SectionTitle icon={Search}>
              A busca reversa, que é a sua parte
            </SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Antes do prompt 2, faça isto. São dois minutos e é aqui que
              costumam aparecer as fotos que você nem sabia que existiam.
            </p>
            <div className="space-y-3">
              {[
                {
                  title: "Google Lens",
                  text: "Abra images.google.com, clique no ícone da câmera na barra de busca e arraste a sua foto. Percorra todos os resultados, inclusive a aba de páginas que contêm a imagem, que é onde aparecem os sites de verdade, e não só imagens parecidas.",
                },
                {
                  title: "TinEye",
                  text: "Abra tineye.com e suba a mesma foto. O TinEye acha cópias exatas e recortes da mesma imagem, inclusive versões antigas que o Google já não mostra. Ordene por mais antiga primeiro para descobrir onde aquilo apareceu pela primeira vez.",
                },
                {
                  title: "Bing Visual Search",
                  text: "Vale rodar como terceira rede: o índice do Bing pega páginas que o Google deixa passar, principalmente fóruns e sites menores.",
                },
                {
                  title: "Repita com 2 ou 3 fotos",
                  text: "Uma foto só encontra uma fatia. Rode de novo com uma foto antiga, uma de perfil profissional e uma informal. Cada uma puxa um pedaço diferente do seu rastro.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-1.5"
                >
                  <p className="text-sm font-semibold text-white">
                    {item.title}
                  </p>
                  <p className="text-sm text-[#999] leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Copie as URLs de tudo que for você. Elas entram no prompt 3.
            </p>
          </section>

          {/* Prompt 2 */}
          <section className="space-y-4">
            <SectionTitle icon={Search}>Prompt 2: a varredura</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Na mesma conversa, cole o prompt abaixo trocando o que está entre
              colchetes. Quanto mais contexto você der, mais o resultado separa
              você de qualquer homônimo. A linha que proíbe inventar resultado
              não é enfeite: sem ela, é comum a IA devolver URL bonita que não
              existe. Abra cada link antes de acreditar.
            </p>
            <PromptBlock code={PROMPT_2} copyLabel="Copiar prompt 2" />
          </section>

          {/* Prompt 3 */}
          <section className="space-y-4">
            <SectionTitle icon={ListChecks}>
              Prompt 3: a lista mestre
            </SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Agora junte os dois lados. Cole as URLs que você achou na busca
              reversa e peça a consolidação. O resultado é o entregável de todo
              o processo: a lista de onde a sua cara está, quem colocou lá, e o
              que dá para tirar.
            </p>
            <PromptBlock code={PROMPT_3} copyLabel="Copiar prompt 3" />
          </section>

          {/* Remocao */}
          <section className="space-y-4">
            <SectionTitle icon={Trash2}>Como pedir a remoção</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Cada tipo de site tem um caminho. Vá do mais fácil para o mais
              trabalhoso, e comece pelos itens de prioridade alta da sua lista.
            </p>
            <div className="space-y-3">
              {[
                {
                  title: "O que você mesmo publicou",
                  text: "Comece por aqui, porque é o que está sob o seu controle e sai na hora. Apague, arquive ou feche o perfil. Lembre que apagar da rede não apaga do índice do Google na mesma hora: depois de remover, peça a remoção de conteúdo desatualizado no Google.",
                },
                {
                  title: "Ferramenta do Google",
                  text: "Na Busca do Google existe a área Resultados sobre você, que monitora páginas com os seus dados pessoais e permite pedir a retirada do resultado. É o caminho mais rápido para sumir da busca, mesmo quando a página continua no ar.",
                },
                {
                  title: "Fotos publicadas por terceiros",
                  text: "Fale primeiro com quem publicou, direto e sem rodeio. Se não houver resposta ou houver recusa, use a denúncia da plataforma: Instagram, Facebook, LinkedIn, X e TikTok têm um canal específico para conteúdo que viola a privacidade ou usa a sua imagem sem autorização.",
                },
                {
                  title: "Sites de empresas e organizações",
                  text: "Escreva para o contato do site, para o RH ou para o encarregado de dados. Empresa antiga que ainda exibe a sua foto está tratando dado pessoal sem base legal, e costuma remover no primeiro e-mail.",
                },
                {
                  title: "Agregadores de dados",
                  text: "Procure no rodapé por opt out, remover meus dados ou privacidade. Quase todos têm o formulário escondido, e quase todos removem quando você insiste. Anote a data do pedido: esses sites voltam a te listar, e você vai precisar repetir.",
                },
                {
                  title: "Buscadores de rosto",
                  text: "Serviços que buscam pessoas por reconhecimento facial normalmente oferecem exclusão do seu rosto do índice. Procure a página de opt out do serviço e faça o pedido.",
                },
                {
                  title: "Sites de notícia",
                  text: "É o caso mais difícil, porque esbarra em liberdade de imprensa e interesse público. Vale o pedido educado ao veículo, principalmente se a matéria for antiga e você não for figura pública.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-1.5"
                >
                  <p className="text-sm font-semibold text-white">
                    {item.title}
                  </p>
                  <p className="text-sm text-[#999] leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Modelo de e-mail */}
          <section className="space-y-4">
            <SectionTitle icon={FileText}>
              Modelo de pedido de exclusão pela LGPD
            </SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Quando o site tem dono no Brasil, esse e-mail funciona melhor do
              que qualquer formulário. A sua imagem é dado pessoal pela Lei
              13.709/2018, e o art. 18 te dá o direito de exigir a eliminação.
              Cite os artigos: muda o tom da resposta.
            </p>
            <PromptBlock code={EMAIL_LGPD} copyLabel="Copiar modelo de e-mail" />
            <p className="text-[13px] text-[#777] leading-relaxed">
              Se o site não responder, o pedido pode ser levado à Autoridade
              Nacional de Proteção de Dados. Guarde o e-mail enviado e a data.
            </p>
          </section>

          {/* Depois */}
          <section className="space-y-4">
            <SectionTitle icon={Bell}>Depois da limpeza</SectionTitle>
            <p className="text-[15px] text-[#aaa] leading-relaxed">
              Pegada digital não é obra concluída, é manutenção. O que você
              tirou hoje volta a aparecer em seis meses, por outro caminho.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Alerta no seu nome",
                  text: "Crie um alerta do Google com o seu nome entre aspas. Toda vez que uma página nova te citar, você fica sabendo no mesmo dia.",
                },
                {
                  title: "Refaça o processo a cada 6 meses",
                  text: "Os três prompts levam vinte minutos. Bote no calendário e rode de novo, principalmente depois de trocar de emprego ou aparecer em evento.",
                },
                {
                  title: "Feche o que não precisa estar aberto",
                  text: "Perfil pessoal público é a maior fonte de material para quem raspa foto. Se não é vitrine profissional, feche.",
                },
                {
                  title: "Cuide da foto de perfil",
                  text: "A foto de perfil é sempre pública, mesmo em conta fechada, em quase todas as redes. Escolha uma que você não se importa de ver circulando.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-1.5"
                >
                  <p className="text-sm font-semibold text-white">
                    {item.title}
                  </p>
                  <p className="text-sm text-[#999] leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Erros comuns */}
          <section className="space-y-4">
            <SectionTitle icon={AlertTriangle}>
              Três erros que estragam o resultado
            </SectionTitle>
            <div className="space-y-3">
              {[
                {
                  title: "Acreditar na lista sem abrir os links",
                  text: "IA inventa URL com naturalidade. Toda linha da lista mestre precisa ser aberta e conferida antes de virar pedido de remoção.",
                },
                {
                  title: "Rodar com uma foto ruim",
                  text: "Foto escura, de longe, de lado ou com filtro derruba a qualidade do perfil e da busca reversa. Use rosto nítido, de frente, boa luz.",
                },
                {
                  title: "Parar no mapeamento",
                  text: "Saber onde a sua cara está e não pedir remoção nenhuma não muda nada. O valor está no envio dos pedidos, não na planilha.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] p-5 space-y-1.5"
                >
                  <p className="text-sm font-semibold text-white">
                    {item.title}
                  </p>
                  <p className="text-sm text-[#999] leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* CTA */}
      <SalesCta utmContent="foto" />

      {/* Footer */}
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
