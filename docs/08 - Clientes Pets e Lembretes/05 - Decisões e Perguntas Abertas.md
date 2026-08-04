# Decisões e Perguntas Abertas

## Decisões já tomadas (nesta rodada)

| Tema | Decisão |
| --- | --- |
| Quem é “usuário” | Operador do painel (não o tutor) |
| Cliente associado a usuário | Sim — `usuario_id` responsável + `loja_id` |
| Portal do tutor | Não no MVP |
| Canal do lembrete | Fila no painel + WhatsApp assistido |
| Automação total WhatsApp | Evolução, não bloqueante |
| Prontuário clínico | Fora de escopo |
| Upsert por telefone | Pedido/agenda podem criar/atualizar cliente |

## Perguntas para validar com a loja

1. Quais tipos de cuidado são prioritários no dia 1 além de vacina? (vermífugo, antipulgas, retorno…)
2. A janela de alerta padrão é **7 dias antes** ou outro prazo?
3. Quem pode ver todos os clientes da loja vs só “meus clientes”?
4. No balcão, o registro de vacina será feito **sempre** no sistema ou só nos casos em que quiserem retorno?
5. Existe necessidade de anexar arquivo (carteirinha/PDF) no MVP? (default: **não**)

## Hipótese de valor

Se a fila de lembretes + WhatsApp assistido gerar retornos de vacina/vermífugo, o módulo se paga em recorrência — e reforça o cadastro de clientes como ativo da loja.

## Relacionados

- [[01 - Modelo de Domínio]]
- [[../specs/clientes-pets-lembretes|Spec SDD]]
