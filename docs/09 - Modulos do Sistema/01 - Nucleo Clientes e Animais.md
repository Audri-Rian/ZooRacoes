# Núcleo — Cadastro de Clientes e Animais

**Bounded Context:** Cadastro (Tutores & Pets) · **Feature:** `cadastro`

**Este é o núcleo do sistema.** Quase todo contexto (Imunização, Vendas, Prontuário, Laboratório, Comunicação) referencia Tutor + Pet.

## Relacionamento

```mermaid
flowchart LR
  usuario[UsuarioOperador]
  tutor[TutorCliente]
  pet[AnimalPet]
  usuario -->|"responsavel / cadastrou"| tutor
  tutor -->|"1:N"| pet
```

Um cliente pode ter **vários** animais.

## Tutor / Cliente — campos

| Campo | Obrigatório MVP núcleo | Notas |
| --- | --- | --- |
| Nome | Sim | |
| CPF/CNPJ | Não | **Não obrigatório** (decidido); validar formato quando informado |
| Telefone | Sim | |
| WhatsApp | Sim | Pode igualar telefone |
| E-mail | Não | Recomendado |
| Endereço | Não | Útil p/ entrega local |
| Data de nascimento | Não | Tutor |
| Observações | Não | |
| Histórico de compras | Derivado | Vem do PDV / pedidos |
| Histórico financeiro | Derivado | Contas, pagamentos, débitos — módulo financeiro |
| Pets vinculados | Sim | Lista 1:N |

Associações: `loja_id`, `usuario_id` (responsável). Ver [[08 - Clientes Pets e Lembretes/01 - Modelo de Domínio|modelo anterior]].

## Animal / Pet — campos

| Campo | Obrigatório núcleo | Notas |
| --- | --- | --- |
| Nome | Sim | |
| Espécie | Sim | Cão, gato, etc. |
| Raça | Não | |
| Sexo | Não | |
| Data de nascimento | Não | Ou idade aproximada |
| Peso | Não | Atual; série histórica no prontuário |
| Cor | Não | |
| Microchip | Não | |
| Número de identificação | Não | Interno da loja / registro |
| Foto | Não | Upload |
| Alergias | Não | Texto / tags |
| Características | Não | |
| Comportamento | Não | |
| Observações | Não | |

## Telas núcleo

1. Lista de clientes (busca nome, CPF, telefone)
2. Ficha do tutor (dados + pets + atalhos: compras, vacinas, financeiro)
3. Ficha do animal (dados + atalhos: carteira vacinal, prontuário, exames)

## RF (núcleo expandido)

Ver [[03 - Escopo do Produto/03 - Requisitos Funcionais|RF-CL]] — IDs RF-CL10+.

## Relacionados

- [[02 - Vacinacao]]
- [[05 - Prontuario Veterinario]]
- [[09 - Faseamento do Produto]]
