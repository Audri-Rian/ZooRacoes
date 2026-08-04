# Regras de Implementação

Checklist obrigatório para **qualquer** funcionalidade nova. Substitui a ideia de “ordem rígida de fases”: a ordem é flexível, o encaixe arquitetural não.

## Definition of Ready (antes de codar)

- [ ] A funcionalidade pertence a **um** Bounded Context definido em [[01 - Bounded Contexts]]
- [ ] Está associada a uma **feature key** existente ou nova
- [ ] Tem **capability** nomeada (`feature.acao`) quando for operação granular
- [ ] Se for feature nova: registrada no [[06 - Multi-loja (Futuro)/04 - Catalogo de Features|catálogo]] com dependências
- [ ] Eventos publicados/consumidos declarados
- [ ] RF correspondente existe em [[../REQUISITOS-FUNCIONAIS|REQUISITOS-FUNCIONAIS.md]]

## Definition of Done (antes de considerar pronta)

- [ ] Dados com `loja_id`; queries filtram tenant
- [ ] Guard de entitlement na API/caso de uso (não só no menu)
- [ ] Menu/UI reage ao entitlement
- [ ] Job/evento respeita entitlement do tenant
- [ ] Contexto não consulta regra de outro contexto direto (usa evento/caso de uso)
- [ ] Entitlement ligado para a ZooRações no Super Admin quando liberar

## Ordem de trabalho

Não há ordem única obrigatória entre módulos. A restrição é:

| Restrição | Motivo |
| --- | --- |
| Plataforma (Tenancy + Identity + Entitlements) primeiro | Todo módulo depende do guard e do tenant |
| Cadastro (Tutores & Pets) antes de clínico/imunização | Tudo aponta para tutor/pet |
| Estoque antes (ou junto) de Vendas | Baixa automática exige saldo |
| Vendas antes de Financeiro consolidado | Pagamento nasce da venda |
| Prontuário antes de Laboratório/Templates/IA | São extensões do atendimento |

Fora dessas dependências, a ordem segue a dor da loja.

## Anexar implementação ao grupo (exemplo)

Nova funcionalidade: “inventário cíclico de ração”.

| Item | Definição |
| --- | --- |
| Bounded Context | Estoque |
| Feature | `estoque` |
| Capability | `estoque.inventario` |
| Eventos | consome `estoque.movimentacao`; publica `estoque.inventario_fechado` |
| Entitlement | ligar por loja; ZooRações ON quando validado |
| RF | novo RF-EST* no catálogo |

Sem esse preenchimento, a funcionalidade não entra.

## Relacionados

- [[02 - Capabilities e Entitlements]]
- [[03 - Integracao entre Contextos]]
