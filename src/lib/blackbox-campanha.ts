/**
 * Campanha Black Box IA — ponto único de controle.
 *
 * Governa as DUAS peças que aparecem automaticamente em todas as páginas:
 *   1. o pop-up (arte vertical), 3 segundos depois de abrir a página
 *   2. a faixa (arte horizontal), logo depois da primeira dobra
 *
 * PARA DESLIGAR TUDO: ponha ATIVA em false. Nada mais precisa ser alterado.
 * Mesmo esquecendo disso, as duas peças somem sozinhas depois de FIM_DA_CAMPANHA.
 */

/** Chave geral. false = nem pop-up nem faixa, em nenhuma página. */
export const ATIVA = true;

/**
 * Para onde o clique leva, com os UTMs da campanha.
 * Link e marcação definidos pelo dono em 23/11/2026.
 */
export const LINK_DA_CAMPANHA =
  "https://rafagrandi.com.br/blackbox-cadastro?utm_campaign=METNOV26&utm_source=ORGANICO&utm_medium=SOCIAL&utm_content=INSTAGRAM&utm_term=STORIES";

/**
 * Quando a campanha sai do ar, por conta própria.
 * A Black Box é na sexta, 27/11; as peças ficam no ar até o fim desse dia.
 */
export const FIM_DA_CAMPANHA = new Date("2026-11-27T23:59:00-03:00").getTime();

/** Tempo até o pop-up abrir, em milissegundos. */
export const SEGUNDOS_ATE_O_POPUP = 3000;

/**
 * Rotas que NÃO recebem as peças automáticas.
 * As `-bf` já trazem o convite no próprio conteúdo: receberiam em dobro.
 */
export const ROTAS_EXCLUIDAS = [
  "/claudelinkedin-bf",
  "/codigossecretos-bf",
  "/codigossecretos-bf2",
  "/emprego-bf",
  "/familia-bf",
  "/insta-bf",
  "/playcanvas-bf",
  "/produtividade-bf",
  "/vendedor24h-bf",
];

/** A campanha está valendo agora? */
export function campanhaNoAr(agora: number = Date.now()): boolean {
  return ATIVA && agora < FIM_DA_CAMPANHA;
}

/** Esta rota recebe as peças automáticas? */
export function rotaRecebeCampanha(pathname: string): boolean {
  if (!pathname || pathname === "/") return false;
  return !ROTAS_EXCLUIDAS.some((r) => pathname === r || pathname.startsWith(`${r}/`));
}

/** Identificador da página para o utm_content, a partir da rota. */
export function slugDaRota(pathname: string): string {
  const limpo = pathname.replace(/^\/+|\/+$/g, "");
  return limpo === "" ? "home" : limpo.replace(/\//g, "-");
}
