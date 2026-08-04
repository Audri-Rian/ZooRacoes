# Papel do WhatsApp

## O que o WhatsApp É

- Canal de **confirmação**, **dúvida** e **status**
- Extensão do relacionamento da loja com o tutor
- Forma rápida de o dono falar com contexto (pedido nº X, horário Y)

## O que o WhatsApp NÃO É

- Banco de dados de pedidos
- Estoque
- Agenda oficial
- CRM completo

A **fonte da verdade** é o sistema (site + painel).

## Estratégia em camadas

| Camada | MVP | Evolução |
| --- | --- | --- |
| Deep link `wa.me` | Sim | Mantém |
| Mensagem pré-preenchida | Sim | Mantém |
| Disparo assistido no painel | Sim | Mantém |
| WhatsApp Cloud API / templates | Não obrigatório | Quando volume/aprovação justificar |
| Chatbot autônomo | Não | Só se não piorar o trabalho do dono |

## Princípio

> Automatizar a **comunicação repetitiva**; não remover o humano da ZooRações.

## Número WhatsApp

- No MVP: um número da loja ZooRações
- No multi-loja: um número (ou conta) por `loja_id` — ver [[06 - Multi-loja (Futuro)/01 - Premissas de Tenant|Premissas de Tenant]]

## Relacionados

- [[02 - Mensagens e Gatilhos]]
- [[02 - Fluxo de Pensamento/01 - Princípios de Decisão|Princípios de Decisão]]
