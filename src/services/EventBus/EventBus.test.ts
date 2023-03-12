import { expect } from 'chai';
import EventBus from './EventBus';

enum Events {
  REMOVE = 'remove',
  UPDATE = 'update',
}

type EventResult = Record<string, boolean>;

describe('Services/EventBus', () => {
  const eventBus = new EventBus();
  const eventResult: EventResult = {
    wasEmitted: false,
  };

  function changeStatus(): void {
    eventResult.wasEmitted = true;
  }

  it('Подписка на событие', () => {
    eventBus.on(Events.REMOVE, changeStatus);
    eventBus.on(Events.UPDATE, changeStatus);
    const hasSubscriber = eventBus.hasSubscriber((Events.REMOVE));
    expect(hasSubscriber.length).to.equal(1);
  });

  it('Вызов события', () => {
    eventBus.emit(Events.REMOVE);
    expect(eventResult.wasEmitted).to.be.an('boolean').that.equal(true);
  });

  it('Возврат события по имени', () => {
    const hasSubscriber = eventBus.hasSubscriber((Events.REMOVE));
    expect(hasSubscriber.length).to.equal(1);
  });

  it('Отписка от события', () => {
    eventBus.off(Events.REMOVE, changeStatus);
    const hasSubscriber = eventBus.hasSubscriber((Events.REMOVE));
    expect(hasSubscriber.length).to.equal(0);
  });

  it('Отписка от всех событий', () => {
    eventBus.offAll();
    const hasSubscriber = eventBus.hasSubscriber((Events.UPDATE));
    expect(hasSubscriber).to.be.an('undefined');
  });
});
