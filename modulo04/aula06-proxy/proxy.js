'use strict';

const Event = require('events');
const event = new Event();
const eventName = 'counter';

event.on(eventName, (msg) => console.log('counter updated', msg));

const myCounter = {
  counter: 0,
};
const proxy = new Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    event.emit(eventName, { newValue, key: target[propertyKey] });
    target[propertyKey] = newValue;

    return true;
  },
  get: (object, prop) => {
    // console.log('Chamou!', { object, prop });

    return object[prop];
  },
});

// É executado imediatamente, dependendo do que estiver executando com maior prioridade
// Executa pra sempre até parar ele
setInterval(function () {
  proxy.counter += 1;

  console.log('[3]: setInterval');
  if (proxy.counter === 10) clearInterval(this);
}, 200);

// Futuro
setTimeout(() => {
  proxy.counter = 4;
  console.log('[2]: setTimeout');
}, 100);

// Se quer que executa agora
setImmediate(() => {
  console.log('[1]: setImmediate', proxy.counter);
});

// Executa agora, máxima prioridade, mas acaba com o ciclo de vida do node
process.nextTick(() => {
  proxy.counter = 2;
  console.log('[0]: nextTick');
});
