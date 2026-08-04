# Mensagens e Gatilhos

Textos são templates — ajustar tom da marca ZooRações na implementação.

## Gatilhos do cliente → loja

| Gatilho | Contexto na mensagem |
| --- | --- |
| CTA genérico | “Olá, ZooRações! Vim pelo site.” |
| Produto | Nome do produto + “Quero saber disponibilidade/preço” |
| Pós-pedido | Nº do pedido + modalidade + “Preciso de ajuda” |
| Pós-solicitação de agenda | Serviço + data/hora pedida + “Sobre meu agendamento” |

## Gatilhos do dono → cliente (painel)

| Gatilho | Intenção da mensagem |
| --- | --- |
| Pedido confirmado | “Seu pedido #{n} foi confirmado. Modalidade: …” |
| Pedido pronto (retirada) | “Seu pedido #{n} está pronto para retirada.” |
| Saiu para entrega | “Seu pedido #{n} saiu para entrega.” |
| Pedido cancelado | “Seu pedido #{n} foi cancelado. Motivo: …” |
| Agenda confirmada | “Agendamento confirmado: {serviço} em {data/hora}.” |
| Lembrete de agenda | “Lembrete: {serviço} amanhã/hoje às {hora}.” |
| Remarcação | “Precisamos remarcar seu horário de {serviço}…” |
| Lembrete de cuidado | “{nome_pet} está perto da data de {tipo_cuidado} ({data_prevista}). Quer agendar?” |
| Pós-vacina / retorno | “Registramos a {tipo_cuidado} do {nome_pet}. Próximo retorno sugerido: {data_prevista}.” |

## Contrato mínimo do deep link

Parâmetros lógicos (não stack):

- `telefone_loja` (E.164)
- `texto` (URL-encoded)
- `origem` (produto | pedido | agenda | lembrete_cuidado | generico)
- `referencia_id` (id do produto/pedido/agendamento/lembrete quando houver)

## Boas práticas

- Sempre incluir **nome da loja** e **identificador** (pedido/agenda)
- Resumo curto; detalhes longos ficam no painel
- Não colocar dados sensíveis desnecessários no texto
- Manter tom humano, não robótico demais

## Evolução API

Quando houver Cloud API:

- Mapear os mesmos gatilhos para templates aprovados
- Manter o painel como origem do evento
- Respeitar janela de 24h / políticas Meta

## Relacionados

- [[01 - Papel do WhatsApp]]
- [[04 - Fluxos/03 - Pedido Local + WhatsApp|Pedido Local + WhatsApp]]
