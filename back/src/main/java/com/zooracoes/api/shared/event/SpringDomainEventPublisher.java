package com.zooracoes.api.shared.event;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

/**
 * Adapter da porta {@link DomainEventPublisher} usando o event bus do Spring. Listener de outro
 * contexto deve usar {@code @TransactionalEventListener(phase = AFTER_COMMIT)} para só reagir
 * depois que a transação que originou o evento tiver commitado.
 */
@Component
class SpringDomainEventPublisher implements DomainEventPublisher {

  private final ApplicationEventPublisher springPublisher;

  SpringDomainEventPublisher(ApplicationEventPublisher springPublisher) {
    this.springPublisher = springPublisher;
  }

  @Override
  public void publish(DomainEvent event) {
    springPublisher.publishEvent(event);
  }
}
