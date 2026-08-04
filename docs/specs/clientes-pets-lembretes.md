# Spec SDD — Clientes, Pets e Lembretes

**Status:** pronta para detalhar implementação  
**Depende de:** painel autenticado, `loja_id`, WhatsApp assistido  
**Docs de produto:** [[08 - Clientes Pets e Lembretes/00 - Índice]]

---

## 1. Contexto

A ZooRações precisa reter relacionamento com tutores e pets além da venda pontual. Cuidados recorrentes (vacina, vermífugo, etc.) exigem lembrete meses depois. Cadastro de cliente fica associado ao **usuário operador** que gerencia o relacionamento.

---

## 2. Problema

- Retornos de vacina/cuidados dependem de memória ou WhatsApp solto
- Sem ficha de cliente/pet, agenda e pedidos não formam histórico
- Dono não tem fila clara de “quem chamar esta semana”

---

## 3. Objetivos

1. CRUD de Cliente associado a `loja_id` + `usuario_id`
2. CRUD de Pet ligado ao Cliente
3. Registrar cuidado realizado e gerar lembrete de retorno
4. Fila de lembretes no painel (hoje / 7 dias / vencidos)
5. Aviso WhatsApp assistido com contexto (pet + tipo + data)
6. Upsert de cliente por telefone a partir de pedido/agenda

---

## 4. Não Objetivos

- Portal/login do tutor
- Prontuário veterinário / prescrição / CRMV
- Estoque farmacêutico de vacinas
- Disparo WhatsApp 100% automático (MVP)
- E-mail/SMS/push
- Anexos de carteirinha (default MVP: não)
- Importação em massa de clientes

---

## 5. Requisitos Funcionais

Ver IDs canônicos em [[03 - Escopo do Produto/03 - Requisitos Funcionais|RF-CL / RF-L / RF-W]].

Resumo:

- RF-CL01–CL08 — clientes e pets
- RF-L01–L08 — lembretes e cuidados
- RF-W05–W06 — WhatsApp de lembrete de cuidado
- RF-A06 ampliado — painel consome o módulo

---

## 6. Requisitos Não Funcionais

| ID | Requisito |
| --- | --- |
| RNF-CL01 | Busca de cliente por nome/telefone usável no balcão (rápida) |
| RNF-CL02 | Telefone único por loja |
| RNF-L01 | Fila de lembretes carrega sem fricção no mobile do dono |
| RNF-L02 | Mudança de status de lembrete auditável (quem/quando) |
| RNF-L03 | Dados de cliente/pet só no painel autenticado |

---

## 7. Fluxos

- Cadastro: [[08 - Clientes Pets e Lembretes/02 - Cadastro de Clientes e Pets]]
- Lembretes: [[08 - Clientes Pets e Lembretes/03 - Sistema de Lembretes]]
- Vacina: [[08 - Clientes Pets e Lembretes/04 - Fluxo Vacinação e Retorno]]

---

## 8. Casos de Borda

| Caso | Esperado |
| --- | --- |
| Telefone duplicado na loja | Impedir create; oferecer abrir ficha existente |
| Checkout com telefone existente | Reutilizar cliente; atualizar nome se vazio/diferente com cuidado |
| Lembrete sem telefone | Só painel; WhatsApp desabilitado com motivo |
| Concluir cuidado com lembrete aberto do mesmo tipo | Conclui o aberto e cria o próximo |
| Pet desativado | Dispensa ou oculta lembretes abertos |
| Adiar lembrete | Nova data; status `pendente` |

---

## 9. Impactos Técnicos (genéricos)

| Conceito | Notas |
| --- | --- |
| Serviço Cliente/Pet | CRUD + upsert por telefone+loja |
| Serviço Cuidado/Lembrete | Criação em cadeia pós-cuidado; fila por data/status |
| Job/consulta de vencidos | Diário: marcar `pendente` → `vencido` quando data passou |
| Adaptador WhatsApp | Novo origem: `lembrete_cuidado` |
| AuthZ | Operador só acessa dados da própria `loja_id` |
| Filtro usuário | “Meus clientes” por `usuario_id` |

Entidades: `Cliente`, `Pet`, `TipoCuidado`, `RegistroCuidado`, `Lembrete` (+ `UsuarioOperador`, `Loja` já previstos).

---

## 10. Riscos

| Risco | Mitigação |
| --- | --- |
| Dono não registra vacina no sistema | UX de registro em poucos toques; valor da fila visível |
| Cadastro vira prontuário inchado | Fora de escopo clínico explícito |
| Spam de WhatsApp | Assistido (humano dispara); sem automático no MVP |
| Duplicata de cliente | Unique telefone+loja + upsert |

---

## 11. Critérios de Aceitação

- [ ] Operador cadastra cliente associado a si (`usuario_id`) e à loja
- [ ] Operador cadastra pets no cliente
- [ ] Registro de vacina gera lembrete com data futura editável
- [ ] Fila mostra hoje / 7 dias / vencidos
- [ ] Aviso WhatsApp abre com nome do pet, tipo e data
- [ ] Registrar novo cuidado conclui lembrete anterior e pode criar o próximo
- [ ] Dispensar e adiar funcionam
- [ ] Pedido/agenda com telefone novo cria cliente; telefone existente reutiliza
- [ ] Sem acesso a clientes de outra loja (quando multi-loja existir)

---

## 12. Checklist de Implementação

1. [ ] Modelo Cliente/Pet com `loja_id` + `usuario_id`
2. [ ] Telas lista/ficha cliente e pet
3. [ ] TipoCuidado + RegistroCuidado
4. [ ] Geração de Lembrete pós-cuidado
5. [ ] Fila de lembretes + status
6. [ ] Job/regra de `vencido`
7. [ ] WhatsApp assistido (RF-W05/W06)
8. [ ] Upsert no checkout/agenda
9. [ ] Filtro meus clientes
10. [ ] Casos de borda e auditoria mínima
