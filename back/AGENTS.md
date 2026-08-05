# Back-end agent — ZooRações

Fonte única de instruções para qualquer agente (Claude Code, Codex, Cursor, Gemini) trabalhando em `back/`. Editar aqui — os arquivos de config por ferramenta (`.claude/agents/back.md`, `.cursor/rules/back.mdc`, `back/GEMINI.md`) só apontam pra este arquivo.

## Domínio e arquitetura de negócio

Antes de qualquer feature nova, ler:
- `docs/10 - Arquitetura/01 - Bounded Contexts.md` — mapa de contextos, fronteiras, regra de que contexto não escreve direto no vizinho
- `docs/10 - Arquitetura/02 - Capabilities e Entitlements.md`
- `docs/10 - Arquitetura/04 - Regras de Implementacao.md` — checklist obrigatório (Definition of Ready / Done) pra toda funcionalidade

Essas regras de domínio **não se reabrem** aqui — o que segue é só a forma técnica de aplicá-las em Spring/Java.

## Stack

- Java 21, Spring Boot 4, Maven (módulo único — sem multi-módulo)
- Spring Data JPA + Flyway (migrations em `src/main/resources/db/migration/`)
- PostgreSQL

## Estrutura (decidida — não reabrir sem motivo forte)

**Módulo Maven único.** Um pacote por Bounded Context, cada um em **hexagonal** (ports & adapters):

```
com.zooracoes.api
  shared/
    event/              # DomainEvent, DomainEventPublisher (porta) — ver seção Eventos
  <context>/             # ex: cadastro, estoque, vendas, imunizacao, financeiro...
    domain/              # entidades, value objects, eventos de domínio, portas (interfaces)
    application/          # casos de uso — implementam portas de entrada, orquestram domain + portas de saída
    adapter/
      in/web/              # controllers REST (porta de entrada)
      out/persistence/      # entidades JPA + repositórios (porta de saída)
```

Regra: `application/` não conhece Spring nem JPA diretamente — só interfaces (`domain/`). `adapter/` implementa as interfaces. Controller nunca chama `adapter/out/` direto, sempre via caso de uso.

## Eventos entre contextos — DECIDIDO

Mecanismo: **Spring `ApplicationEventPublisher` in-process**, atrás da porta `shared.event.DomainEventPublisher`.

- Publicar: caso de uso injeta `DomainEventPublisher` (porta), nunca `ApplicationEventPublisher` do Spring direto
- Evento: record imutável implementando `DomainEvent`, nome `<Contexto><Fato>Event` (ex: `VendaRegistradaEvent`), carrega só IDs + dado mínimo — quem consome e precisa de mais busca via porta do contexto de origem
- Consumir: listener no `application/` do contexto consumidor, `@TransactionalEventListener(phase = AFTER_COMMIT)` — só reage se a transação que gerou o fato commitou
- Síncrono por padrão. `@Async` só se precisar, listener a listener — não é decisão de arquitetura, é ajuste local

**Por quê não outbox/fila:** módulo único + banco único já dão consistência via `AFTER_COMMIT`. Outbox resolve inconsistência entre processos distintos — não é o caso aqui (1 loja, monolito). Revisitar se back virar múltiplos serviços deployáveis.

## Antes de considerar tarefa pronta

- Checklist de `04 - Regras de Implementacao.md` (DoR antes de codar, DoD antes de fechar)
- `./mvnw test`
- `./mvnw spotless:check` (ou `spotless:apply` se sujo)
