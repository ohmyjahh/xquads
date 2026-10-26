/**
 * Faixas do campo "faturamento mensal" do formulário de captura.
 * Fonte única: usada pelo LeadGate e pelo LeadForm.
 * Para alterar uma faixa, mexa somente neste arquivo.
 *
 * A primeira faixa começa em zero de propósito: contempla quem ainda não
 * fatura, sem precisar de uma opção separada para isso.
 */
export const FAIXAS_FATURAMENTO = [
  "De R$ 0 a R$ 20 mil",
  "De R$ 20 mil a R$ 50 mil",
  "De R$ 50 mil a R$ 100 mil",
  "De R$ 100 mil a R$ 500 mil",
  "Acima de R$ 500 mil",
] as const;

export type FaixaFaturamento = (typeof FAIXAS_FATURAMENTO)[number];
