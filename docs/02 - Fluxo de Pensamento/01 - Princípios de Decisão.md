# Princípios de Decisão

Use estes filtros antes de aceitar qualquer feature.

## 1. Tempo do dono

> Se não economiza tempo do dono (ou não reduz erro operacional), não entra no MVP.

Perguntas:

- Isso tira quantas mensagens de ida e volta?
- Isso evita um esquecimento real (pedido, horário, estoque)?
- O dono usaria isso numa terça corrida?

## 2. Estado no sistema, conversa no WhatsApp

> Pedido e agenda nascem com **status claro**. WhatsApp comunica; não é a fonte da verdade.

Status mínimos de pedido: `novo` → `confirmado` → `preparando` → `pronto` → `entregue/retirado` (ou `cancelado`).

Status mínimos de agenda: `solicitado` → `confirmado` → `concluído` (ou `cancelado` / `no-show`).

## 3. Cidade = limite comercial

> E-commerce = raio local. Fora da cidade não é “fase 2 disfarçada”; é fora de escopo.

Validação no checkout: CEP/cidade ou “só retirada / entrega na cidade”. Sem frete nacional.

## 4. Single-tenant agora, tenant na cabeça

> MVP serve a ZooRações. Conceitos já carregam `loja_id` (mesmo que fixo).

Evita pintar no canto: branding, WhatsApp number, catálogo e pedidos sempre “da loja”.

## 5. Híbrido mínimo viável

Não construir “só vitrine” nem “ERP pet”. O híbrido do MVP é:

- Vitrine
- Catálogo + pedido local
- Agenda/serviços leve
- Painel do dono
- WhatsApp

## 6. Preferir fluxo completo a feature isolada

Melhor um pedido local **ponta a ponta** (site → painel → WhatsApp → retirada) do que cinco telas bonitas sem confirmação.

## Checklist rápido de aceite de ideia

| Pergunta | Sim → segue |
| --- | --- |
| Ajuda o dono hoje? | |
| Tem status claro? | |
| Respeita limite da cidade? | |
| Cabe no híbrido MVP? | |
| Não exige multi-loja/SaaS agora? | |

## Relacionados

- [[02 - Mapa de Valor (dono vs cliente)]]
- [[03 - Hipóteses e Riscos]]
- [[03 - Escopo do Produto/02 - Fora de Escopo|Fora de Escopo]]
