# Módulo — IA Clínica

Acelerador de documentação clínica. Não substitui o veterinário.

## Caso de uso principal

Veterinário escreve (ou dita) texto livre:

> “Animal macho, 4 anos, apresenta vômitos há três dias...”

IA estrutura em seções (ex. SOAP / anamnese):

```text
ANAMNESE
Paciente apresenta vômitos há aproximadamente três dias.
...

AVALIAÇÃO
...

PLANO
...
```

## Funcionalidades

- Transformar texto livre → anamnese / SOAP / resumo estruturado
- Sugerir preenchimento a partir de template
- Veterinário **revisa e edita** antes de gravar no prontuário
- Histórico da versão gerada vs aprovada (auditoria)

## Não objetivos da IA

- Diagnóstico automático como verdade clínica
- Prescrição automática sem revisão
- Substituir exame físico / julgamento profissional

## RF

RF-IA01–IA05 em [[03 - Escopo do Produto/03 - Requisitos Funcionais|Requisitos Funcionais]].

## Fase

**I** — após templates (H) e prontuário (E). Depende de provedor de modelo + política de privacidade (dados clínicos).

## Relacionados

- [[07 - Templates de Consulta]]
- [[05 - Prontuario Veterinario]]
