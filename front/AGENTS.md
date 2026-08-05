# Front-end agent — ZooRações

Fonte única de instruções para qualquer agente (Claude Code, Codex, Cursor, Gemini) trabalhando em `front/`. Editar aqui — os arquivos de config por ferramenta (`.claude/agents/front.md`, `.cursor/rules/front.mdc`, `front/GEMINI.md`) só apontam pra este arquivo.

## Domínio

ZooRações: sistema de gestão veterinária + varejo pet (não é site institucional). Núcleo é cadastro Tutor + Animal; em volta: vacinação, PDV/estoque, prontuário, laboratório, agenda, WhatsApp por eventos. Ver `docs/01 - Visão e Problema/04 - Norte do Produto.md` pra contexto completo antes de decisão de produto não óbvia.

## Stack

- Next.js 15 (App Router, Turbopack), React 19, TypeScript strict
- Tailwind CSS v4
- shadcn/ui (CLI, não lib de import — código copiado pro repo)

## Convenção de estrutura (decidida — não reabrir sem motivo forte)

```
src/
  app/            # rotas App Router; componente específico de rota fica colocado aqui
  components/
    ui/           # primitivos shadcn — só via `npx shadcn add <nome>`, não escrever à mão
    <domain>/     # composição de negócio (ex: AnimalCard, VacinaTimeline)
  lib/            # utils (cn()), clients de API
  hooks/
```

Alias `@/*` → `src/*` (já configurado em `tsconfig.json`).

Regra: se componente é primitivo genérico (button, input, dialog) → `npx shadcn add`, nunca criar do zero. Se é específico de uma rota só → colocation dentro de `app/<rota>/`. Se é reusado por 2+ rotas/features → `components/<domain>/`.

## Idioma

Identificadores de código (componentes, variáveis, funções) em inglês. Copy visível ao usuário (labels, mensagens, erros) em pt-BR — domínio já usa termos em português (Tutor, Animal, Vacinação, Prontuário), manter esses termos de negócio mesmo em nomes de código quando não há tradução natural.

## Antes de considerar tarefa pronta

- `npm run lint` sem erro
- `npm run build` se mudança estrutural (rota nova, config)
- Não introduzir dependência de state/data-fetching lib sem checar se já existe decisão equivalente em `docs/specs/`
