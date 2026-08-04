# Catálogo de Features e Capabilities

Lista canônica. Cada feature pertence a um **Bounded Context** ([[10 - Arquitetura/01 - Bounded Contexts|mapa]]) e agrupa capabilities granulares.

Ao implementar ou ativar algo: registrar aqui → ligar entitlement da loja no Super Admin.

| Feature key | Bounded Context | Depende de | Capabilities | RF |
| --- | --- | --- | --- | --- |
| `cadastro` | Cadastro (Tutores & Pets) | — | `cadastro.tutor_crud`, `cadastro.pet_crud` | RF-CL* |
| `lembretes` | Cadastro / Imunização | `cadastro` | `lembretes.fila`, `lembretes.manual` | RF-L* |
| `imunizacao` | Imunização | `cadastro` | `imunizacao.registrar_dose`, `imunizacao.carteira`, `imunizacao.alertas`, `imunizacao.protocolo_config` | RF-VAC* |
| `whatsapp` | Comunicação | — | `whatsapp.assistido`, `whatsapp.automatico`, `whatsapp.templates` | RF-W* |
| `estoque` | Estoque | — | `estoque.produtos_crud`, `estoque.movimentacao`, `estoque.ajuste_manual`, `estoque.inventario` | RF-PDV01, RF-PDV07–08 |
| `vendas` | Vendas | `estoque` | `vendas.registrar`, `vendas.cancelar`, `vendas.desconto` | RF-PDV02–06, RF-PDV09–11 |
| `financeiro` | Financeiro | `vendas` | `financeiro.pagamentos`, `financeiro.parcelamento`, `financeiro.recebiveis` | RF-PDV04–06, RF-CL14 |
| `vitrine` | Catálogo/Vitrine | — | `vitrine.publicar`, `vitrine.servicos` | RF-V*, RF-C* |
| `pedido_online` | Pedidos Online | `vitrine`, `estoque` | `pedido_online.checkout`, `pedido_online.entrega_local` | RF-P* |
| `agendamentos` | Agendamentos | `cadastro` | `agendamentos.criar`, `agendamentos.remarcar`, `agendamentos.servicos_config` | RF-S* |
| `prontuario` | Prontuário Clínico | `cadastro` | `prontuario.consulta`, `prontuario.prescricao`, `prontuario.documentos` | RF-PR* |
| `laboratorio` | Laboratório | `prontuario` | `laboratorio.solicitar`, `laboratorio.resultado`, `laboratorio.laudo_pdf` | RF-LAB* |
| `templates_consulta` | Prontuário Clínico | `prontuario` | `templates_consulta.crud`, `templates_consulta.usar` | RF-TPL* |
| `ia_clinica` | Prontuário Clínico | `prontuario` | `ia_clinica.estruturar_texto` | RF-IA* |

## Dependências (validadas pelo Super Admin)

- `imunizacao`, `agendamentos`, `prontuario` exigem `cadastro`
- `vendas` exige `estoque`
- `financeiro` exige `vendas`
- `pedido_online` exige `vitrine` + `estoque`
- `laboratorio`, `templates_consulta`, `ia_clinica` exigem `prontuario`
- `whatsapp` pode ficar sozinho (CTAs), mas eventos de um módulo exigem o módulo ON

## ZooRações — estado inicial

| Feature | Inicial |
| --- | --- |
| `cadastro` | ON (primeiro a construir) |
| `whatsapp` | ON (transversal cedo) |
| Demais | OFF até o módulo estar pronto e validado |

## Relacionados

- [[03 - Super Admin e Feature Entitlements]]
- [[10 - Arquitetura/02 - Capabilities e Entitlements|Capabilities e Entitlements]]
- [[10 - Arquitetura/04 - Regras de Implementacao|Regras de Implementação]]
