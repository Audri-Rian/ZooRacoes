# Requisitos Não Funcionais

## Usabilidade

| ID | Requisito |
| --- | --- |
| RNF-U01 | Fluxo de pedido local completável em poucos minutos no celular |
| RNF-U02 | Painel do dono usável em celular (balcão / corrido) |
| RNF-U03 | Mensagens de erro claras (ex.: fora da cidade, produto indisponível) |

## Performance

| ID | Requisito |
| --- | --- |
| RNF-P01 | Catálogo e home com carregamento aceitável em rede móvel comum |
| RNF-P02 | Ações de status no painel com feedback imediato |

## Confiabilidade

| ID | Requisito |
| --- | --- |
| RNF-R01 | Pedido/agendamento não podem “sumir” após submit bem-sucedido |
| RNF-R02 | Status é a fonte da verdade (não o histórico do WhatsApp) |

## Segurança e privacidade

| ID | Requisito |
| --- | --- |
| RNF-S01 | Painel autenticado; sem exposição pública de dados de clientes |
| RNF-S02 | Dados de contato tratados com mínimo necessário |
| RNF-S03 | Links WhatsApp não devem vazar dados sensíveis além do contexto do pedido |

## Operação local

| ID | Requisito |
| --- | --- |
| RNF-L01 | Regra de cidade configurável (lista de CEPs / cidade / bairros — decisão na implementação) |
| RNF-L02 | Horário da loja respeitado na UX (avisos; bloqueio rígido de agenda opcional no MVP) |

## Observabilidade (mínima)

| ID | Requisito |
| --- | --- |
| RNF-O01 | Registrar criação de pedido/agenda/lembrete e mudanças de status (log/auditoria simples) |

## Cadastro e lembretes

| ID | Requisito |
| --- | --- |
| RNF-CL01 | Busca de cliente por nome/telefone usável no balcão |
| RNF-CL02 | Telefone único por loja |
| RNF-L01 | Fila de lembretes usável no mobile do dono |
| RNF-L02 | Dados de cliente/pet/cuidado só no painel autenticado |

## Acessibilidade (pragmática)

| ID | Requisito |
| --- | --- |
| RNF-A01 | Contraste legível e alvos de toque usáveis no mobile |

## Relacionados

- [[03 - Requisitos Funcionais]]
- [[02 - Fluxo de Pensamento/01 - Princípios de Decisão|Princípios de Decisão]]
