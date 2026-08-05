# Tasks pendentes (temporário — apagar depois)

Contexto: 3 specs de P (Plataforma) em andamento em `docs/specs/P - Plataforma/`. Abaixo, trilhas paralelas/seguintes.

## 2. Arquitetura front-end — DECIDIDO
- [x] Padrão shadcn/ui (CLI, não lib): `components/ui/` = primitivos copiados via `npx shadcn add`, `components/<domain>/` = composição de negócio, colocation de rota em `app/`
- [x] `shadcn init` rodado em `front/` — `components.json`, `src/lib/utils.ts`, `src/components/ui/button.tsx` já existem
- [x] Sem spec separada — decisão registrada aqui mesmo
- Depende de: nada (paralelo a P)
- Bloqueia: nada (task 4 liberada)

## 3. Pipeline de commit
- [ ] Definir mecanismo (git hooks / husky+lint-staged no front, algo equivalente no back Java, ou hook geral no repo)
- [ ] Escopo: lint, format, build/test mínimo antes de permitir commit
- [ ] Objetivo do usuário: "sem se preocupar com problemas" — commit falha cedo se quebrar padrão
- Depende de: nada
- Bloqueia: nada (pode entrar a qualquer momento)

## 4. Agents do projeto (multi-tool: Claude/Codex/Cursor/Gemini)
- [x] Agent front — fonte única `front/AGENTS.md` + adapters (`.claude/agents/front.md`, `.cursor/rules/front.mdc`, `front/GEMINI.md`); Codex lê AGENTS.md nativo
- [ ] Agent back — mesma estratégia (AGENTS.md canônico + adapters), segue Bounded Contexts / specs de P e módulos
- Depende de: nada (front feito)
