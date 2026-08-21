# Story 039 — Página 50 Códigos Secretos

## Objetivo

Publicar uma página de isca em `/codigossecretos` com 50 códigos criativos para geração de imagens no ChatGPT.

## Critérios de aceitação

- [x] Exibir exatamente 50 códigos com caso de uso curto.
- [x] Incluir busca e filtros por categoria.
- [x] Copiar código acompanhado de instrução editável.
- [x] Manter padrão visual Xquads com variação temática discreta.
- [x] Usar `LeadGate` e origem `50-codigos-chatgpt` em produção.
- [x] Abrir o conteúdo automaticamente somente em localhost.
- [x] Build, lint e publicação validados.

## File List

- `src/app/codigossecretos/page.tsx`
- `docs/stories/039-codigos-secretos.md`
- `src/components/layout/app-shell.tsx` (rotas standalone por exclusão do dashboard)

## Change Log

- **2026-08-21** — Build (`next build`) OK, rota `/codigossecretos` gerada como estática. Lint sem erros nos arquivos da story (58 problemas pré-existentes em outras páginas, fora de escopo). Publicado em `main` → auto-deploy Vercel.
