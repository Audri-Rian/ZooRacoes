# Módulo — WhatsApp (transversal)

Atravessa o sistema via **eventos**. Cada módulo publica um evento; o adaptador WhatsApp monta a mensagem.

## Exemplos de mensagens

### Consulta
> Olá, João!  
> A consulta do Thor está agendada para amanhã às 14h.

### Vacina
> Olá, João! A vacina V10 do Thor está próxima do vencimento. Deseja agendar a aplicação?

### Banho
> O banho do Thor foi concluído e ele já pode ser retirado.

### Pagamento / venda
> Sua compra de R$ 189,90 foi registrada.

## Catálogo de eventos (inicial)

| Evento | Origem | Fase |
| --- | --- | --- |
| `consulta.lembrete` | Agenda | D |
| `vacina.vencendo` | Vacinação (30 dias) | B |
| `banho.concluido` | Agenda/serviços | D |
| `venda.registrada` | PDV | C |
| `pedido.status` | Pedido online | A/C |
| `exame.resultado` | Laboratório | G |
| `receita.disponivel` | Prontuário | E |

## Modos de envio

| Modo | Quando |
| --- | --- |
| Assistido (painel abre wa.me / dispara com 1 clique) | Fases iniciais |
| Automático (Cloud API + templates aprovados) | Quando volume e compliance permitirem |

Regra: evento sempre registrado no sistema; envio pode ser manual ou automático conforme config da loja.

## RF

RF-W05+ e RF-W10+ em [[03 - Escopo do Produto/03 - Requisitos Funcionais|Requisitos Funcionais]].

## Relacionados

- [[05 - WhatsApp e Operação/01 - Papel do WhatsApp|Papel do WhatsApp]]
- [[02 - Vacinacao]]
