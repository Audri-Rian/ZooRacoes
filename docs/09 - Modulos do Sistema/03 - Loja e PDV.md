# Módulo — Loja / PDV

**Bounded Contexts:** Estoque · Vendas · Financeiro (separados) · **Features:** `estoque`, `vendas`, `financeiro`

Varejo no balcão (e alinhado ao pedido online local já documentado). A separação em três contextos permite que uma loja tenha só `estoque`, outra `estoque` + `financeiro`.

## Categorias de produto (exemplos)

- Ração
- Medicamentos
- Brinquedos
- Petiscos
- Acessórios
- Higiene
- Produtos veterinários

## Venda (exemplo)

```text
VENDA #10482
Cliente: João

1x Ração Premier 10kg     R$ 189,90
2x Petisco                 R$ 29,80
1x Brinquedo               R$ 39,90
--------------------------------
TOTAL                      R$ 259,60
```

## Formas de pagamento

- Dinheiro
- PIX
- Débito
- Crédito
- Múltiplos pagamentos (split)
- Parcelamento

## Regra crítica

> **Venda → baixa automática no estoque.**

Sem baixa automática, o PDV não cumpre o papel de gestão.

## Relação com pedido online

| Canal | Comportamento |
| --- | --- |
| PDV balcão | Venda imediata + baixa estoque + pagamento |
| Pedido site (cidade) | Pedido com status → ao concluir/faturar, baixa estoque |

Ambos alimentam **histórico de compras** do tutor.

## Histórico financeiro (visão)

Na ficha do cliente: vendas, pagamentos, pendências (crédito da loja se houver). Detalhe de contas a receber pode ser submódulo na fase C/D.

## RF

RF-PDV01–PDV10 em [[03 - Escopo do Produto/03 - Requisitos Funcionais|Requisitos Funcionais]].

## Relacionados

- [[03 - Escopo do Produto/01 - Em Escopo (MVP)|Pedido local / catálogo]]
- [[04 - WhatsApp Eventos]]
