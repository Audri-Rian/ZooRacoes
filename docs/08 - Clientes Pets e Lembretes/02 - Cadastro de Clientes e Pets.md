# Cadastro de Clientes e Pets

## Objetivo

Dar à loja um cadastro único de tutores e animais, usado por pedidos, agenda e lembretes — sem planilha paralela.

## Quem cadastra

Somente **UsuarioOperador** autenticado no painel (dono/atendente).

No MVP, o tutor **não** cria conta no site. Dados de checkout/agenda podem **criar ou atualizar** cliente se o telefone já existir (upsert por telefone + loja).

## Fluxos de entrada do Cliente

| Origem | Comportamento |
| --- | --- |
| Painel — cadastro manual | Operador cria cliente + pets |
| Checkout de pedido | Se telefone novo → cria Cliente associado ao usuário logado (ou usuário padrão da loja); senão reutiliza |
| Solicitação de agenda | Idem upsert por telefone |
| Importação em massa | Fora do MVP |

## Regras

1. Cliente sempre tem `loja_id` + `usuario_id` (responsável)
2. Telefone/WhatsApp único por loja (evita duplicata)
3. Pet sempre ligado a um Cliente
4. Soft-desativar (`ativo=false`) em vez de apagar histórico
5. Pedido/agenda referenciam `cliente_id` quando possível (não só nome solto)

## Telas do painel (intenção)

- Lista de clientes (busca por nome/telefone)
- Ficha do cliente: dados + pets + pedidos recentes + lembretes abertos
- Ficha do pet: dados + histórico de cuidados + lembretes
- Filtro “meus clientes” (por `usuario_id`) — útil quando houver mais de um operador

## Relação com o que já existia

Substitui a ideia de “cadastro leve só para agenda” (RF-S04 / RF-A06) por um **módulo de cadastro** de verdade. Agenda e pedido passam a consumir esse cadastro.

## Relacionados

- [[01 - Modelo de Domínio]]
- [[03 - Sistema de Lembretes]]
- [[03 - Escopo do Produto/03 - Requisitos Funcionais|RF-CL]]
