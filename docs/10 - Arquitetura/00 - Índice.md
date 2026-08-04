# 10 — Arquitetura

Arquitetura do SaaS baseada em **Bounded Contexts** + **Feature Entitlements**.

## Princípio central

> **Bounded Contexts** representam os domínios e suas regras de negócio.  
> **Feature Entitlements** determinam quais capacidades desses domínios estão disponíveis para cada tenant/loja.

Os Bounded Contexts **não conhecem** nem controlam entitlements. O controle vive numa camada de autorização de capacidades.

## Notas

- [[01 - Bounded Contexts]]
- [[02 - Capabilities e Entitlements]]
- [[03 - Integracao entre Contextos]]
- [[04 - Regras de Implementacao]]

## Relacionados

- [[06 - Multi-loja (Futuro)/03 - Super Admin e Feature Entitlements|Super Admin e Entitlements]]
- [[06 - Multi-loja (Futuro)/04 - Catalogo de Features|Catálogo de Features]]
- [[09 - Modulos do Sistema/00 - Índice|Módulos do Sistema]]

← [[00 - Índice|Índice raiz]]
