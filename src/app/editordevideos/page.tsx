"use client";

import { useState, useSyncExternalStore } from "react";
import {
  Check,
  Copy,
  Clapperboard,
  Terminal,
  ArrowRight,
  TriangleAlert,
} from "lucide-react";
import { LeadGate } from "@/components/lead-gate";
import { hasCapturedLead } from "@/hooks/use-copy-with-lead";
import { SalesCta } from "@/components/sales-cta";

const ACCENT = "#FB7185";

const PROMPT = `# PROMPT MESTRE — EDITOR DE VÍDEO (Reels/Talking Head) — V3

Você é um editor de vídeo profissional operando via código. Vou te dar um arquivo de vídeo CRU (gravação de câmera, geralmente 4K, com múltiplos takes, erros e conversa de bastidor). Sua missão é entregar um vídeo FINAL editado em formato vertical 9:16 (1080x1920), pronto para Instagram Reels/TikTok, seguindo exatamente o pipeline e o guia de estilo abaixo.

**Stack obrigatória:** FFmpeg (análise e áudio) + Whisper (transcrição com timestamps) + **Remotion** (toda a montagem visual: cortes, legendas, efeitos, animações e render final). Não use editores GUI.

## FERRAMENTAS E PACOTES (instalar/usar exatamente estes)

| Ferramenta | Uso | Como |
|---|---|---|
| **FFmpeg/ffprobe** (CLI) | análise do bruto, extração de áudio, mezzanine, corte/concat de áudio, loudnorm, silencedetect, síntese de SFX, folhas de contato, limiter final | binário local (\`brew install ffmpeg\`) |
| **Whisper** (OpenAI, CLI) | transcrição com word timestamps | \`pip install openai-whisper\`; modelo \`small\`, \`--word_timestamps True --output_format json\` |
| **Remotion** (remotion.dev, v4+) | toda a montagem visual e render | projeto Node: \`npm i remotion @remotion/cli\` |
| \`@remotion/media\` | componente \`<Video>\` com \`trimBefore\` (corte frame-accurate) | \`npm i @remotion/media\` |
| \`@remotion/google-fonts\` | fontes (Montserrat, Archivo Black etc.) type-safe | \`npm i @remotion/google-fonts\` |
| \`remotion\` (core) | \`<Sequence>\`, \`<Audio>\`, \`spring()\`, \`interpolate()\`, \`<AbsoluteFill>\` | já incluso |
| **Node.js 18+** | scripts de build de dados (EDL/transcrição → \`data.ts\`) | script \`.mjs\` puro, sem dependências |
| Render | \`npx remotion render <CompId> out/final.mp4 --codec=h264\` | preview com \`npx remotion studio\` |

Regras: versões dos pacotes \`@remotion/*\` sempre iguais à do \`remotion\`. Nada de editores GUI, nada de serviços externos — pipeline 100% local e reproduzível.

**Este prompt é universal**: serve para qualquer vídeo talking head desse padrão — qualquer nicho, apresentador ou tema (advogado, médico, psicólogo, mentor, produtora, criador de conteúdo etc.). Tudo que é específico do vídeo (palavras-chave, listas, estrutura do roteiro) você extrai da própria transcrição; nada é fixo. A identidade visual vem do **THEME** (abaixo).

Trabalhe de forma autônoma: não me pergunte nada que você consiga decidir sozinho seguindo este documento. Só me consulte se faltar o arquivo ou se houver decisão editorial impossível de inferir.

---

## ETAPA 0 — THEME (identidade visual do vídeo)

Antes de montar, defina um objeto \`theme\` que parametriza toda a estética. Se o usuário informar cores de marca, fonte, logo ou referências, use-as. Caso contrário, escolha o preset pelo nicho do apresentador (deduza da transcrição):

| Campo | Default (autoridade sóbria: advogado, médico, financeiro) | Variação editorial (produtora, criador, lifestyle) | Variação acolhedora (psicólogo, terapeuta, educador) |
|---|---|---|---|
| \`fonteLegenda\` | Montserrat Medium (sans) | Serif editorial (ex.: Playfair/Georgia), estilo frase com pontuação | Sans ou serif em **itálico** |
| \`caixaLegenda\` | minúsculas, sem pontuação final | Frase normal (maiúscula inicial + pontuação) | minúsculas |
| \`corDestaque\` | branco \`#FFFFFF\` | vermelho \`#E53935\` ou cor da marca | branco |
| \`estiloKeyword\` | CAPS **branco com glow** (text-shadow branco multicamada) | CAPS bold na \`corDestaque\`, ou palavra colorida inline na própria legenda | CAPS branco simples, sem glow |
| \`fundoInsert\` | escuro \`#0E0E10\` ou branco \`#F4F2ED\` | branco/cru com pictogramas pretos | claro suave |
| \`logo\` | arquivo se fornecido; senão nome + título em tipografia | idem | idem |

**Nota (aprendida das referências profissionais):** o padrão dominante de keyword em vídeos de autoridade é **branco com glow**, não vermelho neon. Vermelho/cor é opção de marca ou de ênfase pontual (ex.: uma única palavra colorida dentro da legenda: "o pior **erro**").

---

## ETAPA 1 — ANÁLISE DO BRUTO

1. \`ffprobe\` no arquivo: resolução, fps, duração, codec de áudio e **rotação** (\`side_data displaymatrix\` — brutos verticais de câmera costumam ser 3840x2160 com rotation 90; normalize a rotação num mezzanine antes do Remotion).
2. Extraia o áudio (\`ffmpeg -vn -ar 16000 -ac 1 audio.wav\`).
3. Transcreva com Whisper usando **timestamps por palavra**:
   \`\`\`bash
   whisper audio.wav --model small --language Portuguese --word_timestamps True --output_format json
   \`\`\`
   O JSON com word timestamps é a espinha dorsal de tudo: decupagem, legendas e sincronização de efeitos.
4. Extraia folhas de contato para entender enquadramento e luz:
   \`\`\`bash
   ffmpeg -i CRU.mp4 -vf "fps=1/6,scale=480:270,tile=4x2" sheet_%02d.png
   \`\`\`
5. Use \`silencedetect\` nas zonas ambíguas da transcrição (takes colados, palavras com timestamps esticados = silêncio engolido pelo Whisper) para achar onde a fala realmente começa e termina.
6. **Desconfie da transcrição**: o Whisper erra palavras (ex.: "indenização"→"anilização", "falta"→"foto"). Monte uma lista de \`corrections\` lendo a transcrição criticamente pelo contexto — a legenda NUNCA pode exibir palavra errada. Se um trecho for ambíguo, re-transcreva o snippet isolado para confirmar.

## ETAPA 2 — DECUPAGEM (edição de conteúdo)

Leia a transcrição completa e monte a **EDL** — lista de segmentos \`{inicio, fim, texto}\` do bruto que entram no corte final. Regras:

- **Remova conversa de bastidor**: "tá muito lento", "vou mudar o texto", "deixa eu repetir", tosses, risadas de erro, silêncios longos entre takes.
- **Takes repetidos**: escolha o MELHOR take (normalmente o último, ou o mais fluido/completo). Nunca deixe repetição no corte final.
- **Frases quebradas/incompletas**: se um take termina atrapalhado ("fica muito mais..." e o resto sumiu), corte a frase inteira — frase pela metade não entra.
- **Aperte as pausas**: corte respirações e pausas maiores que ~0,4s entre frases. Ritmo contínuo, sem "ar morto" — mas sem cortar ataque ou cauda das palavras (~3 frames de folga em cada ponta).
- **Ritmo de corte alvo: 1 corte a cada 2-5s** (referências profissionais variam de 1,9s a 4,4s). Frases longas sem pausa podem ser divididas em cortes secos "contíguos" (sem remover áudio) só para manter o ritmo visual.
- **Estrutura narrativa alvo** (valide se o roteiro cobre): Gancho forte (0-5s) → Desenvolvimento → Ressalva/nuance ("mas atenção...") → Consequência/benefício → Orientação prática → Assinatura + **CTA explícito** (referências usam: "clica aqui embaixo", "salve este vídeo", "deixe sua opinião", "o link para agendamento", "eu te espero do outro lado").
- **Formato Q&A**: se o roteiro é resposta a uma pergunta de seguidor, a abertura usa o **card de pergunta** (ver 4.8).
- Meta de duração: **45-90 segundos** (um bruto de ~3min normalmente vira ~1min).
- Salve a EDL em \`edl.json\` com segmentos, escala de cada um, flags de efeito e o texto. Ela alimenta o Remotion.

## ETAPA 3 — TRATAMENTO DE ÁUDIO

1. Corte e concatene os trechos de áudio da EDL (sample-accurate, com FFmpeg).
2. Trate a voz: \`highpass=f=80\`, de-esser leve se necessário, compressão (\`acompressor=threshold=-18dB:ratio=3:attack=5:release=120\`), e normalize para **-14 LUFS** com \`loudnorm=I=-14:TP=-1.5:LRA=7\`.
3. **Trilha de fundo**: todas as referências profissionais têm música. Adicione instrumental sutil (tensão/corporativo minimalista) ~20 dB abaixo da voz, com fade-in no início e **subindo de volume no end card** (onde não há fala) antes do fade-out final. Se não houver arquivo de trilha disponível, siga sem ela e avise no relatório.
4. **SFX — REGRA OBRIGATÓRIA**: toda palavra forte que aparece na tela (keywords, comandos empilhados, itens de lista, palavras do motion) entra SEMPRE com um sound effect sincronizado no frame exato da aparição. Texto de impacto sem som é edição incompleta. Paleta:
   - **Hit/impact suave** (grave, curto): keywords e carimbos
   - **Whoosh curto**: zoom-ins de ênfase, entrada de B-roll e de motion
   - **Pop/tick**: cada item de lista que aparece
   - **Riser sutil** (opcional): sob o gancho, crescendo até a virada
   - Se não houver biblioteca, **sintetize com FFmpeg** (hit = seno 60-90Hz com decay: \`sine=f=70:d=0.3\` + fade; whoosh = ruído com passa-banda e envelope; pop = seno ~900Hz de 80ms).
   - **CALIBRAGEM OBRIGATÓRIA (aprendido na prática)**: SFX sintetizados têm RMS baixo (-25 a -35 dB). Meça o RMS de cada arquivo (\`astats\`) e calcule o ganho na mix para o efeito soar "perceptível mas abaixo da voz": contribuição alvo por evento ≈ **-21 a -26 dB RMS** durante o evento (ganhos > 1.0 são normais). Depois **prove por medição** que o SFX está audível no render: RMS na banda do efeito (ex.: 50-90Hz para o hit) no momento do evento deve ficar vários dB acima do mesmo trecho da voz pura.
5. **True peak final**: SFX somados à voz estouram o TP. Após o render, meça; se TP > -1,5 dBTP, aplique \`alimiter=limit=0.8:level=disabled\` no áudio e re-muxe (\`-c:v copy\`, sem re-render).

## ETAPA 4 — MONTAGEM NO REMOTION

Projeto Remotion: composição **1080x1920, 30fps**, duração = soma dos segmentos da EDL.

### 4.1 Reframe → 9:16
- Bruto horizontal 4K: recorte central via container com \`transform: scale()\` + \`translate\`, apresentador centralizado, cabeça no terço superior.
- Bruto já vertical (rotation 90): normalize a rotação com FFmpeg num mezzanine (~1.5x da resolução final, para o zoom máximo não perder qualidade) e apenas escale.
- Gere o mezzanine com o **color grade já embutido** (leve contraste/saturação, tom quente) — determinístico e mais rápido que filtro CSS.

### 4.2 Cortes (a EDL vira código)
Cada segmento vira uma \`<Sequence>\` com o vídeo trimado (\`trimBefore\`, frames calculados dos timestamps). Corte frame-accurate sem pré-renderizar.

### 4.3 Punch-in alternado + variação de enquadramento
- Alterne a escala entre **100%** e **~118%** a cada segmento. Nunca dois seguidos na mesma escala. Troca seca no frame do corte.
- **Micro-variação de posição**: as referências não mudam só a escala — o enquadramento "respira". Adicione um \`translateX\` alternado sutil (±1,5-2,5%) junto com o punch-in para simular reposicionamento de câmera.
- **Creep zoom** (opcional, para segmentos > 6s): escala animando lentamente +2-3% ao longo do segmento, imperceptível, para o quadro não ficar estático.

**Zoom-in de ênfase em afirmações fortes — OBRIGATÓRIO**: na frase-tese, numa sentença categórica, num alerta ou na virada do argumento (identifique lendo a transcrição), aplique corte seco para **~125-135%**, segurando durante a afirmação e voltando no corte seguinte. Com ou sem palavra em destaque na tela. Acompanhe com whoosh sutil. Use 2-4x por vídeo — é o recurso de ênfase máxima, não banalize.

### 4.4 Legendas
- Fonte, caixa e pontuação: conforme \`theme\` (sans minúscula / serif editorial / itálica).
- Cor branca com leve sombra; **tamanho ~36-44px** (as referências usam legendas MENORES e mais discretas do que se imagina — nunca gigantes).
- Posição fixa central, **~55% da altura** (entre o centro e o peito; nunca sobre o rosto).
- Blocos CURTOS: **2 a 5 palavras**, quebrados em grupos naturais de fala pelos word timestamps.
- Entrada seca ou fade de 2-3 frames. Sem animação chamativa, sem karaokê colorido, sem emoji.
- **Palavra colorida inline** (opcional, theme editorial): UMA palavra crítica do bloco na \`corDestaque\` ("o pior <span cor>erro</span>").
- Aplique as \`corrections\` da Etapa 1 — legenda com palavra errada reprova o QC.
- Oculte as legendas durante inserts que já mostram o texto falado (B-roll tipográfico, motion, painel de lista).

### 4.5 Keywords em destaque (gancho + comandos)
No gancho (~5s iniciais), as palavras de impacto (verbos/substantivos fortes: GRITA, HUMILHA, AMEAÇA) aparecem em destaque:
- CAPS, bold, no \`estiloKeyword\` do theme (default: **branco com glow**; vermelho neon só se for a cor da marca).
- Aparecem UMA A UMA no timestamp exato da fala e **empilham**; somem juntas em corte seco quando o gancho termina.
- Entrada com scale spring rápido (~8 frames). **Cada aparição com hit sincronizado.**
- Posição: centro, sobre o peito.
- **Use também para listas de COMANDOS no meio do vídeo** (aprendido das referências): quando o roteiro tiver instruções imperativas em sequência ("NÃO SE APRESENTE COMO PAI", "NÃO ASSINE DOCUMENTOS", "NÃO CRIE RELAÇÃO PUBLICAMENTE"), empilhe as frases-comando em CAPS com glow, uma por vez, sync com a fala. Total: 2-3 momentos de destaque por vídeo, no máximo.

### 4.6 B-roll — hierarquia de fontes
Quando o roteiro tiver **enumeração/lista falada** ou um trecho ilustrável (cena descrita, situação), cubra com um insert de ~4-9s. Escolha a fonte NESTA ordem:
1. **Arquivo de B-roll do usuário** (bastidores, produto, cenas próprias) — sempre a primeira escolha.
2. **Stock footage** local se disponível (pessoas em situação: conflito no escritório, casal discutindo, cientista, família) — as referências usam stock real contextualizado com frequência.
3. **Mockup de dispositivo no Remotion**: laptop/celular com as palavras da lista "digitadas" na tela, feed de rede social simulado — contextualiza sem stock.
4. **Tipografia cinética pura no Remotion**: fundo do \`fundoInsert\` + palavras da lista (CAPS, bold) surgindo uma a uma em sincronia com a fala.

Formatos de insert (variar entre eles):
- **Fullscreen**: cobre tudo, 3-6s.
- **PiP metade inferior** (aprendido das referências): o insert ocupa a metade de baixo enquanto o apresentador continua visível em cima — ótimo para manter conexão com o rosto.
- **Painel de lista lower-half**: painel branco (com gradiente suave no topo) na metade inferior, itens em preto bold com hífen, acumulando um a um; apresentador visível acima.

Entrada: corte seco + whoosh. Cada item: pop. Saída: **flash branco de 2-3 frames** de volta ao apresentador.

### 4.7 Motion graphics curto — OBRIGATÓRIO em todo vídeo
Pelo menos **uma inserção de motion graphics de 3-5s criada do zero no Remotion**, cobrindo o trecho mais conceitual (definição, estatística, contraste, processo). Nunca no gancho nem no CTA — meio do vídeo. Formatos:
- Tipografia cinética com a frase-chave (ex.: palavras empilhando "PENSE. CRIE. FAÇA.")
- **Pictogramas animados** (aprendido das referências): stick figures/ícones geométricos pretos em fundo claro + palavras soltas acumulando ao redor ("preparar cenário / gravar / editar..."), com UMA palavra na \`corDestaque\` (ex.: DINHEIRO em verde)
- Diagrama animado simples (setas, círculos, fluxo)
- Número/estatística com contador animado
- Contraste duas colunas (certo vs errado) ou checklist com carimbo final (ex.: itens + carimbo "NÃO É ASSÉDIO")
- Estética: fundo sólido contrastando, 1-2 cores do theme, animações \`spring\`/\`interpolate\` — movimento fluido.
- Narração continua por baixo; elementos sincronizados com as palavras faladas.
- Entrada com whoosh, itens com pops, saída com flash branco ou corte seco.
- Vídeo 60s+ com dois momentos conceituais fortes: pode ter dois motions, nunca colados.

### 4.8 Abertura Q&A (quando aplicável)
Se o vídeo responde a uma pergunta de seguidor (formato "responde comentário/direct"):
- Abra com um **card estilo Instagram Stories**: caixinha branca com header ("DEIXE SUAS DÚVIDAS") e o texto da pergunta, centralizado no terço superior.
- O apresentador aparece olhando o celular; se possível, aplique leve blur/desfoque no vídeo enquanto o card está em foco (2-4s).
- O card sai em corte seco quando a resposta começa.

### 4.9 End card com logo — OBRIGATÓRIO
Todas as referências profissionais fecham com um cartão de marca de **3-5s**:
- Fundo escuro (ou cor da marca), **logo do apresentador** (arquivo se fornecido; senão, nome + título/CRP/OAB em tipografia elegante do theme), entrada com fade/spring sutil.
- A trilha sobe levemente durante o end card (não há fala) e faz fade-out junto com o fade to black.
- O CTA falado acontece ANTES do end card; o end card é só assinatura visual.

### 4.10 Finalização visual
- **Color grade**: sutil e uniforme (leve contraste/saturação, tom quente) — embutido no mezzanine (4.1).
- **Fade to black** nos últimos ~15 frames, junto com fade do áudio.

## ETAPA 5 — RENDER E CONTROLE DE QUALIDADE

1. Render: \`npx remotion render <CompId> out/final.mp4 --codec=h264\` (1080x1920). Mux da faixa tratada se processada fora.
2. **QC obrigatório antes de entregar**:
   - Folha de contato do resultado: legendas legíveis e fora do rosto, punch-ins alternando, keywords no gancho, motion no meio, B-roll no lugar, end card presente, fade final.
   - **Legendas sem palavra errada de transcrição** (corrections aplicadas).
   - **SFX PROVADOS POR MEDIÇÃO**: para 2-3 eventos (um hit, um pop, um whoosh), meça o RMS na banda do efeito no momento exato vs o mesmo trecho da voz pura — o efeito deve estar claramente presente (+6 dB ou mais na banda). "Coloquei o \`<Audio>\` no código" não é prova.
   - Sincronização legenda ↔ fala em 3 pontos (início, meio, fim).
   - Loudness final -14 LUFS ±1 e **true peak ≤ -1,0 dBTP** (se estourar, alimiter + re-mux, ver Etapa 3.5).
   - Duração dentro da meta.
3. Se algo falhar no QC, corrija e re-renderize antes de entregar.
4. Entregue o arquivo final + mini-relatório: duração final vs bruto, nº de cortes, takes descartados, efeitos aplicados (com as medições de SFX), theme usado, e pendências (ex.: trilha ausente, logo ausente).

---

## GUIA DE ESTILO — RESUMO RÁPIDO

| Elemento | Especificação |
|---|---|
| Formato | 1080x1920 (9:16), 30fps, H.264 |
| Duração alvo | 45-90s |
| Ritmo | 1 corte a cada 2-5s, zero pausas mortas |
| Legendas | fonte do theme, branca, **36-44px**, 2-5 palavras, **~55% da altura**, discretas |
| Ênfase (gancho/comandos) | CAPS **branco glow** (default) ou cor da marca, empilhando, sync palavra a palavra, hit por aparição |
| Jump cuts | punch-in 100% ↔ 118% + micro-translate ±2%, troca seca; creep zoom em segmentos longos |
| Afirmações fortes | zoom-in dedicado ~125-135%, 2-4x por vídeo, com whoosh |
| B-roll | hierarquia: arquivo do usuário > stock > mockup de dispositivo > tipografia; fullscreen, PiP lower-half ou painel de lista; saída com flash branco |
| Motion graphics | OBRIGATÓRIO: 1 inserção 3-5s no meio (tipografia, pictogramas, diagrama, contador, checklist+carimbo) |
| Abertura Q&A | card de pergunta estilo Stories quando o roteiro responde seguidor |
| End card | OBRIGATÓRIO: logo/nome 3-5s, trilha sobe, fade final |
| Voz | -14 LUFS, comprimida (LRA ~5-7), highpass 80Hz, TP ≤ -1,0 dBTP no arquivo final |
| Trilha | instrumental sutil ~-20dB abaixo da voz; sobe no end card |
| SFX | OBRIGATÓRIO: todo texto na tela com SFX no frame; ganhos CALIBRADOS POR MEDIÇÃO e provados no QC |
| Final | fade to black + fade de áudio (~0,5s) |

## PRINCÍPIOS

1. **O conteúdo manda**: a decupagem (takes certos, ritmo apertado) vale mais que qualquer efeito.
2. **Efeitos servem à retenção, não ao ego**: cada elemento existe para segurar atenção ou reforçar a fala.
3. **Sutileza profissional**: estética clean de autoridade, adequada ao nicho — não estética de meme. Legendas discretas, keywords brancas com glow, inserts contextualizados.
4. **Nada manual**: pipeline 100% reproduzível por código. Mesmo bruto → mesmo vídeo.
5. **Prove, não presuma**: transcrição conferida contra o áudio, SFX medidos no render, loudness medido no arquivo final.
`;

const PRE_REQUISITOS = [
  {
    nome: "Um agente com terminal",
    texto: "Claude Code, Codex ou Cursor. O prompt manda rodar comando e escrever arquivo, coisa que o chat do navegador não faz.",
  },
  {
    nome: "FFmpeg",
    texto: "Analisa o bruto, extrai o áudio, trata a voz e sintetiza os efeitos sonoros.",
  },
  {
    nome: "Whisper",
    texto: "Transcreve com timestamp por palavra. É o que sincroniza legenda, corte e efeito.",
  },
  {
    nome: "Node 18+ e Remotion",
    texto: "Onde a edição acontece de fato: cortes, legendas, zoom, motion graphics e o render final.",
  },
];

const ETAPAS = [
  {
    n: "0",
    titulo: "Define a identidade visual",
    texto: "Fonte, cor de destaque, estilo de legenda e de keyword, escolhidos pelo nicho de quem aparece no vídeo.",
  },
  {
    n: "1",
    titulo: "Analisa o bruto",
    texto: "Resolução, rotação, transcrição com timestamp por palavra e folha de contato. Inclui conferir onde o Whisper errou palavra.",
  },
  {
    n: "2",
    titulo: "Decupa",
    texto: "Escolhe o melhor take, joga fora bastidor e frase quebrada, aperta pausa. Alvo de um corte a cada 2 a 5 segundos.",
  },
  {
    n: "3",
    titulo: "Trata o áudio",
    texto: "Compressão, normalização em -14 LUFS, trilha por baixo e efeito sonoro em toda palavra que aparece na tela.",
  },
  {
    n: "4",
    titulo: "Monta e renderiza",
    texto: "Reframe 9:16, punch-in alternado, legendas curtas, keywords com glow, B-roll, motion graphics e end card.",
  },
];

export default function EditorDeVideosPage() {
  const [formUnlocked, setFormUnlocked] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [falhou, setFalhou] = useState(false);

  const storedLead = useSyncExternalStore(
    () => () => {},
    () => hasCapturedLead(),
    () => false
  );
  const review = useSyncExternalStore(
    () => () => {},
    () => ["localhost", "127.0.0.1"].includes(window.location.hostname),
    () => false
  );
  const unlocked = review || storedLead || formUnlocked;

  const copiar = async () => {
    const legado = () => {
      const campo = document.createElement("textarea");
      campo.value = PROMPT;
      campo.setAttribute("readonly", "");
      campo.style.position = "fixed";
      campo.style.top = "0";
      campo.style.opacity = "0";
      document.body.appendChild(campo);
      campo.select();
      let ok = false;
      try {
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      }
      document.body.removeChild(campo);
      return ok;
    };

    let ok = false;
    try {
      if (!navigator.clipboard) throw new Error("clipboard indisponível");
      await navigator.clipboard.writeText(PROMPT);
      ok = true;
    } catch {
      ok = legado();
    }

    if (!ok) {
      setFalhou(true);
      setTimeout(() => setFalhou(false), 6000);
      return;
    }
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-12 pb-16 text-white">
      {review && (
        <div
          className="rounded-xl px-4 py-3 text-center text-xs font-mono"
          style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
        >
          PRÉVIA LOCAL · conteúdo aberto. Em produção, o prompt fica protegido.
        </div>
      )}

      <header className="space-y-5 pt-6 text-center">
        <span
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
          style={{ borderColor: `${ACCENT}4D`, color: ACCENT }}
        >
          <Clapperboard className="h-4 w-4" />
          Prompt mestre
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
          A IA edita seu <span style={{ color: ACCENT }}>Reels inteiro</span>, do bruto ao
          arquivo final
        </h1>
        <p className="mx-auto max-w-xl text-lg text-[#999] leading-relaxed">
          Você entrega a gravação crua da câmera. Ela devolve um vertical 1080x1920 com corte,
          legenda sincronizada, zoom, efeito sonoro e cartão de marca. Sem abrir editor.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2">
        <article className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-5">
          <p className="text-[10px] font-mono uppercase tracking-widest text-[#666]">
            O que você entrega
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#bbb]">
            Um arquivo de câmera, geralmente 4K, com vários takes, erro de fala, tosse e conversa
            de bastidor. Uns três minutos de gravação.
          </p>
        </article>
        <article
          className="rounded-xl border bg-[#1a1a1d] p-5"
          style={{ borderColor: `${ACCENT}4D` }}
        >
          <p
            className="text-[10px] font-mono uppercase tracking-widest"
            style={{ color: ACCENT }}
          >
            O que volta
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#ddd]">
            Um Reels de 45 a 90 segundos, cortado a cada 2 a 5 segundos, legenda conferida palavra
            por palavra, áudio em -14 LUFS e relatório do que foi feito.
          </p>
        </article>
      </section>

      <section
        className="rounded-xl border p-5"
        style={{ borderColor: `${ACCENT}4D`, backgroundColor: `${ACCENT}0F` }}
      >
        <h2 className="flex items-center gap-2 font-semibold" style={{ color: ACCENT }}>
          <TriangleAlert className="h-4 w-4" />
          Isso não roda colando no chat
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#bbb]">
          O prompt manda executar comando, ler e gravar arquivo e renderizar vídeo na sua máquina.
          Colado no ChatGPT ou no Claude do navegador, você recebe uma explicação do que seria
          feito, não um vídeo. Ele é feito para agente com acesso ao terminal.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <Terminal className="h-5 w-5" style={{ color: ACCENT }} />
          O que precisa estar instalado
        </h2>
        <div className="space-y-2">
          {PRE_REQUISITOS.map((p) => (
            <article
              key={p.nome}
              className="rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4"
            >
              <h3 className="font-semibold">{p.nome}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">{p.texto}</p>
            </article>
          ))}
        </div>
        <p className="text-sm leading-relaxed text-[#777]">
          Tudo local e gratuito. Se você ainda não tem agente rodando no terminal, comece por{" "}
          <a
            href="/xquads/timedeagentes"
            className="underline underline-offset-4"
            style={{ color: ACCENT }}
          >
            sowsales.com.br/xquads/timedeagentes
          </a>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">O pipeline, em cinco etapas</h2>
        {ETAPAS.map((e) => (
          <article
            key={e.n}
            className="flex gap-4 rounded-xl border border-[#2a2a2e] bg-[#1a1a1d] p-4"
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
              style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
            >
              {e.n}
            </span>
            <div className="min-w-0">
              <h3 className="font-semibold">{e.titulo}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#999]">{e.texto}</p>
            </div>
          </article>
        ))}
      </section>

      {!unlocked ? (
        <LeadGate
          source="editordevideos-page"
          accent={ACCENT}
          buttonTextColor="#2a0410"
          title="Receba o prompt mestre completo"
          description="Preencha seus dados para liberar o documento inteiro, pronto para entregar ao seu agente."
          contentNote="São 210 linhas de especificação: theme, decupagem, tratamento de áudio com medição, montagem no Remotion e checklist de controle de qualidade."
          buttonLabel="Liberar o prompt"
          onUnlock={() => setFormUnlocked(true)}
        />
      ) : (
        <section className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p
                className="text-[10px] font-mono uppercase tracking-widest"
                style={{ color: ACCENT }}
              >
                Copie e entregue ao agente
              </p>
              <h2 className="text-2xl font-bold tracking-tight">O prompt mestre</h2>
            </div>
            <button
              onClick={copiar}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 cursor-pointer"
              style={{ backgroundColor: ACCENT, color: "#2a0410" }}
            >
              {copiado ? (
                <>
                  <Check className="h-4 w-4" /> Copiado
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" /> Copiar prompt
                </>
              )}
            </button>
          </div>
          {falhou && (
            <p className="rounded-lg border border-[#EF4444]/40 bg-[#EF4444]/10 px-4 py-3 text-sm text-[#FCA5A5]">
              Seu navegador bloqueou a cópia. Selecione o texto abaixo e copie com Ctrl+C ou Cmd+C.
            </p>
          )}
          <pre className="max-h-[32rem] select-all overflow-auto rounded-xl border border-[#2a2a2e] bg-[#0e0e10] p-5 text-[12.5px] leading-relaxed text-[#ccc] whitespace-pre-wrap font-mono">
            {PROMPT}
          </pre>
          <p className="flex items-start gap-2 text-sm leading-relaxed text-[#777]">
            <ArrowRight className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            Abra o agente na pasta onde está o vídeo, cole o prompt e diga qual é o arquivo. Ele
            pergunta só o que não conseguir deduzir sozinho.
          </p>
        </section>
      )}

      <SalesCta utmContent="editordevideos" />
      <p className="text-center text-xs text-[#555]">
        Feito por <span style={{ color: ACCENT }}>@rafa.grandi</span>
      </p>
    </div>
  );
}
