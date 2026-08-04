# Pedido Local + WhatsApp

## Fluxo feliz

```mermaid
sequenceDiagram
  participant C as Cliente
  participant S as Site
  participant P as PainelDono
  participant W as WhatsApp

  C->>S: Monta carrinho
  C->>S: Checkout local
  S->>S: Valida cidade
  S->>P: Cria pedido status novo
  S->>C: Tela de confirmacao
  C->>W: Opcional falar com loja
  P->>P: Dono confirma pedido
  P->>W: Dono avisa cliente
  W->>C: Mensagem de confirmacao
  P->>P: Status preparando pronto
  C->>P: Retira ou recebe na cidade
  P->>P: Status entregue ou retirado
```

## Regras

1. Pedido só conclui checkout se modalidade + área forem válidas
2. Status vive no painel/sistema
3. WhatsApp é opcional para o cliente no momento do pedido, mas **recomendado** para o dono na confirmação
4. Mensagem pré-preenchida inclui: nome da loja, nº do pedido, resumo curto, modalidade

## Status do pedido

| Status | Quem move | Significado |
| --- | --- | --- |
| `novo` | Sistema | Acabou de chegar |
| `confirmado` | Dono | Loja aceitou |
| `preparando` | Dono | Em montagem |
| `pronto` | Dono | Pode retirar / sai para entrega |
| `entregue` / `retirado` | Dono | Concluído |
| `cancelado` | Dono (ou regras) | Não segue |

## Integração WhatsApp neste fluxo

| Gatilho | Ação MVP |
| --- | --- |
| Cliente no produto | wa.me com nome do produto |
| Cliente pós-pedido | wa.me com nº do pedido |
| Dono confirma | Botão no painel → mensagem ao telefone do cliente |
| Dono marca pronto | Idem, texto de “pedido pronto” |

Detalhe dos textos: [[05 - WhatsApp e Operação/02 - Mensagens e Gatilhos|Mensagens e Gatilhos]].

## Relacionados

- [[05 - Casos de Borda]]
- [[03 - Escopo do Produto/03 - Requisitos Funcionais|RF-P / RF-W]]
