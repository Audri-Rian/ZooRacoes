# Hipóteses e Riscos

## Hipóteses de produto (testáveis)

| ID | Hipótese | Sinal de validação |
| --- | --- | --- |
| H1 | Pedido pelo site reduz ida e volta no WhatsApp para compras recorrentes de ração | Menos mensagens por pedido concluído; dono confirma no painel |
| H2 | Cliente aceita limite “só na cidade” se a mensagem for clara no checkout | Baixa taxa de abandono por CEP fora; poucas reclamações |
| H3 | Dono prefere disparo assistido / deep link no início a automação total | Uso real do botão “avisar no WhatsApp” no painel |
| H4 | Agenda leve (sem clínica completa) já reduz esquecimento de horários | Menos no-show / menos “esqueceu o horário” |
| H5 | Catálogo com disponibilidade básica evita frustração | Menos “pedi e não tinha” |
| H6 | Modelo com `loja_id` desde o início não atrasa o MVP se o tenant for fixo | Implementação single-tenant sem retrabalho estrutural óbvio |

## Riscos

| Risco | Impacto | Mitigação |
| --- | --- | --- |
| Dono não adota o painel e continua só no WhatsApp | Produto vira vitrine inútil | Rotina diária simples; onboarding focado em “abrir o dia” |
| Catálogo desatualizado | Cliente pede o que não tem | Pausar produto fácil; estoque mínimo; alerta de item crítico |
| WhatsApp Business API / aprovação / custo | Bloqueia automação | MVP: wa.me + mensagem pré-preenchida; API como evolução |
| Escopo inchado (ERP, fiscal, frete nacional) | Atraso infinito | [[03 - Escopo do Produto/02 - Fora de Escopo\|Fora de Escopo]] rígido |
| Multi-loja cedo demais | Complexidade sem receita | Premissas documentadas; implementação depois |
| Pagamento online complexo no dia 1 | Fricção técnica e suporte | Pode começar com pagamento na retirada/entrega local; online depois se necessário |

## O que aprender primeiro (ordem)

1. O dono confirma pedidos no painel?
2. Clientes completam checkout local?
3. WhatsApp assistido basta para o ritmo da loja?
4. Agenda é usada ou fica ociosa?

## Relacionados

- [[04 - Roadmap Mental (MVP → multi-loja)]]
- [[01 - Princípios de Decisão]]
