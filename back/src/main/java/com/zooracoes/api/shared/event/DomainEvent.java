package com.zooracoes.api.shared.event;

/**
 * Marker para eventos de domínio publicados entre Bounded Contexts. Implementações devem ser
 * records imutáveis carregando apenas IDs e dados mínimos — quem consome e precisar de mais busca
 * via porta do próprio contexto de origem, nunca lendo estrutura interna dele.
 */
public interface DomainEvent {}
