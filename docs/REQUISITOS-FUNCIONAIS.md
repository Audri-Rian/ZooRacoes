# ZooRações — Requisitos Funcionais (catálogo único)

**Fonte canônica** de todos os RF documentados até agora.  
Atualizado: 2026-08-01

| | |
| --- | --- |
| Produto | Sistema veterinário + varejo pet (ZooRações) |
| Arquitetura | Bounded Contexts + Feature Entitlements (`10 - Arquitetura/`) |
| Faseamento | P plataforma · A núcleo · B vacina · C PDV · D agenda · E/F prontuário/docs · G lab · H templates · I IA · J site |
| Detalhe modular | `09 - Modulos do Sistema/` · `06 - Multi-loja (Futuro)/03 - Super Admin e Feature Entitlements.md` |

---

## Sumário por prefixo

| Prefixo | Módulo | Qtd | Fase |
| --- | --- | --- | --- |
| RF-ARQ | Arquitetura / Bounded Contexts | 7 | transversal |
| RF-SA | Super Admin | 8 | P |
| RF-FE | Feature Entitlements | 11 | P |
| RF-V | Vitrine / site | 3 | J |
| RF-C | Catálogo (site) | 4 | J / C |
| RF-P | Pedido local (e-commerce cidade) | 7 | J |
| RF-A | Painel do operador | 7 | A+ |
| RF-S | Agendamento / serviços | 5 | D |
| RF-CL | Clientes e animais (núcleo) | 14 | A |
| RF-L | Cuidados e lembretes genéricos | 9 | A/B |
| RF-VAC | Vacinação / Imunização | 11 | B |
| RF-PDV | Loja / PDV | 11 | C |
| RF-PR | Prontuário veterinário | 12 | E/F |
| RF-LAB | Laboratório | 10 | G |
| RF-TPL | Templates de consulta | 6 | H |
| RF-IA | IA clínica | 5 | I |
| RF-W | WhatsApp (transversal) | 13 | B+ |
| RF-M | Multi-loja / tenant | 5 | P |
| | **Total** | **148** | |

---

## Índice

0. [Super Admin (RF-SA)](#0-super-admin-rf-sa--fase-p)
0b. [Feature Entitlements (RF-FE)](#0b-feature-entitlements-rf-fe--fase-p)
1. [Vitrine (RF-V)](#1-vitrine-rf-v--fase-j)
2. [Catálogo (RF-C)](#2-catálogo-rf-c--fase-j--c)
3. [Pedido local (RF-P)](#3-pedido-local-rf-p--fase-j)
4. [Painel do operador (RF-A)](#4-painel-do-operador-rf-a--fase-a)
5. [Agendamento (RF-S)](#5-agendamento-rf-s--fase-d)
6. [Clientes e animais (RF-CL)](#6-clientes-e-animais-rf-cl--fase-a)
7. [Cuidados e lembretes (RF-L)](#7-cuidados-e-lembretes-rf-l--fase-ab)
8. [Vacinação (RF-VAC)](#8-vacinação-rf-vac--fase-b)
9. [Loja / PDV (RF-PDV)](#9-loja--pdv-rf-pdv--fase-c)
10. [Prontuário (RF-PR)](#10-prontuário-rf-pr--fase-ef)
11. [Laboratório (RF-LAB)](#11-laboratório-rf-lab--fase-g)
12. [Templates de consulta (RF-TPL)](#12-templates-de-consulta-rf-tpl--fase-h)
13. [IA clínica (RF-IA)](#13-ia-clínica-rf-ia--fase-i)
14. [WhatsApp (RF-W)](#14-whatsapp-rf-w--transversal)
15. [Multi-loja / tenant (RF-M)](#15-multi-loja--tenant-rf-m--fase-p)
16. [Arquitetura / Bounded Contexts (RF-ARQ)](#16-arquitetura--bounded-contexts-rf-arq--transversal)

---

## 0. Super Admin (RF-SA) · Fase P

Painel de plataforma (você). Cadastro e gestão de lojas. Sem billing/self-serve no início.

| ID | Requisito |
| --- | --- |
| RF-SA01 | Autenticação de usuário `super_admin` (separado do operador da loja) |
| RF-SA02 | Listar lojas com nome, slug, status e data |
| RF-SA03 | Cadastrar loja (nome, slug, status, branding mínimo, contato/WhatsApp) |
| RF-SA04 | Editar dados e branding da loja |
| RF-SA05 | Ativar / suspender / colocar loja em rascunho |
| RF-SA06 | Criar o primeiro `loja_admin` vinculado à loja |
| RF-SA07 | Acessar tela de Feature Entitlements da loja |
| RF-SA08 | Loja suspensa não acessa o painel operacional |

---

## 0b. Feature Entitlements (RF-FE) · Fase P

Conforme cada funcionalidade da ZooRações (ou outra loja) for configurada/liberada, o Super Admin liga a feature key correspondente.

| ID | Requisito |
| --- | --- |
| RF-FE01 | Manter catálogo global de feature keys (ex.: `vacinacao`, `pdv`, `prontuario`) |
| RF-FE02 | Por loja, ligar/desligar cada feature (`enabled` true/false) |
| RF-FE03 | Painel da loja só exibe menus/módulos com entitlement ON |
| RF-FE04 | API/rotas do módulo bloqueiam acesso se entitlement OFF (não só esconder UI) |
| RF-FE05 | Validar dependências (ex.: `imunizacao` exige `cadastro`; `financeiro` exige `vendas`) |
| RF-FE06 | Jobs/eventos de um módulo só rodam se a feature estiver ON na loja |
| RF-FE07 | Ao criar loja, aplicar entitlements iniciais (seed configurável) |
| RF-FE08 | Registrar no catálogo nova feature key quando um módulo novo for introduzido |
| RF-FE09 | Suportar **capabilities** granulares por feature (`feature.acao`), ligáveis por loja |
| RF-FE10 | Autorização combina entitlement da loja **e** papel do usuário (ambos devem permitir) |
| RF-FE11 | Bounded Contexts não consultam entitlements; a verificação ocorre em camada anterior ao domínio |

Catálogo: `06 - Multi-loja (Futuro)/04 - Catalogo de Features.md` · Arquitetura: `10 - Arquitetura/`

---

## 1. Vitrine (RF-V) · Fase J

| ID | Requisito |
| --- | --- |
| RF-V01 | Exibir marca, horários, localização e lista de serviços |
| RF-V02 | Exibir CTAs para catálogo, pedido, agendamento e WhatsApp |
| RF-V03 | Site responsivo (mobile primeiro) |

---

## 2. Catálogo (RF-C) · Fase J / C

| ID | Requisito |
| --- | --- |
| RF-C01 | Listar produtos com nome, preço e disponibilidade |
| RF-C02 | Exibir detalhe do produto |
| RF-C03 | Permitir filtrar/buscar produtos (mínimo: busca por nome) |
| RF-C04 | Ocultar ou marcar indisponível produto pausado pelo dono |

---

## 3. Pedido local (RF-P) · Fase J

E-commerce **somente na cidade** (retirada ou entrega local). Fora da cidade = fora de escopo.

| ID | Requisito |
| --- | --- |
| RF-P01 | Adicionar/remover itens no carrinho |
| RF-P02 | Checkout com dados do cliente (nome + telefone/WhatsApp) |
| RF-P03 | Escolher modalidade: retirada ou entrega na cidade |
| RF-P04 | Validar restrição geográfica (cidade); bloquear fora da área |
| RF-P05 | Criar pedido com status inicial `novo` |
| RF-P06 | Cliente recebe confirmação clara (tela + caminho WhatsApp) |
| RF-P07 | Dono visualiza e atualiza status do pedido no painel |

---

## 4. Painel do operador (RF-A) · Fase A+

| ID | Requisito |
| --- | --- |
| RF-A01 | Autenticação do operador |
| RF-A02 | Listar pedidos com filtro por status/data |
| RF-A03 | Criar/editar/pausar produtos |
| RF-A04 | Ajustar disponibilidade / estoque mínimo |
| RF-A05 | Ver agenda do dia e alterar status de agendamentos |
| RF-A06 | Acessar módulo de clientes, pets e lembretes (ver RF-CL / RF-L / RF-VAC) |
| RF-A07 | Ver fila de lembretes do dia / 7 dias / vencidos na rotina do painel |

---

## 5. Agendamento (RF-S) · Fase D

| ID | Requisito |
| --- | --- |
| RF-S01 | Cliente solicita serviço + horário + pet |
| RF-S02 | Sistema registra agendamento com status `solicitado` |
| RF-S03 | Dono confirma, remarca ou cancela no painel |
| RF-S04 | Agendamento usa Pet/Cliente do cadastro (cria via upsert se necessário) |
| RF-S05 | Caminho WhatsApp para lembrete/confirmação de agenda |

---

## 6. Clientes e animais (RF-CL) · Fase A

**Núcleo do sistema.** Um tutor pode ter vários animais. Cliente associado a `loja_id` + `usuario_id` (operador responsável).

| ID | Requisito |
| --- | --- |
| RF-CL01 | Operador cria/edita Cliente com `loja_id` e `usuario_id` (responsável) |
| RF-CL02 | Telefone/WhatsApp obrigatório; único por loja |
| RF-CL03 | Operador cria/edita Pet ligado a um Cliente (1 cliente : N pets) |
| RF-CL04 | Buscar cliente por nome, telefone ou CPF/CNPJ (quando informado) |
| RF-CL05 | Ficha do cliente: dados, pets, atalhos (compras, vacinas, financeiro) |
| RF-CL06 | Ficha do pet: dados, carteira vacinal, prontuário, exames |
| RF-CL07 | Soft-desativar cliente/pet sem apagar histórico |
| RF-CL08 | Pedido/agenda/PDV com telefone novo cria Cliente; existente reutiliza (upsert) |
| RF-CL09 | Filtrar “meus clientes” por `usuario_id` do operador |
| RF-CL10 | Tutor: nome, CPF/CNPJ (**não obrigatório**), telefone, WhatsApp, e-mail, endereço, nascimento, observações |
| RF-CL11 | Pet: nome, espécie, raça, sexo, nascimento, peso, cor, microchip, nº identificação, foto |
| RF-CL12 | Pet: alergias, características, comportamento, observações |
| RF-CL13 | Exibir histórico de compras do tutor (derivado de PDV/pedidos) |
| RF-CL14 | Exibir histórico financeiro do tutor (vendas/pagamentos/pendências) |

---

## 7. Cuidados e lembretes (RF-L) · Fase A/B

Base genérica de retornos. Vacinação tem módulo próprio na UX (RF-VAC).

| ID | Requisito |
| --- | --- |
| RF-L01 | Catálogo de TipoCuidado configurável por loja |
| RF-L02 | Registrar cuidado no pet (tipo, data, obs.; intervalo sugerido) |
| RF-L03 | Gerar Lembrete com `data_prevista` editável |
| RF-L04 | Criar lembrete manual na ficha do pet |
| RF-L05 | Status: `pendente`, `vencido`, `avisado`, `concluido`, `dispensado` |
| RF-L06 | Fila: hoje, próximos 7 dias, vencidos |
| RF-L07 | Ações: avisar WhatsApp, registrar cuidado, adiar, dispensar |
| RF-L08 | Concluir cuidado → fecha lembrete e pode criar o próximo |
| RF-L09 | Auto `vencido` quando data passar |

---

## 8. Vacinação (RF-VAC) · Fase B

| ID | Requisito |
| --- | --- |
| RF-VAC01 | Carteira digital de vacinação por pet (vacina, data, próxima dose) |
| RF-VAC02 | Registrar vacina: tipo, fabricante, lote, data, veterinário, próxima dose, obs. |
| RF-VAC03 | Catálogo de tipos de vacina por loja |
| RF-VAC04 | Histórico completo de aplicações do pet |
| RF-VAC05 | Listar pets com dose vencendo dentro da **janela de alerta do protocolo** daquela vacina |
| RF-VAC06 | Fila de alertas de vacinação no painel |
| RF-VAC07 | Disparar / abrir WhatsApp ao tutor com contexto da vacina |
| RF-VAC08 | Ao aplicar dose, atualizar carteira e calcular/editar próxima dose |
| RF-VAC09 | Configurar protocolo por tipo de vacina: intervalo de reforço (ex.: 6 ou 12 meses) e nº de doses da série inicial |
| RF-VAC10 | Configurar janela de alerta por tipo de vacina (ex.: 30 dias; menor para intervalos curtos) |
| RF-VAC11 | Próxima dose sugerida pelo protocolo, sempre editável pelo veterinário responsável |

---

## 9. Loja / PDV (RF-PDV) · Fase C

| ID | Requisito |
| --- | --- |
| RF-PDV01 | Cadastro de produtos por categoria (ração, medicamentos, brinquedos, petiscos, acessórios, higiene, produtos veterinários, etc.) |
| RF-PDV02 | Abrir venda vinculada a Cliente (opcional consumidor final avulso) |
| RF-PDV03 | Itens de venda com quantidade, preço e total |
| RF-PDV04 | Pagamentos: dinheiro, PIX, débito, crédito |
| RF-PDV05 | Múltiplos pagamentos na mesma venda |
| RF-PDV06 | Parcelamento (crédito) |
| RF-PDV07 | **Baixa automática de estoque** ao confirmar venda |
| RF-PDV08 | Impedir venda sem estoque suficiente (ou permitir quebra com permissão) |
| RF-PDV09 | Histórico de vendas na ficha do cliente |
| RF-PDV10 | Numeração de venda (#) e comprovante simples |
| RF-PDV11 | Evento WhatsApp opcional “compra registrada” |

---

## 10. Prontuário (RF-PR) · Fase E/F

| ID | Requisito |
| --- | --- |
| RF-PR01 | Abrir consulta/atendimento clínico ligado a pet + veterinário responsável |
| RF-PR02 | Registrar anamnese, sintomas, diagnósticos, evolução |
| RF-PR03 | Registrar vitais: peso, temperatura, FC, FR + observações |
| RF-PR04 | Histórico clínico cronológico do pet |
| RF-PR05 | Prescrição: medicamento, dosagem, frequência, duração, via, obs. |
| RF-PR06 | Solicitar exame a partir do prontuário |
| RF-PR07 | Anexar resultado (PDF/imagem) com data e vet responsável |
| RF-PR08 | Documentos: receitas, atestados, laudos, termos, arquivos |
| RF-PR09 | Auditoria: quem criou/editou registro clínico |
| RF-PR10 | Controle de permissão: clínico vs atendente |
| RF-PR11 | Evolução de peso ao longo do tempo (série) |
| RF-PR12 | Enviar documento/receita ao tutor via WhatsApp (evento) |

---

## 11. Laboratório (RF-LAB) · Fase G

| ID | Requisito |
| --- | --- |
| RF-LAB01 | Catálogo de exames e pacotes |
| RF-LAB02 | Solicitação de exame (vet → lab) |
| RF-LAB03 | Fluxo: coleta → processamento → resultado |
| RF-LAB04 | Status do exame ao longo do fluxo |
| RF-LAB05 | Resultado com valores de referência |
| RF-LAB06 | Laudo em PDF + assinatura/responsável |
| RF-LAB07 | Histórico de exames por pet |
| RF-LAB08 | Integração com prontuário (resultado vinculado) |
| RF-LAB09 | Envio automático/assistido do resultado ao tutor |
| RF-LAB10 | Cancelamento de solicitação com motivo |

---

## 12. Templates de consulta (RF-TPL) · Fase H

| ID | Requisito |
| --- | --- |
| RF-TPL01 | CRUD de templates de consulta por loja/veterinário |
| RF-TPL02 | Campos configuráveis no template |
| RF-TPL03 | Iniciar consulta a partir de template (ex.: dermatológica, cardiológica, felina) |
| RF-TPL04 | Salvar preenchimento no prontuário |
| RF-TPL05 | Duplicar/adaptar template |
| RF-TPL06 | Templates ativos/inativos |

---

## 13. IA clínica (RF-IA) · Fase I

| ID | Requisito |
| --- | --- |
| RF-IA01 | Aceitar texto livre (ou ditado) do veterinário |
| RF-IA02 | Gerar estrutura anamnese/SOAP/resumo revisável |
| RF-IA03 | Veterinário edita antes de gravar no prontuário |
| RF-IA04 | Não gravar diagnóstico/prescrição automática sem confirmação humana |
| RF-IA05 | Registrar que o texto foi assistido por IA (auditoria/transparência) |

---

## 14. WhatsApp (RF-W) · transversal

Canal de comunicação. Sistema guarda estado; WhatsApp comunica. Modo assistido até habilitar automático.

| ID | Requisito | Fase |
| --- | --- | --- |
| RF-W01 | CTA wa.me / deep link com texto pré-preenchido a partir de produto | J |
| RF-W02 | CTA a partir de pedido (número do pedido + resumo) | J |
| RF-W03 | Ação no painel para o dono abrir/enviar aviso ao cliente com contexto | A+ |
| RF-W04 | Documentar gatilhos; automação API é extensão, não bloqueante | A+ |
| RF-W05 | Mensagem a partir de lembrete/cuidado | A/B |
| RF-W06 | Ação “Avisar tutor” marca lembrete/alerta como avisado | A/B |
| RF-W07 | Evento `vacina.vencendo` (30 dias) | B |
| RF-W08 | Evento `consulta.lembrete` (ex.: amanhã 14h) | D |
| RF-W09 | Evento `banho.concluido` | D |
| RF-W10 | Evento `venda.registrada` / pagamento | C |
| RF-W11 | Evento `exame.resultado` / documento disponível | E/G |
| RF-W12 | Modo assistido obrigatório até config habilitar automático | B+ |
| RF-W13 | Catálogo de templates de mensagem por evento | B+ |

---

## 15. Multi-loja / tenant (RF-M) · Fase P

| ID | Requisito |
| --- | --- |
| RF-M01 | Modelo inclui `loja_id` desde a fundação em todas as entidades de negócio |
| RF-M02 | Toda query/operação do painel da loja filtra e valida `loja_id` do usuário |
| RF-M03 | Isolamento de clientes, pets, prontuário, estoque, vacinas e WhatsApp por loja |
| RF-M04 | Usuário da loja nunca acessa dados de outra loja |
| RF-M05 | ZooRações existe como loja cadastrada via Super Admin (primeira tenant) |

---

## 16. Arquitetura / Bounded Contexts (RF-ARQ) · transversal

Requisitos estruturais que valem para **toda** funcionalidade. Detalhe em `10 - Arquitetura/`.

| ID | Requisito |
| --- | --- |
| RF-ARQ01 | Cada funcionalidade pertence a **um** Bounded Context declarado (Estoque, Vendas, Financeiro, Agendamentos, Cadastro, Imunização, Prontuário, Laboratório, Comunicação, Vitrine, Pedidos Online, Tenancy, Identity, Entitlements) |
| RF-ARQ02 | Bounded Context é dono das suas regras e dados; não escreve direto na base de outro contexto |
| RF-ARQ03 | Integração entre contextos por eventos de domínio (fato passado) com `loja_id` |
| RF-ARQ04 | Consumidores de evento são idempotentes |
| RF-ARQ05 | Cada funcionalidade é associada a uma feature key e, quando granular, a uma capability |
| RF-ARQ06 | Guard de entitlement fica antes do domínio; contexto não conhece entitlements |
| RF-ARQ07 | Feature nova exige registro no catálogo de features/capabilities antes da entrega |

---

## Lista plana (todos os IDs)

```
RF-ARQ01 RF-ARQ02 RF-ARQ03 RF-ARQ04 RF-ARQ05 RF-ARQ06 RF-ARQ07
RF-SA01 RF-SA02 RF-SA03 RF-SA04 RF-SA05 RF-SA06 RF-SA07 RF-SA08
RF-FE01 RF-FE02 RF-FE03 RF-FE04 RF-FE05 RF-FE06 RF-FE07 RF-FE08 RF-FE09 RF-FE10 RF-FE11
RF-V01 RF-V02 RF-V03
RF-C01 RF-C02 RF-C03 RF-C04
RF-P01 RF-P02 RF-P03 RF-P04 RF-P05 RF-P06 RF-P07
RF-A01 RF-A02 RF-A03 RF-A04 RF-A05 RF-A06 RF-A07
RF-S01 RF-S02 RF-S03 RF-S04 RF-S05
RF-CL01 RF-CL02 RF-CL03 RF-CL04 RF-CL05 RF-CL06 RF-CL07 RF-CL08 RF-CL09 RF-CL10 RF-CL11 RF-CL12 RF-CL13 RF-CL14
RF-L01 RF-L02 RF-L03 RF-L04 RF-L05 RF-L06 RF-L07 RF-L08 RF-L09
RF-VAC01 RF-VAC02 RF-VAC03 RF-VAC04 RF-VAC05 RF-VAC06 RF-VAC07 RF-VAC08 RF-VAC09 RF-VAC10 RF-VAC11
RF-PDV01 RF-PDV02 RF-PDV03 RF-PDV04 RF-PDV05 RF-PDV06 RF-PDV07 RF-PDV08 RF-PDV09 RF-PDV10 RF-PDV11
RF-PR01 RF-PR02 RF-PR03 RF-PR04 RF-PR05 RF-PR06 RF-PR07 RF-PR08 RF-PR09 RF-PR10 RF-PR11 RF-PR12
RF-LAB01 RF-LAB02 RF-LAB03 RF-LAB04 RF-LAB05 RF-LAB06 RF-LAB07 RF-LAB08 RF-LAB09 RF-LAB10
RF-TPL01 RF-TPL02 RF-TPL03 RF-TPL04 RF-TPL05 RF-TPL06
RF-IA01 RF-IA02 RF-IA03 RF-IA04 RF-IA05
RF-W01 RF-W02 RF-W03 RF-W04 RF-W05 RF-W06 RF-W07 RF-W08 RF-W09 RF-W10 RF-W11 RF-W12 RF-W13
RF-M01 RF-M02 RF-M03 RF-M04 RF-M05
```

**Total: 148 requisitos funcionais.**
