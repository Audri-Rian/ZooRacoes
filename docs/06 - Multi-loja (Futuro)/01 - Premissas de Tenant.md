# Premissas de Tenant

## Ideia

O sistema nasce **multi-loja na plataforma** (Super Admin cadastra lojas), mas a operação inicial é **uma loja: ZooRações**.

```text
Super Admin → Loja (tenant) → Feature Entitlements → Painel da loja
loja_id → produtos, pedidos, agenda, clientes, vacinas, prontuário, WhatsApp, branding
```

## O que é isolado por loja

| Recurso | Isolado? |
| --- | --- |
| Branding (nome, logo, cores) | Sim |
| Feature Entitlements | Sim (por loja) |
| Catálogo e preços | Sim |
| Pedidos / PDV | Sim |
| Agenda / serviços | Sim |
| Clientes e pets | Sim; cliente associado a `usuario_id` da loja |
| Lembretes / vacinação / prontuário | Sim |
| Número WhatsApp | Sim |
| Regra de cidade / área de entrega | Sim |
| Horários | Sim |
| Usuários operadores | Sim (por loja) |

## O que é da plataforma (Super Admin)

- Cadastro de lojas
- Status da loja (ativa/suspensa)
- Catálogo global de features + entitlements por loja
- Usuários `super_admin`

## Implicações de modelagem

- Toda query de negócio filtra por `loja_id`
- Toda rota do painel da loja checa entitlement da feature
- Auth distingue `super_admin` vs usuários da loja

## Não confundir com marketplace

Multi-loja ≠ vários vendedores na mesma vitrine. Cada loja tem seu painel/vitrine.

## Relacionados

- [[03 - Super Admin e Feature Entitlements]]
- [[04 - Catalogo de Features]]
- [[02 - O que NÃO fazer no MVP]]
