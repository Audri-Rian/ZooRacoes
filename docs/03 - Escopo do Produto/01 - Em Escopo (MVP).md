# Em Escopo (fundação + paralelo site)

> A visão completa está em [[09 - Modulos do Sistema/00 - Índice|09 - Módulos]]. Este doc descreve o que cabe nas **Fases A–C (+ J site)** para a ZooRações começar a operar.

Tudo abaixo serve **uma loja: ZooRações**. Conceitos com `loja_id` fixo.

## 1. Vitrine institucional

- Marca ZooRações (nome, tom, identidade básica)
- Horários de funcionamento
- Localização / como chegar
- Serviços oferecidos (lista)
- CTAs: ver catálogo, pedir, agendar, WhatsApp

## 2. Catálogo e pedido local

- Listagem de produtos (ração, acessórios, etc.)
- Detalhe do produto (nome, descrição curta, preço, disponibilidade)
- Carrinho
- Checkout **local**:
  - Retirada na loja **ou**
  - Entrega na cidade
- Bloqueio / mensagem clara se endereço/CEP estiver fora da cidade
- Pedido com status no sistema
- Contato do cliente (nome, telefone/WhatsApp)

Pagamento no MVP: preferência por **pagamento na retirada/entrega** se simplificar; online local só se for requisito explícito na implementação.

## 3. WhatsApp

- CTA “Falar no WhatsApp” com mensagem pré-preenchida (produto / pedido / dúvida)
- A partir do painel: ação do dono para avisar cliente (deep link ou disparo assistido)
- Contrato de mensagens e gatilhos documentados — ver [[05 - WhatsApp e Operação/02 - Mensagens e Gatilhos|Mensagens e Gatilhos]]
- API Business oficial = evolução permitida, não bloqueante do MVP

## 4. Apoio operacional — painel do dono

- Login do dono/operador
- Pedidos do dia / fila de status
- CRUD básico de produtos + pausar/indisponibilizar
- Estoque mínimo ou flag de disponibilidade
- Agenda do dia (serviços)
- Módulo de **clientes, pets e lembretes** (ver seção 6)

## 5. Agendamento e serviços

- Tipos de serviço (ex.: banho, tosa — conforme loja)
- Solicitação de horário pelo cliente
- Confirmação pelo dono no painel
- Usa cadastro de Cliente/Pet (upsert por telefone quando necessário)
- Lembrete de agenda via WhatsApp (assistido no MVP)

## 6. Clientes, pets e lembretes de cuidado

- Cadastro de Cliente associado à loja e ao **usuário operador** responsável
- Cadastro de Pets do cliente
- Registro de cuidados (ex.: vacina aplicada)
- Lembretes de retorno (ex.: próxima vacina em X meses)
- Fila no painel: hoje / 7 dias / vencidos
- Aviso ao tutor via WhatsApp assistido
- Detalhe: [[08 - Clientes Pets e Lembretes/00 - Índice|Clientes, Pets e Lembretes]]

## 7. Modelo mental multi-loja (só documentação + IDs)

- Entidades “pertencem” a uma loja
- Sem UI de tenant, sem billing, sem self-serve

## Critério de “MVP completo”

Fluxos ponta a ponta de [[04 - Fluxos/03 - Pedido Local + WhatsApp|Pedido Local]], [[04 - Fluxos/04 - Agendamento e Serviços|Agendamento]] e [[08 - Clientes Pets e Lembretes/04 - Fluxo Vacinação e Retorno|Vacinação e Retorno]] funcionando com o dono no painel.

## Relacionados

- [[02 - Fora de Escopo]]
- [[03 - Requisitos Funcionais]]
