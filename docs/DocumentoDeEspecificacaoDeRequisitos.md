# Documento de Especificação de Requisitos

## 1. Objetivo e escopo

Este documento consolida os 148 requisitos funcionais do catálogo canônico da ZooRações, preservando seus identificadores originais e incorporando somente as decisões aprovadas durante o refinamento.

O produto é uma plataforma multi-loja para operação veterinária e varejo pet. Cada funcionalidade pertence a um contexto de negócio, respeita o isolamento por loja e, quando aplicável, depende da combinação entre status da loja, entitlement, capability e papel do usuário.

Detalhes expressamente adiados permanecem identificados como decisões para o desenho posterior da respectiva feature. Eles não constituem regras já definidas.

---

## CONTEXTO: Administração da Plataforma e Super Admin

### [RF-SA01] Autenticação de Super Admin

**Descrição:**  
O sistema deve autenticar identidades por e-mail e senha e permitir que identidades com o papel ativo `super_admin` acessem o escopo Plataforma.

**Atores:** Super Admin; Super Admin raiz; usuário com vínculo em loja.

**Critérios de aceitação:**
- A identidade central pode acumular papel de plataforma e vínculos com lojas.
- Após autenticar-se, o usuário deve escolher explicitamente entre os escopos autorizados.
- O escopo Plataforma só deve aparecer para quem possuir papel `super_admin` ativo.
- Usuário autenticado apenas como usuário de loja não deve acessar funções da plataforma.
- A revogação do papel deve encerrar imediatamente o acesso e as sessões do escopo Plataforma, preservando vínculos válidos com lojas.

**Regras de negócio:**
- O e-mail deve ser único e verificado.
- A primeira conta raiz deve ser criada por bootstrap controlado.
- Somente a conta raiz pode conceder ou revogar o papel `super_admin`.
- Provisionamento, recuperação e transferência da conta raiz ocorrem por processo operacional externo auditado.
- Não haverá MFA nesta fase.
- Aplicam-se os controles comuns de tentativas, expiração e revogação de sessão.

**Auditoria:**
- Registrar sucessos e falhas de login, seleção do escopo Plataforma, logout, expiração ou revogação de sessão e mudanças de papel.
- Registros são consultáveis somente pela raiz e retidos por 12 meses.

**Riscos aceitos:**
- A ausência de MFA e o uso da mesma identidade em Plataforma e Loja ampliam o impacto de credenciais comprometidas.

### [RF-SA02] Listagem Global de Lojas

**Descrição:**  
Todo Super Admin ativo deve consultar a lista global de lojas.

**Critérios de aceitação:**
- Exibir nome, slug, status, criação e última alteração administrativa.
- Incluir, por padrão, lojas em `rascunho`, `ativa` e `suspensa`.
- Buscar parcialmente por nome ou slug, sem diferenciar caixa; no nome, ignorar acentuação.
- Filtrar por um ou mais status.
- Ordenar inicialmente pela alteração mais recente.
- Exibir 20 itens por padrão, com opções de 50 e 100.
- Apresentar datas e horas no fuso configurado da plataforma.
- Ao selecionar uma loja, abrir seus detalhes sem executar edição ou mudança de status diretamente na lista.

**Regras de negócio:**
- A última alteração administrativa muda com cadastro, branding, status, entitlements ou administração de usuários.
- Atividades operacionais comuns da loja não alteram essa data.

### [RF-SA03] Cadastro de Loja

**Descrição:**  
Somente a conta raiz deve cadastrar uma nova loja, sempre como `rascunho`.

**Dados obrigatórios:** nome fantasia e slug.

**Dados opcionais:** nome exibido, logo, cor primária, WhatsApp e e-mail.

**Critérios de aceitação:**
- Sugerir slug a partir do nome, permitindo edição antes de salvar.
- Exigir slug globalmente único, não reservado, composto por letras minúsculas sem acento, números e hífen, sem espaços, hífen nas extremidades ou hifens consecutivos.
- Em colisão, bloquear e sugerir alternativa, que exige confirmação.
- Nome exibido ausente deve usar o nome fantasia; branding ausente deve usar identidade visual neutra.
- Logo deve aceitar PNG, JPEG ou WebP de até 5 MB.
- Cor primária deve usar seletor visual e valor `#RRGGBB`.
- WhatsApp deve aceitar número internacional normalizado; e-mail deve ter formato válido.
- Cidade e horários ficam fora desta funcionalidade.

**Regras de negócio:**
- Criação da loja e aplicação do seed versionado de entitlements são uma única operação funcional; falha desfaz a criação.
- O primeiro `loja_admin` é criado separadamente.
- A operação deve ser auditada por 12 meses, com consulta exclusiva da raiz.

### [RF-SA04] Edição de Dados e Branding da Loja

**Descrição:**  
Somente a conta raiz deve editar nome, nome exibido, branding e contatos da loja.

**Critérios de aceitação:**
- O slug pode ser alterado somente antes da primeira ativação.
- Após a primeira ativação, permanece imutável em qualquer status posterior.
- Alterar o nome não altera automaticamente o slug; o sistema pode sugerir novo valor, que exige confirmação.
- O slug anterior de uma loja nunca ativada volta a ficar disponível após troca bem-sucedida.
- Campos opcionais podem ser removidos, aplicando os fallbacks definidos no cadastro.
- Alterações em loja ativa entram em vigor imediatamente após salvamento.
- Edição baseada em versão desatualizada deve ser bloqueada, sem sobrescrita silenciosa.

**Auditoria:**
- Registrar responsável, data, campos e valores anteriores e novos.
- Falha de auditoria impede a edição.
- Retenção de 12 meses e consulta exclusiva da raiz.

### [RF-SA05] Gerenciamento do Status da Loja

**Descrição:**  
Somente a conta raiz deve alterar o estado da loja entre `rascunho`, `ativa` e `suspensa`.

**Transições permitidas:**
- `rascunho → ativa`;
- `ativa → suspensa`;
- `ativa → rascunho`;
- `suspensa → ativa`;
- `suspensa → rascunho`.

**Critérios de aceitação:**
- Toda mudança exige confirmação; suspensão e retorno a rascunho também exigem motivo.
- Ativação ou reativação exige nome e slug válidos, ao menos um `loja_admin` ativo e seed aplicado.
- Loja em rascunho ou suspensa bloqueia painel, APIs operacionais, novas operações, jobs, integrações e canais públicos.
- Sessões operacionais devem ser revogadas; operações já iniciadas podem concluir.
- Reativação exige novo login; jobs retomam no próximo ciclo sem execução retroativa automática.
- A primeira ativação torna o slug permanentemente imutável.

**Auditoria e notificações:**
- Mudança e auditoria são indivisíveis; falha mantém o status anterior.
- Registrar responsável, estados anterior e novo, motivo, resultado e primeira ativação por 12 meses.
- Notificar por e-mail todos os `loja_admin` ativos.
- Falha de e-mail não desfaz a mudança; deve ser registrada e reenviada.

### [RF-SA06] Criação do Primeiro Administrador da Loja

**Descrição:**  
Somente a conta raiz deve vincular o primeiro `loja_admin` a uma loja.

**Critérios de aceitação:**
- Para identidade nova, exigir nome completo, e-mail e senha temporária.
- A senha temporária é definida pela raiz, expira em 72 horas ou no primeiro uso e deve ser trocada antes do acesso.
- A raiz compartilha a senha por canal externo seguro; o sistema não a envia nem volta a exibi-la.
- A identidade nova deve verificar o e-mail e trocar a senha antes de o vínculo ficar ativo.
- Enquanto pendente, o vínculo não satisfaz o pré-requisito de ativação da loja.
- Se o e-mail já pertencer a identidade verificada, reutilizá-la sem alterar a senha.
- Para identidade existente, criar o vínculo imediatamente, sem aceite ou notificação.
- O vínculo vale somente para a loja selecionada.

**Regras de negócio:**
- Senha temporária nunca substitui credencial de identidade existente.
- Senha expirada exige nova emissão.
- Esta funcionalidade trata somente o primeiro administrador; gestão posterior de usuários fica para feature própria.
- A operação deve ser auditada por 12 meses, com consulta exclusiva da raiz.

### [RF-SA07] Acesso aos Feature Entitlements da Loja

**Descrição:**  
Os detalhes da loja devem oferecer acesso à área de Feature Entitlements do tenant selecionado.

**Permissões:**
- Todo Super Admin ativo pode visualizar.
- Somente a conta raiz pode alterar.
- Usuários de loja não podem acessar.

**Critérios de aceitação:**
- Carregar exclusivamente a configuração da loja selecionada.
- Manter os controles em somente leitura para Super Admin não raiz.
- Bloquear no backend tentativas diretas sem permissão.
- Regras de catálogo, dependências e capabilities pertencem aos requisitos RF-FE.

### [RF-SA08] Bloqueio Operacional de Loja Suspensa

**Descrição:**  
O sistema deve impedir que usuários de uma loja suspensa acessem o painel ou executem operações do tenant.

**Critérios de aceitação:**
- Revogar sessões operacionais e bloquear novos logins, rotas e APIs.
- Não depender apenas da ocultação da interface.
- Informar indisponibilidade temporária e orientar contato com o administrador, sem expor o motivo.
- Não remover dados, identidades ou vínculos.
- Se a identidade possuir outra loja ativa, bloquear somente o escopo suspenso.
- Super Admin mantém acesso administrativo.

---

## CONTEXTO: Entitlements e Capabilities

### [RF-FE01] Catálogo Global de Features

**Descrição:**  
O sistema deve manter catálogo global de features e capabilities versionado junto ao produto.

**Regras de negócio:**
- Features usam `snake_case`; capabilities usam `feature.acao`.
- A nomenclatura canônica é a arquitetural granular: `cadastro`, `imunizacao`, `estoque`, `vendas`, `financeiro`, `agendamentos` e demais chaves do catálogo.
- Chaves antigas como `nucleo_clientes_pets`, `vacinacao`, `pdv` e `agenda` não são canônicas.
- Cada item deve declarar chave, descrição, contexto, defaults e dependências aplicáveis.
- Chaves publicadas são estáveis e não podem ser reutilizadas com outro significado.
- O painel não permite criação ou edição livre do catálogo.

### [RF-FE02] Configuração de Entitlements por Loja

**Descrição:**  
O sistema deve permitir ligar ou desligar features e capabilities por loja.

**Permissões:** todo Super Admin visualiza; somente a raiz altera.

**Critérios de aceitação:**
- Validar loja, chave, depreciação e dependências.
- Desligar uma feature preserva a configuração de suas capabilities.
- Religá-la restaura a configuração anterior.
- Aplicar mudanças imediatamente a novas validações.
- Atualizar a data administrativa da loja.
- Bloquear conflitos de edição.
- Auditar valores anterior e novo por 12 meses.

### [RF-FE03] Visibilidade Condicionada no Painel

**Descrição:**  
O painel da loja deve mostrar somente módulos e ações permitidos pelos entitlements.

**Critérios de aceitação:**
- Feature desligada oculta seu módulo e menu.
- Capability desligada oculta ou desabilita a ação correspondente.
- Configurações preservadas de módulo desligado não devem ser exibidas ao operador.
- A ocultação não substitui o bloqueio do backend.

### [RF-FE04] Bloqueio de Rotas e APIs

**Descrição:**  
Rotas e APIs devem negar operações cuja feature ou capability esteja desligada.

**Critérios de aceitação:**
- Chamadas diretas devem ser bloqueadas.
- A decisão deve considerar tenant, feature, capability e papel.
- A resposta não deve expor dados do módulo bloqueado.
- Autorização de uma loja nunca pode ser reutilizada em outra.

### [RF-FE05] Dependências entre Features e Capabilities

**Descrição:**  
O sistema deve validar dependências entre features e entre capabilities.

**Regras de negócio:**
- Bloquear ativação quando uma dependência estiver desligada.
- Bloquear desativação enquanto houver dependentes ativos.
- Listar todos os itens que impedem a ação.
- Não ativar ou desativar automaticamente em cascata.
- Dependências inválidas ou cíclicas impedem a disponibilização do catálogo.

### [RF-FE06] Aplicação em Jobs, Eventos e Integrações

**Descrição:**  
Jobs, consumidores e integrações só devem produzir efeitos para tenants com os entitlements necessários.

**Critérios de aceitação:**
- Não iniciar novos processamentos quando a feature ou capability estiver desligada.
- Execuções já iniciadas podem concluir.
- Ao religar, retomar no próximo ciclo.
- Não processar retroativamente o período desligado.
- Eventos de origem podem permanecer registrados sem criar efeito no módulo desligado.

### [RF-FE07] Seed Inicial de Entitlements

**Descrição:**  
Novas lojas devem receber um perfil inicial versionado de features e capabilities.

**Regras de negócio:**
- Cada estado inicial deve ser explícito.
- Defaults de capabilities são declarados no catálogo.
- A aplicação integra atomicamente o cadastro de loja.
- Falha no seed impede a criação.
- Atualizar o perfil não altera automaticamente lojas existentes.

### [RF-FE08] Introdução de Nova Feature

**Descrição:**  
Todo novo módulo deve ser registrado no catálogo antes de ser disponibilizado.

**Critérios de aceitação:**
- Declarar chave, contexto, defaults, capabilities e dependências.
- A nova feature nasce desligada em lojas existentes.
- Sua ativação exige ação explícita da raiz.
- Novas lojas usam a versão vigente do perfil inicial.

### [RF-FE09] Capabilities Granulares

**Descrição:**  
O sistema deve controlar operações específicas dentro de uma feature.

**Regras de negócio:**
- Capability ligada só autoriza quando a feature também estiver ligada.
- Feature desligada bloqueia todas as capabilities sem apagar suas configurações.
- Na primeira ativação, cada capability recebe seu default declarado.
- Ajustes são preservados em desligamentos e religações.
- Interface e backend devem respeitar a mesma decisão.

### [RF-FE10] Combinação com Papel do Usuário

**Descrição:**  
Uma operação só deve ser autorizada quando tenant e usuário permitirem.

**Regra de autorização:**  
Loja ativa + feature ligada + capability ligada, quando aplicável + papel ou permissão do usuário.

**Regras de negócio:**
- Entitlement não concede papel.
- Papel não contorna entitlement.
- A identidade deve estar vinculada à mesma loja.
- Falha em qualquer condição nega a ação.

### [RF-FE11] Guard Anterior ao Domínio

**Descrição:**  
A verificação de entitlement deve ocorrer antes da execução do caso de uso do Bounded Context.

**Critérios de aceitação:**
- O domínio recebe somente operações já autorizadas quanto a entitlement.
- Bounded Contexts não consultam configuração comercial.
- O guard deve conhecer tenant, feature e capability exigida.
- Jobs e consumidores aplicam proteção equivalente.
- As regras internas do domínio e a autorização por papel continuam obrigatórias.

**Regras comuns do contexto:**
- Features descontinuadas não são apagadas: ficam históricas e não aceitam novas ativações.
- Alterações podem ser configuradas em lojas em rascunho ou suspensas.
- Auditoria de alterações é consultável pela raiz e retida por 12 meses.
- Notificações de mudanças de entitlement não fazem parte deste escopo.

---

## CONTEXTO: Vitrine Pública

### [RF-V01] Exibição Institucional da Loja

**Descrição:**  
A vitrine pública deve apresentar marca, horários, localização e serviços da loja ativa identificada pelo slug.

**Critérios de aceitação:**
- Usar URL inicial `/lojas/{slug}` e acesso sem autenticação.
- Exibir nome, logo, cor primária, horários e endereço.
- Exibir endereço textual com link para aplicativo de mapas.
- Cada serviço exibe nome e descrição; duração e preço são opcionais.
- Dados opcionais ausentes ocultam somente sua seção.
- Loja inexistente, em rascunho, suspensa ou sem feature `vitrine` não expõe conteúdo.

### [RF-V02] CTAs da Vitrine

**Descrição:**  
A vitrine deve oferecer caminhos para catálogo, pedido, agendamento e WhatsApp.

**Critérios de aceitação:**
- Mostrar cada CTA somente quando a feature e a configuração correspondentes estiverem disponíveis.
- `pedido_online` controla pedido; `agendamentos` controla agenda; `whatsapp` controla contato.
- Catálogo público integra a experiência de `vitrine`.
- Todo destino deve preservar o tenant.
- Ocultação não substitui guard do backend.

### [RF-V03] Experiência Responsiva

**Descrição:**  
A vitrine e o catálogo devem ser mobile primeiro e adaptar-se a telas maiores.

**Critérios de aceitação:**
- Manter conteúdo legível sem rolagem horizontal.
- Busca, filtros, CTAs e carregamento adicional devem funcionar por toque.
- Imagens devem adaptar-se sem deformação.
- Ações essenciais não podem depender somente de mouse.
- Funcionalidade equivalente em mobile, tablet e desktop.

---

## CONTEXTO: Catálogo Público

### [RF-C01] Listagem Pública de Produtos

**Descrição:**  
O catálogo deve listar produtos da loja com nome, preço e disponibilidade.

**Critérios de aceitação:**
- Exibir nome, imagem ou placeholder, preço e disponibilidade.
- Ordenar alfabeticamente.
- Carregar inicialmente 20 itens e oferecer “carregar mais” em blocos de até 20.
- Produto pausado é indisponível.
- Com estoque habilitado, quantidade insuficiente também torna o produto indisponível.
- Sem estoque habilitado, usar disponibilidade manual.
- Produto indisponível permanece visível, sem ação de compra.

### [RF-C02] Detalhe do Produto

**Descrição:**  
O usuário deve consultar nome, imagens, descrição, categoria, preço e disponibilidade do produto.

**Critérios de aceitação:**
- Produto indisponível pode ser consultado, mas não comprado.
- Ausência de imagem usa placeholder neutro.
- Produto inexistente, removido ou de outra loja não deve ser exposto.
- Ações de pedido e WhatsApp dependem dos respectivos entitlements.

### [RF-C03] Busca e Filtro de Produtos

**Descrição:**  
O catálogo deve permitir busca parcial por nome e filtro por categoria.

**Critérios de aceitação:**
- Busca ignora caixa e acentuação.
- Busca e categoria funcionam em conjunto.
- Alterar critérios reinicia no primeiro bloco.
- “Carregar mais” preserva os critérios.
- Nenhum resultado deve apresentar estado vazio com opção de limpar filtros.

### [RF-C04] Apresentação de Produto Indisponível

**Descrição:**  
Produto pausado ou sem disponibilidade deve permanecer consultável, sem possibilidade de compra.

**Regras de negócio:**
- Indicar indisponibilidade na lista e no detalhe.
- Bloquear inclusão direta em carrinho também pela API.
- Pausa manual prevalece sobre existência de estoque.
- Estoque insuficiente prevalece sobre estado manual disponível quando o controle estiver habilitado.
- Nova validação no pedido trata produto que se tornou indisponível após entrar no carrinho.

---

## CONTEXTO: Pedidos Online Locais

### [RF-P01] Carrinho de Compras

**Descrição:**  
O cliente deve adicionar, remover e alterar quantidades de produtos no carrinho da loja atual.

**Critérios de aceitação:**
- Exibir itens, quantidades e valores.
- Não misturar produtos de lojas diferentes.
- Permitir revisão antes do checkout.
- Revalidar itens antes da criação do pedido.

### [RF-P02] Identificação no Checkout

**Descrição:**  
O checkout deve coletar nome e telefone/WhatsApp do cliente.

**Critérios de aceitação:**
- Não concluir com dados obrigatórios ausentes ou inválidos.
- Associar os dados ao pedido.
- Manter o pedido restrito à loja atual.

### [RF-P03] Modalidade de Atendimento

**Descrição:**  
O cliente deve escolher retirada na loja ou entrega local.

**Critérios de aceitação:**
- Exibir somente modalidades disponibilizadas pela loja.
- Registrar a modalidade escolhida.
- Solicitar os dados necessários à modalidade.
- Permitir revisão antes da confirmação.

### [RF-P04] Restrição Geográfica

**Descrição:**  
Pedidos com entrega devem ser aceitos somente dentro da cidade atendida pela loja.

**Regras de negócio:**
- Área atendida é configurada por loja.
- Retirada não depende da cidade do cliente.
- Entrega fora da área deve ser bloqueada antes da criação.
- Informar claramente a indisponibilidade.

### [RF-P05] Criação do Pedido

**Descrição:**  
Checkout válido deve criar pedido com status inicial `novo`.

**Critérios de aceitação:**
- Gerar identificador e registrar loja, cliente, itens, valores e modalidade.
- Criar somente após validar os dados obrigatórios.
- Impedir duplicidade por repetição acidental da confirmação.
- Não confirmar pedido não persistido.

### [RF-P06] Confirmação ao Cliente

**Descrição:**  
Após criação bem-sucedida, exibir confirmação em tela e caminho para WhatsApp.

**Critérios de aceitação:**
- Exibir identificador e resumo do pedido.
- Informar que a loja recebeu o pedido.
- Mostrar WhatsApp somente com configuração e entitlement válidos.
- Em falha, informar que o pedido não foi concluído.

### [RF-P07] Gestão do Pedido no Painel

**Descrição:**  
Usuários autorizados devem visualizar pedidos da loja e atualizar seus status.

**Critérios de aceitação:**
- Exibir dados do cliente, itens, valores, modalidade e status.
- Permitir localizar e abrir o pedido.
- Permitir somente mudanças autorizadas.
- Registrar responsável e momento da alteração.

**Decisões adiadas para a feature de pedidos:**
- conta ou checkout convidado;
- mecanismo exato de validação de endereço;
- pagamento;
- estados posteriores a `novo`;
- reserva e baixa de estoque;
- cancelamento ou alteração pelo cliente.

---

## CONTEXTO: Painel do Operador

### [RF-A01] Autenticação do Operador

**Descrição:**  
O sistema deve autenticar usuários de loja e permitir somente tenants, papéis e módulos autorizados.

**Critérios de aceitação:**
- Identificar identidade central e vínculos ativos.
- Permitir seleção somente de lojas autorizadas.
- Bloquear loja em rascunho ou suspensa.
- Restringir dados ao tenant selecionado.
- Revogar acesso quando vínculo, papel, status ou sessão deixar de ser válido.

### [RF-A02] Consulta de Pedidos

**Descrição:**  
O painel deve listar pedidos da loja com filtros por status e período.

**Critérios de aceitação:**
- Exibir identificação, cliente, data, modalidade, valor e status.
- Permitir combinar status e intervalo de datas.
- Permitir abrir o detalhe.
- Exibir estado vazio sem correspondências.

### [RF-A03] Gestão de Produtos

**Descrição:**  
Usuários autorizados devem criar, editar e pausar produtos da loja.

**Critérios de aceitação:**
- Restringir produtos ao tenant.
- Pausar sem apagar histórico.
- Produto pausado segue RF-C04.
- Registrar responsável e momento.
- Exigir feature e capability correspondentes.

### [RF-A04] Disponibilidade e Estoque Mínimo

**Descrição:**  
Usuários autorizados devem ajustar disponibilidade e estoque mínimo por produto.

**Critérios de aceitação:**
- Permitir disponibilidade manual quando aplicável.
- Refletir indisponibilidade no catálogo.
- Não alterar produto de outra loja.
- Movimentações e baixas pertencem ao contexto Estoque.

### [RF-A05] Agenda do Dia

**Descrição:**  
O painel deve exibir agendamentos do dia e permitir atualização autorizada de status.

**Critérios de aceitação:**
- Exibir horário, serviço, cliente, pet e status.
- Restringir à loja atual.
- Registrar responsável e momento.
- Exigir entitlement e papel.

### [RF-A06] Acesso a Clientes, Pets e Cuidados

**Descrição:**  
O painel deve integrar acesso a clientes, pets, lembretes e vacinação.

**Critérios de aceitação:**
- Exibir somente módulos habilitados e permitidos pelo papel.
- Preservar tenant na navegação.
- Usar os comportamentos dos contextos Cadastro, Cuidados e Imunização.

### [RF-A07] Fila de Lembretes

**Descrição:**  
O painel deve organizar lembretes em hoje, próximos sete dias e vencidos.

**Critérios de aceitação:**
- Restringir à loja atual.
- Permitir abrir cliente, pet e lembrete.
- Refletir mudanças de estado feitas na feature de lembretes.

**Decisões adiadas às features específicas:**
- campos completos de produtos;
- permissões detalhadas por papel;
- estados de pedidos e agendamentos;
- regras de movimentação de estoque;
- ações específicas sobre lembretes.

---

## CONTEXTO: Agendamentos

### [RF-S01] Solicitação de Agendamento

**Descrição:**  
O cliente deve solicitar serviço, horário e pet para uma loja.

**Critérios de aceitação:**
- Exibir serviços e opções disponibilizados pela loja.
- Coletar dados necessários de cliente e pet.
- Registrar serviço e horário solicitados.
- Impedir envio com dados obrigatórios ausentes.

### [RF-S02] Registro da Solicitação

**Descrição:**  
Solicitação válida deve criar agendamento com status `solicitado`.

**Critérios de aceitação:**
- Gerar identificador e vincular loja, cliente, pet, serviço e horário.
- Evitar duplicidade por repetição acidental.
- Confirmar somente após persistência.
- Disponibilizar no painel da loja.

### [RF-S03] Gestão pelo Painel

**Descrição:**  
Usuários autorizados devem confirmar, remarcar ou cancelar solicitações.

**Critérios de aceitação:**
- Restringir ao tenant.
- Registrar estado e dados alterados.
- Registrar responsável e momento.
- Preservar histórico relevante.

### [RF-S04] Integração com Cliente e Pet

**Descrição:**  
Todo agendamento deve usar Cliente e Pet do núcleo cadastral.

**Regras de negócio:**
- Reutilizar cliente existente.
- Criar ou atualizar pelo upsert de RF-CL08 quando necessário.
- Manter pet ligado ao cliente correto.
- Não duplicar cadastros identificados como existentes.

### [RF-S05] Comunicação por WhatsApp

**Descrição:**  
O agendamento deve oferecer confirmação e lembrete por WhatsApp.

**Critérios de aceitação:**
- Disponibilizar somente com `whatsapp` habilitada.
- Incluir contexto suficiente do agendamento.
- Respeitar modo assistido ou automático.
- Falha de comunicação não apaga nem duplica o agendamento.

**Decisões adiadas para a feature:**
- grade e cálculo de horários;
- duração e capacidade;
- conflitos;
- fluxo completo de status;
- antecedência de lembretes;
- políticas de remarcação e cancelamento.

---

## CONTEXTO: Cadastro de Clientes e Animais

### [RF-CL01] Cadastro de Cliente

**Descrição:**  
Usuários autorizados devem criar e editar clientes com `loja_id` e `usuario_id` responsável.

**Critérios de aceitação:**
- Impedir vínculo com outra loja.
- Validar dados obrigatórios.
- Preservar ou registrar alteração do responsável.
- Exigir feature e permissão.

### [RF-CL02] Contato Principal do Cliente

**Descrição:**  
Todo cliente deve possuir um número principal obrigatório, marcado quando também for WhatsApp.

**Regras de negócio:**
- O número deve ser único dentro da mesma loja.
- Pode existir em lojas diferentes.
- Deve ser validado e normalizado.
- Duplicidade deve direcionar ao cadastro existente.

### [RF-CL03] Cadastro de Pet

**Descrição:**  
Usuários autorizados devem criar e editar pets vinculados a um cliente.

**Regras de negócio:**
- Um cliente pode possuir vários pets.
- Pet e cliente devem pertencer à mesma loja.
- Não permitir vínculo entre tenants diferentes.

### [RF-CL04] Busca de Cliente

**Descrição:**  
O sistema deve buscar clientes por nome, contato principal ou CPF/CNPJ informado.

**Critérios de aceitação:**
- Restringir à loja atual.
- Aceitar busca parcial por nome.
- Normalizar contato e documento.
- CPF/CNPJ permanece opcional.

### [RF-CL05] Ficha do Cliente

**Descrição:**  
A ficha deve reunir dados, pets e atalhos para compras, vacinas e financeiro.

**Regras de negócio:**
- Atalhos dependem de entitlement e papel.
- Módulo ausente deve ter atalho ocultado.
- A ficha referencia, sem duplicar, dados dos contextos relacionados.

### [RF-CL06] Ficha do Pet

**Descrição:**  
A ficha do pet deve centralizar seus dados e acessos à carteira vacinal, prontuário e exames.

**Critérios de aceitação:**
- Mostrar somente módulos habilitados.
- Respeitar permissões clínicas e operacionais.
- Preservar vínculo com cliente e tenant.

### [RF-CL07] Desativação de Cliente e Pet

**Descrição:**  
O sistema deve desativar cliente ou pet sem apagar histórico.

**Critérios de aceitação:**
- Usar desativação lógica.
- Manter compras, lembretes, vacinas, prontuários e exames.
- Identificar registros inativos nas consultas.

### [RF-CL08] Upsert por Operações

**Descrição:**  
Pedido, agendamento ou PDV deve reutilizar cliente existente ou criar novo pelo contato principal.

**Regras de negócio:**
- Procurar somente dentro da loja.
- Reutilizar quando existir; criar com dados mínimos quando não existir.
- Não sobrescrever silenciosamente dados divergentes.
- Vincular pet ao cliente correto.

### [RF-CL09] Meus Clientes

**Descrição:**  
O painel deve filtrar clientes pelo `usuario_id` do operador responsável.

**Critérios de aceitação:**
- Oferecer visão “meus clientes”.
- Permitir outras visões conforme permissão.
- Responsabilidade operacional não substitui isolamento por loja.

### [RF-CL10] Dados do Tutor

**Descrição:**  
O cadastro pode armazenar nome, CPF/CNPJ opcional, contato principal, indicação de WhatsApp, e-mail, endereço, nascimento e observações.

**Regras de negócio:**
- Contato segue RF-CL02.
- CPF/CNPJ não é obrigatório.
- Demais campos não informados não impedem o cadastro, salvo definição posterior da feature.

### [RF-CL11] Dados do Pet

**Descrição:**  
O cadastro pode armazenar nome, espécie, raça, sexo, nascimento, peso, cor, microchip, número de identificação e foto.

**Regras de negócio:**
- Dados devem permanecer ligados ao pet correto.
- Campos ausentes não devem gerar valores presumidos.

### [RF-CL12] Informações Complementares do Pet

**Descrição:**  
A ficha deve permitir registrar alergias, características, comportamento e observações.

**Regras de negócio:**
- Restringir ao pet, loja e usuários autorizados.
- Não substituir registros clínicos do prontuário.

### [RF-CL13] Histórico de Compras

**Descrição:**  
A ficha do cliente deve exibir histórico derivado de pedidos e PDV.

**Critérios de aceitação:**
- Não duplicar a venda de origem.
- Restringir à loja.
- Permitir abrir a origem quando autorizado.
- Ocultar a seção sem os módulos correspondentes.

### [RF-CL14] Histórico Financeiro

**Descrição:**  
A ficha do cliente deve exibir vendas, pagamentos e pendências provenientes do contexto Financeiro.

**Regras de negócio:**
- Dados são derivados e restritos à loja.
- Respeitar entitlement e permissão financeira.
- Não alterar lançamentos diretamente pela ficha cadastral.

**Decisões adiadas para a feature:**
- obrigatoriedade dos demais campos;
- reativação;
- tratamento adicional de duplicidades;
- transferência de responsável;
- validações detalhadas de documentos, endereços e dados do pet.

---

## CONTEXTO: Cuidados e Lembretes

### [RF-L01] Catálogo de Tipos de Cuidado

**Descrição:**  
Usuários autorizados devem criar, editar, ativar e inativar tipos de cuidado por loja.

**Regras de negócio:**
- Somente tipos ativos podem ser usados em novos registros.
- Inativação não apaga históricos.
- Vacinação mantém experiência própria.

### [RF-L02] Registro de Cuidado

**Descrição:**  
O sistema deve registrar para o pet tipo de cuidado, data, observações e intervalo sugerido quando aplicável.

**Critérios de aceitação:**
- Vincular pet, cliente e loja.
- Exigir tipo válido.
- Preservar histórico.
- Permitir sugerir lembrete futuro sem obrigá-lo.

### [RF-L03] Geração de Lembrete

**Descrição:**  
Um cuidado pode gerar lembrete com `data_prevista` editável.

**Critérios de aceitação:**
- Vincular ao pet e ao cuidado de origem quando houver.
- Permitir revisar a data.
- Evitar duplicidade por repetição acidental.

### [RF-L04] Lembrete Manual

**Descrição:**  
Usuários autorizados devem criar lembrete diretamente na ficha do pet.

**Critérios de aceitação:**
- Informar tipo e data prevista.
- Não exigir cuidado anterior.
- Restringir pet e tipo à mesma loja.
- Disponibilizar nas filas correspondentes.

### [RF-L05] Estados do Lembrete

**Descrição:**  
O lembrete deve usar `pendente`, `vencido`, `avisado`, `concluido` e `dispensado`.

**Regras de negócio:**
- Mudanças preservam vínculo e histórico.
- Somente ações autorizadas alteram estado.
- Transições detalhadas ficam para a feature.

### [RF-L06] Filas de Lembretes

**Descrição:**  
O painel deve organizar lembretes em hoje, próximos sete dias e vencidos.

**Critérios de aceitação:**
- Restringir à loja.
- Usar data prevista e estado vigente.
- Permitir abrir cliente, pet e lembrete.

### [RF-L07] Ações sobre Lembretes

**Descrição:**  
O operador deve poder avisar por WhatsApp, registrar cuidado, adiar ou dispensar.

**Critérios de aceitação:**
- Exigir papel e entitlement.
- Atualizar o lembrete conforme a ação.
- WhatsApp depende de Comunicação.
- Registrar responsável.

### [RF-L08] Conclusão e Próximo Lembrete

**Descrição:**  
Registrar o cuidado deve concluir o lembrete relacionado e permitir criar o próximo.

**Critérios de aceitação:**
- Vincular o cuidado ao pet.
- Fechar o lembrete correto.
- Não exigir próximo lembrete.
- Se criado, permitir revisar a data.

### [RF-L09] Vencimento Automático

**Descrição:**  
Lembrete cuja data passou sem conclusão ou dispensa deve tornar-se `vencido`.

**Critérios de aceitação:**
- Processar somente lojas e features ativas.
- Não alterar concluídos ou dispensados.
- Refletir nas filas.
- Preservar datas e histórico.

**Decisões adiadas para a feature:**
- transições completas;
- cálculo de intervalos e recorrência;
- frequência dos jobs;
- conteúdo de mensagens.

---

## CONTEXTO: Imunização

### [RF-VAC01] Carteira Digital de Vacinação

**Descrição:**  
Cada pet deve possuir carteira digital com vacinas aplicadas e próximas doses.

**Critérios de aceitação:**
- Exibir vacina, aplicação e próxima dose.
- Preservar histórico cronológico.
- Restringir ao pet, loja e usuários autorizados.

### [RF-VAC02] Registro de Aplicação

**Descrição:**  
Usuários clínicos autorizados devem registrar tipo, fabricante, lote, data, veterinário, próxima dose e observações.

**Critérios de aceitação:**
- Vincular ao pet e tipo da loja.
- Registrar responsável.
- Atualizar a carteira somente após gravação.

### [RF-VAC03] Catálogo de Vacinas

**Descrição:**  
A loja deve manter tipos de vacina com protocolos e janelas de alerta.

**Critérios de aceitação:**
- Criar, editar, ativar e inativar tipos.
- Inativação não apaga aplicações.
- Restringir manutenção a usuários autorizados.

### [RF-VAC04] Histórico de Aplicações

**Descrição:**  
A ficha do pet deve apresentar histórico completo e cronológico de doses.

**Critérios de aceitação:**
- Exibir dados e responsável.
- Preservar aplicações de tipos inativados.
- Não misturar pets ou lojas.

### [RF-VAC05] Identificação de Doses Próximas

**Descrição:**  
O sistema deve identificar pets cuja próxima dose esteja dentro da janela configurada para a vacina.

**Regras de negócio:**
- Usar o protocolo do tipo.
- Não aplicar janela global fixa.
- Considerar a próxima dose vigente.
- Processar somente loja e feature ativas.

### [RF-VAC06] Fila de Alertas

**Descrição:**  
O painel deve exibir pet, tutor, vacina e data prevista dos alertas.

**Critérios de aceitação:**
- Restringir à loja.
- Permitir abrir carteira e cadastro.
- Refletir aplicações e demais ações da feature.

### [RF-VAC07] Comunicação com o Tutor

**Descrição:**  
O operador deve iniciar WhatsApp com contexto da vacina.

**Critérios de aceitação:**
- Depender de `whatsapp`.
- Usar contato principal do tutor.
- Identificar pet, vacina e data.
- Falha de comunicação não altera histórico vacinal.

### [RF-VAC08] Atualização após Dose

**Descrição:**  
Ao registrar dose, atualizar a carteira e sugerir ou editar a próxima dose.

**Critérios de aceitação:**
- Usar protocolo vigente como sugestão.
- Permitir revisão.
- Vincular próxima dose à aplicação.
- Evitar duplicidade.

### [RF-VAC09] Protocolo Vacinal

**Descrição:**  
Usuários autorizados devem configurar intervalo de reforço e número de doses da série inicial por tipo.

**Regras de negócio:**
- Configuração pertence à loja.
- Alterações orientam novas sugestões.
- Histórico não é reescrito automaticamente.

### [RF-VAC10] Janela de Alerta

**Descrição:**  
Cada tipo de vacina deve possuir janela configurável para antecipar alertas.

**Critérios de aceitação:**
- Suportar janelas adequadas a diferentes intervalos.
- Usar a janela vigente em novas avaliações.
- Não assumir 30 dias para todas as vacinas.

### [RF-VAC11] Sugestão Editável

**Descrição:**  
A próxima dose deve ser sugerida pelo protocolo e editável pelo veterinário responsável.

**Regras de negócio:**
- Sugestão não substitui decisão clínica.
- Valor editado prevalece naquela aplicação.
- Exceção individual não altera o protocolo global.
- Registrar responsável.

**Decisões adiadas para a feature:**
- regras clínicas específicas;
- transições dos alertas;
- correção ou anulação de aplicação;
- esquemas complexos;
- conteúdo das mensagens.

---

## CONTEXTO: Loja, Vendas e PDV

### [RF-PDV01] Cadastro de Produtos

**Descrição:**  
Usuários autorizados devem manter produtos por categoria, incluindo ração, medicamentos, brinquedos, petiscos, acessórios, higiene e produtos veterinários.

**Critérios de aceitação:**
- Criar e editar produtos da loja.
- Associar categoria.
- Restringir ao tenant.

### [RF-PDV02] Abertura de Venda

**Descrição:**  
O operador deve abrir venda vinculada a Cliente ou como consumidor final avulso.

**Critérios de aceitação:**
- Localizar ou criar cliente conforme upsert.
- Não exigir cliente para consumidor final.
- Identificar loja e operador.
- Não confirmar venda vazia.

### [RF-PDV03] Itens da Venda

**Descrição:**  
A venda deve conter produtos, quantidades, preços e totais.

**Critérios de aceitação:**
- Calcular e permitir revisão.
- Validar produtos e disponibilidade.
- Não aceitar quantidade inválida.
- Preservar valores usados na venda.

### [RF-PDV04] Formas de Pagamento

**Descrição:**  
O PDV deve aceitar dinheiro, PIX, débito e crédito.

**Critérios de aceitação:**
- Registrar a forma e vinculá-la à venda.
- Validar dados necessários antes da confirmação.

### [RF-PDV05] Múltiplos Pagamentos

**Descrição:**  
Uma venda pode usar mais de uma forma de pagamento.

**Critérios de aceitação:**
- Registrar cada pagamento.
- Exibir composição do total.
- Não confirmar valor incompatível.

### [RF-PDV06] Parcelamento

**Descrição:**  
Pagamento em crédito pode ser parcelado.

**Critérios de aceitação:**
- Registrar quantidade e valores.
- Associar ao pagamento em crédito.
- Exibir condições antes da confirmação.

### [RF-PDV07] Baixa Automática de Estoque

**Descrição:**  
Confirmar venda deve gerar baixa automática dos itens.

**Critérios de aceitação:**
- Baixar somente após confirmação.
- Vincular movimentações à venda.
- Evitar baixa duplicada.
- Falha na baixa impede confirmação inconsistente.

### [RF-PDV08] Controle de Estoque Insuficiente

**Descrição:**  
Venda acima do estoque deve ser bloqueada por padrão.

**Exceção aprovada:**
- Permitir somente a papel e capability específicos.
- Exibir a insuficiência antes da confirmação.
- Registrar operador, item e quantidades disponível e autorizada.
- Nunca permitir quebra silenciosa.

### [RF-PDV09] Histórico de Vendas do Cliente

**Descrição:**  
Vendas vinculadas devem aparecer na ficha do cliente.

**Critérios de aceitação:**
- Restringir à loja.
- Permitir abrir a venda de origem.
- Não duplicar dados do contexto Vendas.

### [RF-PDV10] Numeração e Comprovante

**Descrição:**  
Cada venda deve possuir número identificador e comprovante simples.

**Critérios de aceitação:**
- Gerar número único no contexto da loja.
- Resumir itens, valores, pagamentos e identificação.
- Disponibilizar somente após confirmação.

### [RF-PDV11] Evento de Compra Registrada

**Descrição:**  
Venda confirmada pode originar comunicação opcional por WhatsApp.

**Critérios de aceitação:**
- Depender de cliente com contato e feature `whatsapp`.
- Não ser requisito para concluir a venda.
- Evitar mensagem duplicada.
- Respeitar modo assistido ou automático.

**Decisões adiadas para as features:**
- cancelamento, devolução e estorno;
- descontos;
- regras fiscais;
- adquirentes, taxas, juros e limites;
- fechamento de caixa;
- emissão fiscal.

---

## CONTEXTO: Prontuário Veterinário

### [RF-PR01] Abertura de Atendimento Clínico

**Descrição:**  
Usuário clínico autorizado deve abrir atendimento ligado a pet e veterinário responsável.

**Critérios de aceitação:**
- Vincular loja, pet, tutor, data e veterinário.
- Exigir pet do tenant.
- Impedir abertura clínica por atendente sem permissão.

### [RF-PR02] Registro Clínico

**Descrição:**  
O atendimento deve registrar anamnese, sintomas, diagnósticos e evolução.

**Regras de negócio:**
- Somente papel clínico autorizado cria ou altera.
- Registro finalizado não pode ser sobrescrito.
- Correção posterior exige adendo auditado.

### [RF-PR03] Sinais Vitais

**Descrição:**  
Registrar peso, temperatura, frequência cardíaca, frequência respiratória e observações.

**Critérios de aceitação:**
- Associar ao atendimento.
- Preservar data e responsável.
- Não presumir valores ausentes.

### [RF-PR04] Histórico Clínico Cronológico

**Descrição:**  
A ficha do pet deve apresentar atendimentos em ordem cronológica.

**Critérios de aceitação:**
- Identificar tipo, data e veterinário.
- Restringir ao pet e loja.
- Exibir conteúdo conforme permissão.
- Mostrar adendos sem ocultar originais.

### [RF-PR05] Prescrição

**Descrição:**  
O veterinário deve registrar medicamento, dosagem, frequência, duração, via e observações.

**Regras de negócio:**
- Vincular ao atendimento e pet.
- Exigir autoria clínica.
- Prescrição finalizada segue regra de adendo.

### [RF-PR06] Solicitação de Exame

**Descrição:**  
O veterinário deve solicitar exames a partir do prontuário.

**Critérios de aceitação:**
- Vincular pet, atendimento e responsável.
- Encaminhar ao Laboratório sem duplicar seu fluxo.
- Manter referência à origem.

### [RF-PR07] Anexo de Resultado

**Descrição:**  
Resultados em PDF ou imagem devem ser anexados com data e veterinário responsável.

**Critérios de aceitação:**
- Vincular a pet, exame e atendimento quando aplicável.
- Restringir acesso.
- Impedir associação entre tenants.

### [RF-PR08] Documentos Clínicos

**Descrição:**  
O prontuário deve suportar receitas, atestados, laudos, termos e arquivos.

**Critérios de aceitação:**
- Identificar tipo, pet, atendimento, autor e data.
- Preservar documento emitido.
- Controlar acesso por papel.

### [RF-PR09] Auditoria Clínica

**Descrição:**  
Toda criação, finalização, adendo ou alteração permitida deve ser auditada.

**Dados mínimos:** usuário, data e hora, pet, atendimento, operação e referência ao conteúdo afetado.

**Regra:** auditoria não substitui nem apaga o original.

### [RF-PR10] Permissões Clínicas

**Descrição:**  
O sistema deve separar acesso clínico de acesso administrativo.

**Regras de negócio:**
- Veterinários autorizados usam funções clínicas compatíveis com o papel.
- Atendentes acessam somente dados administrativos.
- Atendentes não visualizam anamnese, diagnóstico, evolução, prescrição ou exames clínicos.
- Backend deve aplicar papel e entitlement.

### [RF-PR11] Evolução de Peso

**Descrição:**  
O sistema deve apresentar série cronológica de peso do pet.

**Critérios de aceitação:**
- Usar medições datadas.
- Manter referência ao atendimento de origem.
- Não alterar medições históricas para ajustar a visualização.

### [RF-PR12] Envio ao Tutor

**Descrição:**  
Documentos e receitas podem ser enviados ao tutor por WhatsApp.

**Critérios de aceitação:**
- Exigir documento finalizado e usuário autorizado.
- Depender de `whatsapp`.
- Registrar tentativa e resultado.
- Falha não altera o prontuário.

**Regra de adendo:**
- O original permanece íntegro.
- O adendo identifica autor, data e justificativa.
- Original e correção permanecem no histórico.

**Decisões adiadas para as features:**
- assinatura digital;
- modelos de documentos;
- retenção legal;
- campos clínicos obrigatórios;
- protocolos de prescrição;
- encerramento de atendimento;
- formatos e limites de anexos.

---

## CONTEXTO: Laboratório

### [RF-LAB01] Catálogo de Exames e Pacotes

**Descrição:**  
Usuários autorizados devem criar, editar, ativar e inativar exames e pacotes.

**Critérios de aceitação:**
- Permitir agrupar exames.
- Preservar referências históricas após inativação.
- Restringir ao tenant.

### [RF-LAB02] Solicitação de Exame

**Descrição:**  
O veterinário deve solicitar exame para um pet.

**Critérios de aceitação:**
- Vincular loja, pet, atendimento e veterinário.
- Selecionar exame ou pacote ativo.
- Registrar data e informações necessárias.
- Disponibilizar ao fluxo laboratorial.

### [RF-LAB03] Fluxo Laboratorial

**Descrição:**  
A solicitação deve percorrer coleta, processamento e resultado.

**Critérios de aceitação:**
- Preservar identificação da amostra e solicitação.
- Registrar avanço por usuário autorizado.
- Não misturar pets, solicitações ou tenants.
- Manter histórico.

### [RF-LAB04] Status do Exame

**Descrição:**  
O sistema deve representar o status da solicitação ao longo do fluxo.

**Critérios de aceitação:**
- Exibir no laboratório e prontuário relacionado.
- Registrar responsável e momento.
- Preservar histórico de estados.

### [RF-LAB05] Resultado e Referências

**Descrição:**  
O laboratório deve registrar resultados com valores de referência quando aplicáveis.

**Critérios de aceitação:**
- Vincular ao exame.
- Identificar unidade e referência configuradas.
- Preservar autoria e data.
- Não produzir interpretação clínica automática não prevista.

### [RF-LAB06] Laudo em PDF

**Descrição:**  
O sistema deve gerar ou anexar laudo em PDF com responsável.

**Critérios de aceitação:**
- Vincular à solicitação e ao pet.
- Identificar responsável e data.
- Restringir acesso.
- Preservar documento finalizado.

### [RF-LAB07] Histórico de Exames do Pet

**Descrição:**  
A ficha do pet deve apresentar solicitações, resultados e laudos cronologicamente.

**Critérios de aceitação:**
- Restringir ao pet e loja.
- Permitir abrir conforme permissão.
- Preservar cancelados com motivo.

### [RF-LAB08] Integração com Prontuário

**Descrição:**  
Resultados devem permanecer vinculados ao prontuário de origem.

**Regras de negócio:**
- Laboratório é responsável pelo fluxo e resultado.
- Prontuário mantém referência sem duplicar a fonte.
- Integração preserva `loja_id`, pet e solicitação.

### [RF-LAB09] Envio do Resultado ao Tutor

**Descrição:**  
Resultado pode ser enviado de modo automático ou assistido conforme Comunicação.

**Critérios de aceitação:**
- Exigir resultado disponível.
- Usar contato do tutor.
- Respeitar papel, entitlement e modo.
- Registrar tentativa e resultado.

### [RF-LAB10] Cancelamento de Solicitação

**Descrição:**  
Usuário autorizado deve cancelar solicitação com motivo obrigatório.

**Critérios de aceitação:**
- Preservar solicitação e histórico.
- Registrar responsável e data.
- Refletir no prontuário.
- Impedir novas etapas incompatíveis.

**Decisões adiadas para a feature:**
- unidades e referências;
- identificação física de amostras;
- transições completas;
- assinatura de laudos;
- correção de resultados;
- limites de cancelamento;
- integrações externas.

---

## CONTEXTO: Templates de Consulta

### [RF-TPL01] Gestão de Templates

**Descrição:**  
Usuários clínicos autorizados devem criar, consultar, editar e manter templates por loja ou veterinário.

**Critérios de aceitação:**
- Identificar proprietário e escopo.
- Diferenciar templates da loja e pessoais.
- Restringir ao tenant.
- Respeitar papel e capability.

### [RF-TPL02] Campos Configuráveis

**Descrição:**  
O template deve permitir definir rótulos e organização dos campos da consulta.

**Critérios de aceitação:**
- Preservar a ordem definida.
- Não alterar automaticamente consultas já preenchidas.
- Tipos e validações detalhados ficam para a feature.

### [RF-TPL03] Início de Consulta por Template

**Descrição:**  
O veterinário deve iniciar atendimento a partir de template ativo e acessível.

**Critérios de aceitação:**
- Copiar a estrutura para o atendimento.
- Vincular pet, veterinário e loja.
- Permitir preenchimento sem alterar o original.

### [RF-TPL04] Gravação no Prontuário

**Descrição:**  
O preenchimento deve ser salvo como parte do prontuário.

**Critérios de aceitação:**
- Vincular ao atendimento.
- Preservar conteúdo e autoria.
- Aplicar finalização e adendo.
- Não depender da permanência futura do template.

### [RF-TPL05] Duplicação de Template

**Descrição:**  
Usuários autorizados devem duplicar template para adaptação.

**Critérios de aceitação:**
- Criar cópia independente.
- Copiar campos e organização.
- Exigir nova identificação.
- Não alterar a origem.

### [RF-TPL06] Ativação e Inativação

**Descrição:**  
Templates podem ser ativados ou inativados sem excluir histórico.

**Critérios de aceitação:**
- Inativo não inicia nova consulta.
- Consultas existentes permanecem acessíveis.
- Permitir reativação conforme permissão.

**Decisões adiadas para a feature:**
- tipos e lógica condicional de campos;
- compartilhamento entre veterinários;
- templates padrão;
- versionamento avançado.

---

## CONTEXTO: IA Clínica

### [RF-IA01] Entrada Clínica Livre

**Descrição:**  
O veterinário deve fornecer texto livre ou ditado como entrada para assistência de IA.

**Critérios de aceitação:**
- Exigir usuário clínico.
- Vincular a atendimento, pet e loja.
- Permitir revisão antes do processamento.
- Falha não cria registro incompleto nem perde a entrada original.

### [RF-IA02] Estruturação Assistida

**Descrição:**  
A IA deve transformar a entrada em anamnese, SOAP ou resumo revisável.

**Critérios de aceitação:**
- Identificar conteúdo gerado por IA.
- Apresentar como rascunho.
- Não tratar como fato clínico confirmado.
- Não gravar automaticamente.

### [RF-IA03] Revisão pelo Veterinário

**Descrição:**  
O veterinário deve revisar, editar, complementar ou descartar o conteúdo antes de salvar.

**Critérios de aceitação:**
- Exigir confirmação explícita.
- Atribuir responsabilidade clínica ao veterinário.
- Aplicar as regras do prontuário.

### [RF-IA04] Confirmação Humana Obrigatória

**Descrição:**  
Diagnóstico ou prescrição gerados por IA não podem ser gravados sem confirmação humana.

**Regras de negócio:**
- IA não finaliza atendimento nem emite prescrição automaticamente.
- Reprocessamento não contorna confirmação.
- Conteúdo descartado não entra no prontuário.

### [RF-IA05] Transparência e Auditoria

**Descrição:**  
Registros assistidos por IA devem manter indicação auditável.

**Critérios de aceitação:**
- Registrar uso de IA, veterinário confirmador, data e hora.
- Não apresentar a IA como autora clínica.
- Restringir conteúdo e auditoria a usuários autorizados.

**Decisões adiadas para a integração:**
- fornecedor e modelo;
- retenção de prompts e respostas;
- processamento de áudio;
- anonimização;
- limites de uso e comportamento offline;
- métricas de qualidade;
- consentimento e privacidade aplicáveis.

---

## CONTEXTO: Comunicação por WhatsApp

### [RF-W01] Contato a partir de Produto

**Descrição:**  
A vitrine deve oferecer deep link para WhatsApp com texto contextual do produto.

**Critérios de aceitação:**
- Usar número da loja.
- Incluir identificação do produto.
- Preservar tenant.
- Exibir somente com feature e contato disponíveis.

### [RF-W02] Contato a partir de Pedido

**Descrição:**  
O cliente deve abrir WhatsApp com número e resumo do pedido.

**Critérios de aceitação:**
- Disponibilizar após criação.
- Incluir identificador e contexto.
- Não expor outro pedido ou tenant.

### [RF-W03] Ação Assistida no Painel

**Descrição:**  
Usuários autorizados devem iniciar avisos ao cliente a partir do contexto operacional.

**Critérios de aceitação:**
- Usar contato do cliente.
- Pré-preencher mensagem.
- Exigir papel e entitlement.
- Registrar a ação correspondente.

### [RF-W04] Catálogo de Gatilhos

**Descrição:**  
Eventos que originam comunicação devem estar documentados e associados a templates.

**Regras de negócio:**
- Automação por API é extensão e não bloqueia modo assistido.
- Cada gatilho identifica evento, tenant, destinatário e template.
- Evento sem configuração válida não gera envio automático.

### [RF-W05] Mensagem de Cuidado ou Lembrete

**Descrição:**  
Lembretes devem permitir comunicação contextual com o tutor.

**Critérios de aceitação:**
- Incluir pet, cuidado e data.
- Usar contato principal.
- Respeitar modo assistido ou automático.
- Falha não remove lembrete.

### [RF-W06] Marcação como Avisado

**Descrição:**  
A ação “Avisar tutor” deve atualizar o lembrete ou alerta para `avisado`.

**Critérios de aceitação:**
- Atualizar o registro de origem.
- Registrar responsável e momento.
- Evitar duplicidade.
- No modo assistido, não presumir confirmação técnica de entrega.

### [RF-W07] Evento de Vacina Vencendo

**Descrição:**  
O sistema deve produzir comunicação conforme a janela configurada no protocolo da vacina.

**Regras de negócio:**
- Usar RF-VAC10.
- Trinta dias é somente exemplo, nunca valor fixo global.
- Processar somente lojas e features ativas.
- Evitar envio duplicado.

### [RF-W08] Evento de Lembrete de Consulta

**Descrição:**  
Agendamentos podem gerar lembrete por WhatsApp antes do horário.

**Critérios de aceitação:**
- Identificar cliente, pet, serviço e horário.
- Respeitar configuração.
- Não enviar para agendamento cancelado.

### [RF-W09] Evento de Serviço Concluído

**Descrição:**  
Conclusão de serviço, como banho, pode gerar aviso ao tutor.

**Critérios de aceitação:**
- Originar-se de mudança válida.
- Usar template correspondente.
- Falha não altera o serviço.
- Evitar duplicidade.

### [RF-W10] Evento de Venda ou Pagamento

**Descrição:**  
Venda registrada ou pagamento pode gerar comunicação opcional.

**Critérios de aceitação:**
- Exigir cliente com contato.
- Vincular à origem.
- Não tornar envio requisito da venda.

### [RF-W11] Evento de Resultado ou Documento

**Descrição:**  
Resultado de exame ou documento disponível pode ser comunicado ao tutor.

**Critérios de aceitação:**
- Exigir conteúdo finalizado e autorizado.
- Respeitar permissões clínicas.
- Não expor outro pet ou tenant.
- Registrar tentativa e resultado.

### [RF-W12] Modos Assistido e Automático

**Descrição:**  
Modo assistido é obrigatório até a loja ser explicitamente habilitada para automação.

**Regras de negócio:**
- Assistido prepara a comunicação para ação do usuário.
- Automático exige configuração, integração e entitlement.
- Falha ou ausência da automação preserva o modo assistido.
- Automação não contorna regras do evento de origem.

### [RF-W13] Templates por Evento

**Descrição:**  
A loja deve manter templates associados aos eventos suportados.

**Critérios de aceitação:**
- Vincular ao tenant e evento.
- Permitir variáveis definidas pela feature.
- Validar dados antes de preparar ou enviar.
- Preservar templates usados no histórico.

**Decisões adiadas para a feature:**
- provedor oficial;
- confirmação de entrega e leitura;
- política de reenvio;
- conteúdo final;
- limites e custos;
- opt-in, opt-out e requisitos regulatórios.

---

## CONTEXTO: Multi-loja e Tenancy

### [RF-M01] Identificação do Tenant

**Descrição:**  
Toda entidade de negócio pertencente a uma loja deve conter `loja_id`.

**Regras de negócio:**
- Entidades globais da plataforma não recebem tenant artificial.
- Registros derivados preservam a loja de origem.
- Não permitir associação entre entidades de lojas diferentes.

### [RF-M02] Validação em Consultas e Operações

**Descrição:**  
Toda consulta ou operação do painel deve filtrar e validar o `loja_id` do usuário.

**Critérios de aceitação:**
- Derivar tenant do contexto autenticado.
- Não confiar somente no identificador enviado pelo cliente.
- Bloquear divergência entre usuário, recurso e loja.
- Aplicar também a arquivos, jobs e integrações.

### [RF-M03] Isolamento dos Dados

**Descrição:**  
Clientes, pets, prontuário, estoque, vacinas, WhatsApp e demais dados devem ser isolados por loja.

**Critérios de aceitação:**
- Consultas retornam somente o tenant atual.
- Eventos e relações preservam `loja_id`.
- Relatórios e lotes não misturam tenants.

### [RF-M04] Proibição de Acesso Cruzado

**Descrição:**  
Usuário de loja nunca deve acessar dados de outra loja sem vínculo e autorização.

**Critérios de aceitação:**
- Alterar URL ou identificador não contorna isolamento.
- Identidade com várias lojas atua em um escopo por operação.
- Permissão não se transfere entre lojas.
- Negar tentativa sem expor o recurso.

### [RF-M05] ZooRações como Primeiro Tenant

**Descrição:**  
ZooRações deve ser a primeira loja cadastrada pela plataforma.

**Critérios de aceitação:**
- Usar o fluxo de Super Admin.
- Receber slug, status, branding e entitlements como qualquer tenant.
- Não possuir exceções de isolamento ou domínio.

---

## CONTEXTO: Arquitetura e Bounded Contexts

### [RF-ARQ01] Contexto Declarado

**Descrição:**  
Cada funcionalidade deve pertencer a um Bounded Context declarado.

**Contextos:** Estoque, Vendas, Financeiro, Agendamentos, Cadastro, Imunização, Prontuário, Laboratório, Comunicação, Vitrine, Pedidos Online, Tenancy, Identity e Entitlements.

### [RF-ARQ02] Propriedade de Dados e Regras

**Descrição:**  
Cada contexto é responsável por suas regras e dados.

**Regras de negócio:**
- Um contexto não grava diretamente dados internos de outro.
- Dados derivados mantêm referência à fonte.
- Alterações usam o contrato do contexto responsável.

### [RF-ARQ03] Eventos entre Contextos

**Descrição:**  
Integrações que representem fatos ocorridos devem usar eventos de domínio.

**Critérios de aceitação:**
- Evento descreve fato passado.
- Incluir `loja_id` quando relacionado a tenant.
- Identificar o fato de forma rastreável.
- Não produzir efeito em tenant diferente.

### [RF-ARQ04] Idempotência de Consumidores

**Descrição:**  
Consumidores devem tolerar repetição de eventos sem duplicar efeitos.

**Critérios de aceitação:**
- Identificar evento já processado.
- Não duplicar mensagens, estoque, lembretes ou registros.
- Reprocessamento preserva resultado funcional consistente.

### [RF-ARQ05] Associação com Feature e Capability

**Descrição:**  
Cada funcionalidade deve declarar feature e capability necessária quando aplicável.

**Regras de negócio:**
- Usar catálogo canônico arquitetural.
- Não liberar funcionalidade sem associação.
- Separar entitlement da loja e papel do usuário.

### [RF-ARQ06] Guard Anterior ao Domínio

**Descrição:**  
A validação de entitlement deve ocorrer antes da entrada no domínio.

**Regras de negócio:**
- Bounded Context não consulta configuração comercial.
- Guard valida tenant, feature e capability.
- Domínio mantém suas regras internas.
- Jobs e consumidores aplicam proteção equivalente.

### [RF-ARQ07] Registro Prévio de Nova Feature

**Descrição:**  
Toda feature nova deve ser registrada no catálogo antes da entrega.

**Critérios de aceitação:**
- Declarar chave, contexto, capabilities, defaults e dependências.
- Nascer desligada nas lojas existentes.
- Não reutilizar chave descontinuada.
- Entrega sem registro é incompleta.

**Decisões adiadas para a arquitetura técnica:**
- organização física de serviços e bancos;
- formato e transporte de eventos;
- consistência entre contextos;
- retry e dead-letter;
- observabilidade;
- mecanismos concretos de armazenamento e segurança.

---

## 2. Rastreabilidade

- Fonte dos identificadores: `docs/REQUISITOS-FUNCIONAIS.md`.
- Quantidade consolidada: **148 requisitos funcionais**.
- Todos os requisitos mantêm seus IDs originais.
- As decisões adiadas registradas neste documento não devem ser interpretadas como comportamento aprovado.
