# Contexto do Negócio

## O que é a ZooRações

Loja do segmento **pet / veterinário de apoio**: ração, acessórios, produtos de higiene e, potencialmente, serviços (banho, tosa, consulta ou encaminhamento — conforme a operação real da loja).

Atua de forma **local**: o relacionamento com o cliente acontece na cidade, no balcão e no WhatsApp.

## Como a loja opera hoje (hipótese operacional)

| Canal | Uso típico |
| --- | --- |
| Balcão | Venda, retirada, atendimento presencial |
| WhatsApp | Pedidos, dúvidas de ração, disponibilidade, horários |
| Memória / planilha / papel | Estoque, agenda, “quem pediu o quê” |

O site entra como **camada de organização e captura**, não como substituto do relacionamento humano.

## Modelo de atuação do produto

| Fase | Modelo |
| --- | --- |
| MVP | Uma loja: ZooRações |
| Evolução | Multi-loja (mesma base conceitual, isolamento por `loja_id`) |

## Restrição geográfica de venda

Pedidos online só fazem sentido **dentro da cidade** (retirada na loja ou entrega local). Venda/entrega para fora da cidade está explicitamente fora de escopo — ver [[03 - Escopo do Produto/02 - Fora de Escopo|Fora de Escopo]].

## Relacionados

- [[02 - Problema e Oportunidade]]
- [[04 - Norte do Produto]]
