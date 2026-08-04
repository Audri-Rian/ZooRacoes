# Spec SDD — Visão do Sistema Veterinário + Varejo

**Status:** visão de produto / backlog modular  
**Não é** autorização para implementar tudo de uma vez  
**Faseamento:** [[09 - Modulos do Sistema/09 - Faseamento do Produto]]

---

## 1. Contexto

A ZooRações (e futuras lojas/clínicas) precisam de um sistema onde **Tutor + Animal** são o núcleo, com vacinação, PDV/estoque, prontuário, laboratório, templates e IA clínica, e WhatsApp como canal de eventos.

---

## 2. Problema

Sistemas fragmentados (WhatsApp + planilha + caixa + papel de vacina + prontuário à parte) geram perda de retorno, erro de estoque e documentação clínica lenta.

---

## 3. Objetivos (produto completo)

1. Núcleo sólido Cliente/Animal
2. Carteira vacinal + alertas 30 dias + WhatsApp
3. PDV com baixa automática de estoque e pagamentos
4. Prontuário clínico completo (consultas, vitais, prescrição, docs)
5. Laboratório com fluxo e laudos
6. Templates de consulta + IA para estruturar texto
7. WhatsApp orientado a eventos em todo o sistema
8. Multi-loja como evolução

---

## 4. Não Objetivos (por enquanto / por fase)

Ver faseamento. Em especial **não** na fundação (A–C):

- IA clínica
- Lab completo
- Multi-loja self-serve
- Marketplace / frete nacional

---

## 5. Requisitos Funcionais

Canônico em [[03 - Escopo do Produto/03 - Requisitos Funcionais]]:

| Prefixo | Módulo |
| --- | --- |
| RF-CL | Núcleo clientes/animais |
| RF-VAC | Vacinação |
| RF-PDV | Loja / PDV |
| RF-PR | Prontuário |
| RF-LAB | Laboratório |
| RF-TPL | Templates |
| RF-IA | IA clínica |
| RF-W | WhatsApp eventos |
| RF-V/C/P/S/A | Site / catálogo / pedido / agenda / painel |

---

## 6. Riscos críticos

| Risco | Mitigação |
| --- | --- |
| Escopo infinito | Faseamento A→I obrigatório |
| Compliance clínico/LGPD | Papéis, auditoria, vet responsável |
| WhatsApp spam / política Meta | Templates + opt-in + assistido primeiro |
| PDV sem estoque | Baixa automática como critério de aceite |
| IA alucinando clínica | Sempre revisão humana antes de gravar |

---

## 7. Critério de sucesso da visão

A loja/clínica opera o dia (cadastro, vacina, venda, consulta) **num único sistema**, com tutor avisado no WhatsApp nos eventos certos.

---

## Referências

- [[09 - Modulos do Sistema/00 - Índice]]
- [[09 - Modulos do Sistema/09 - Faseamento do Produto]]
