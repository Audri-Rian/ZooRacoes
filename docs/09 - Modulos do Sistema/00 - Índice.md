# 09 — Módulos do Sistema

Visão completa do produto: **sistema de gestão veterinária + varejo pet**, com WhatsApp atravessando os eventos. O cadastro de **clientes e animais é o núcleo**.

**Arquitetura:** cada módulo abaixo pertence a um Bounded Context e é exposto por feature/capability — ver [[10 - Arquitetura/00 - Índice|10 - Arquitetura]].

## Norte atualizado

> Núcleo = Tutor + Pets. Em volta: vacinação, clínica (prontuário), PDV/estoque, laboratório, agenda e comunicação via WhatsApp — com templates e IA como aceleradores do veterinário.

## Mapa de módulos

| Módulo | Nota | Fase sugerida |
| --- | --- | --- |
| Núcleo Cliente/Animal | [[01 - Nucleo Clientes e Animais]] | A — Fundação |
| Vacinação | [[02 - Vacinacao]] | B |
| Loja / PDV | [[03 - Loja e PDV]] | C |
| WhatsApp (eventos) | [[04 - WhatsApp Eventos]] | B+ (cresce com cada módulo) |
| Prontuário | [[05 - Prontuario Veterinario]] | E |
| Laboratório | [[06 - Laboratorio]] | G |
| Templates de consulta | [[07 - Templates de Consulta]] | H |
| IA clínica | [[08 - IA Clinica]] | I |
| Faseamento | [[09 - Faseamento do Produto]] | — |
| Decisões e perguntas abertas | [[10 - Perguntas Abertas]] | — |

## Specs

- [[../specs/visao-sistema-veterinario|visao-sistema-veterinario]] (mapa + decisões)
- Specs pontuais: [[../specs/clientes-pets-lembretes|clientes-pets-lembretes]] (base do núcleo)

## Relação com docs anteriores

- Site/vitrine/pedido online local continua válido — ver [[07 - Spec Técnica (SDD)/site-apoio-zooracoes|site-apoio]]
- Módulo 08 (lembretes leves) **evolui** para Vacinação + alertas — não contradiz; aprofunda
- “Prontuário fora do MVP” no doc antigo = **fora da Fase A–C**; entra na Fase E

← [[00 - Índice|Índice raiz]]
