package com.zooracoes.api.shared.event;

/**
 * Porta de saída para publicação de eventos entre Bounded Contexts. Camada de aplicação depende só
 * desta interface — troca de mecanismo (in-process para fila/outbox) fica isolada no adapter.
 */
public interface DomainEventPublisher {

  void publish(DomainEvent event);
}
