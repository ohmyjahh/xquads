/**
 * Opções do campo "área de atuação" do formulário de captura.
 * Fonte única: usada pelo LeadGate e pelo LeadForm.
 * Para incluir ou renomear uma área, altere somente este arquivo.
 */
export const AREAS_ATUACAO = [
  "Marketing e publicidade",
  "Criação de conteúdo",
  "Tecnologia e desenvolvimento",
  "Design",
  "Vendas",
  "Saúde",
  "Jurídico",
  "Educação",
  "Finanças e contabilidade",
  "Empreendedor ou autônomo",
  "Funcionário",
  "Estudante",
  "Outra",
] as const;

export type AreaAtuacao = (typeof AREAS_ATUACAO)[number];
