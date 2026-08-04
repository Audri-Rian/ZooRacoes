# ZooRações — Documentação de Produto

Sistema de gestão **veterinária + varejo pet** para a ZooRações (e futuro multi-loja): núcleo **Tutor + Animais**, vacinação, PDV/estoque, prontuário, laboratório, agenda, site/pedido local e WhatsApp por eventos.

Local: `Github/Audri/ZooRacoes/docs`

## Norte em uma frase

> Núcleo = Tutor + Pets. Em volta: vacina, PDV, clínica e WhatsApp — faseado, sem tentar construir tudo no dia 1.

## Leitura recomendada

1. [[09 - Modulos do Sistema/00 - Índice|Módulos do Sistema]] (visão completa)
2. [[09 - Modulos do Sistema/09 - Faseamento do Produto|Faseamento A→I]]
3. [[REQUISITOS-FUNCIONAIS|Requisitos Funcionais (catálogo único)]]
4. [[10 - Arquitetura/01 - Bounded Contexts|Bounded Contexts]] + [[10 - Arquitetura/02 - Capabilities e Entitlements|Capabilities e Entitlements]]
5. [[06 - Multi-loja (Futuro)/03 - Super Admin e Feature Entitlements|Super Admin + Entitlements]]
6. [[specs/visao-sistema-veterinario|Spec visão]]

## Mapa da documentação

| Pasta | Para quê |
| --- | --- |
| [[01 - Visão e Problema/00 - Índice\|01 - Visão e Problema]] | Contexto, dor, personas, norte |
| [[02 - Fluxo de Pensamento/00 - Índice\|02 - Fluxo de Pensamento]] | Princípios e roadmap |
| [[03 - Escopo do Produto/00 - Índice\|03 - Escopo do Produto]] | Escopo, RF/RNF |
| [[04 - Fluxos/00 - Índice\|04 - Fluxos]] | Jornadas site/pedido/agenda |
| [[05 - WhatsApp e Operação/00 - Índice\|05 - WhatsApp e Operação]] | Canal e rotina |
| [[06 - Multi-loja (Futuro)/00 - Índice\|06 - Plataforma / Multi-loja]] | Super Admin, lojas, Feature Entitlements |
| [[07 - Spec Técnica (SDD)/00 - Índice\|07 - Spec Técnica (SDD)]] | Spec site híbrido |
| [[08 - Clientes Pets e Lembretes/00 - Índice\|08 - Clientes, Pets e Lembretes]] | Base de cadastro/lembretes |
| [[09 - Modulos do Sistema/00 - Índice\|09 - Módulos do Sistema]] | Visão completa modular |
| [[10 - Arquitetura/00 - Índice\|10 - Arquitetura]] | Bounded Contexts, capabilities, integração |
| [[specs/visao-sistema-veterinario\|specs/]] | Specs SDD |

## Decisões travadas

- Núcleo do sistema = **cadastro de clientes e animais**
- Arquitetura = **Bounded Contexts** isolados + contexto de **Feature Entitlements** (capabilities granulares)
- Toda implementação é associada a um contexto e a uma feature/capability
- Plataforma mínima desde o início: **Super Admin + cadastro de loja + Feature Entitlements**
- Loja com **1 veterinário**; CPF/CNPJ do tutor **não obrigatório**
- Intervalo/alerta de vacina é **por protocolo de cada vacina**, não valor único
- ZooRações = **primeira loja** cadastrada; entitlements ligados conforme cada módulo for liberado
- Sem billing/self-serve agora
- `loja_id` + isolamento desde o dia 1
- E-commerce online **só na cidade**
- WhatsApp transversal por **eventos**
- Visão completa existe; **entrega é faseada** (P → A→I)
- IA clínica só com **revisão humana**
- PDV exige **baixa automática de estoque**

## Status

Documentação de produto em evolução — sem código nesta fase.
