# Decisões e Perguntas Abertas — Visão Completa

## Decisões travadas (2026-08-01)

| Tema | Decisão |
| --- | --- |
| Arquitetura | **Bounded Contexts** isolados + contexto de **Feature Entitlements** |
| Ordem de implementação | Sem ordem rígida entre módulos; cada implementação **precisa** estar associada a um Bounded Context e a uma feature/capability |
| Entitlements | Camada de controle de acesso às capacidades; contextos não conhecem entitlements |
| Granularidade | Feature (módulo) + capabilities (`feature.acao`) |
| Veterinário | A loja tem **1 único veterinário** |
| CPF/CNPJ do tutor | **Não obrigatório** |
| Alerta de vacina | Depende do **protocolo de cada vacina** (ex.: reforço 6 ou 12 meses); janela de alerta configurável por tipo |
| Próxima dose | Sugerida pelo protocolo, sempre editável pelo veterinário |
| Plataforma | Super Admin + cadastro de loja + entitlements desde a fundação; sem billing/self-serve |

## Ainda em aberto

| # | Pergunta | Impacto |
| --- | --- | --- |
| 1 | Visibilidade de clientes: todos os usuários da loja veem todos os tutores, ou o padrão é “meus clientes” (por `usuario_id`)? | Permissão no contexto Cadastro. Com 1 vet + poucos operadores, o default provável é **todos veem todos** |
| 2 | NFC-e / cupom fiscal é necessário no contexto Vendas ou basta comprovante interno? | Escopo de Vendas/Financeiro |
| 3 | Venda avulsa sem tutor cadastrado é comum no balcão? | Regra em Vendas (default: permitida) |
| 4 | Laboratório é próprio ou terceirizado? | Fluxo do contexto Laboratório |
| 5 | Anexos (carteirinha, PDF, foto de exame) já na fundação? | Storage por loja (default: só quando Prontuário/Lab entrarem) |
| 6 | Stack técnica e hospedagem | Definição técnica, não de produto |

## Relacionados

- [[10 - Arquitetura/00 - Índice|Arquitetura]]
- [[09 - Faseamento do Produto]]
- [[01 - Nucleo Clientes e Animais]]
