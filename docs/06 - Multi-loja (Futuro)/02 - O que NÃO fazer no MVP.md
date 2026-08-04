# O que NÃO fazer no MVP (plataforma)

## Não construir agora

- Cadastro **self-serve** de novas lojas (a loja se cadastra sozinha)
- Billing / assinatura / trial / gateway de pagamento da plataforma
- Impersonate avançado de suporte (opcional depois)
- Domínio custom automático / DNS
- Sharding / infra multi-região exótica
- Marketplace entre lojas
- Planos comerciais complexos (entitlements manuais bastam no início)

## Fazer agora (decidido)

- Painel **Super Admin** mínimo
- **Cadastro de loja** (tenant)
- **Feature Entitlements** por loja
- `loja_id` em todas as entidades de negócio
- Config/branding da loja
- ZooRações como primeira loja

Ver [[03 - Super Admin e Feature Entitlements]].

## Relacionados

- [[01 - Premissas de Tenant]]
- [[03 - Escopo do Produto/02 - Fora de Escopo|Fora de Escopo]]
