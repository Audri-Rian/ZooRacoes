# Casos de Borda

## Pedido

| Caso | Comportamento esperado |
| --- | --- |
| Produto esgota durante o carrinho | Impedir checkout do item; mensagem clara; sugerir WhatsApp |
| CEP/cidade fora da área | Bloquear entrega; oferecer retirada se fizer sentido; senão impedir pedido online |
| Loja fechada | Permitir pedido com aviso de prazo **ou** bloquear conforme config; nunca silenciar |
| Cliente sem telefone válido | Checkout incompleto — telefone obrigatório |
| Cancelamento pelo dono | Status `cancelado` + caminho WhatsApp para avisar |
| Item pausado no catálogo | Não aparece como comprável |
| Carrinho vazio | Não inicia checkout |
| Dois pedidos seguidos do mesmo cliente | Ambos válidos; sem merge automático no MVP |

## Agenda

| Caso | Comportamento esperado |
| --- | --- |
| Horário já ocupado | Dono recusa/remarca; cliente pode ser avisado via WhatsApp |
| No-show | Status `no-show`; não apagar histórico |
| Cliente remarca | MVP: via WhatsApp / dono edita no painel |
| Serviço inativo | Não listar para novos agendamentos |
| Pet sem dados mínimos | Pedir nome (+ espécie/porte se necessário) |

## WhatsApp

| Caso | Comportamento esperado |
| --- | --- |
| Cliente sem WhatsApp no número | Telefone ainda serve para contato; deep link pode falhar — dono liga/SMS se precisar |
| API indisponível / sem conta Business | Deep link wa.me continua funcionando |
| Mensagem muito longa no pré-preenchido | Truncar resumo; manter nº do pedido |

## Painel / operação

| Caso | Comportamento esperado |
| --- | --- |
| Dono offline | Pedidos acumulam como `novo`; processa depois |
| Dois operadores (futuro) | MVP single user ok; depois papéis |
| Queda de rede no submit | Evitar pedido duplicado (idempotência na implementação) |

## Relacionados

- [[03 - Pedido Local + WhatsApp]]
- [[04 - Agendamento e Serviços]]
- [[07 - Spec Técnica (SDD)/site-apoio-zooracoes|Spec SDD]]
