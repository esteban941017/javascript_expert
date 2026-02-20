const assert = require('assert');

const myMap = new Map();

// Podem ter qualquer coisa como chave
myMap
  .set(1, 'one')
  .set('Esteban', { text: 'two' })
  .set(true, () => 'hello');

// Usando com construtor
const myMapWithConstructor = new Map([
  ['1', 'str1'],
  ['', 'num1'],
  [true, 'bool1'],
]);

// console.log(myMap);
// console.log(myMap.get(1));

assert.deepStrictEqual(myMap.get(1), 'one');
assert.deepStrictEqual(myMap.get('Esteban'), { text: 'two' });
assert.deepStrictEqual(myMap.get(true)(), 'hello');

// Em Objects a chave só pode ser String ou Symbol (number é coergido a string)
const onlyReferenceWorks = { id: 1 };

myMap.set(onlyReferenceWorks, { name: 'Esteban' });

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'Esteban' });

// Utilitarios
// No Object seria Object.keys({a: 1)}).length
assert.deepStrictEqual(myMap.size, 4);

// Para verificar se um item existe no objeto
// Item.key = se não existe = undefined
// if () = coerção implicita para boolean e retorna false
// O jeito certo em Object é ({ name: 'Esteban'}).hasOwnProperty('name')
assert.ok(myMap.has(onlyReferenceWorks));

// Para remover um item do objeto
// delete item.id
// Não é performático no JavaScript
assert.ok(myMap.delete(onlyReferenceWorks));

// Não da para iterar em Objects diretamente
// tem que transformar com Object.entries(item)
assert.deepStrictEqual(
  JSON.stringify([...myMap]),
  JSON.stringify([
    [1, 'one'],
    ['Esteban', { text: 'two' }],
    [true, () => {}],
  ]),
);

// for (const [key, value] of myMap) {
//   console.log({ key, value });
// }

// Object sempre é inseguro, pois dependendo do nome da chave, pode substituir algum comportamento padrão
// ({ }).toString() === '[object Object]'
// ({toString: () => 'Hey'}).toString() === 'Hey'
// Qualquer chave pode colidir, com as propriedades herdadas do objeto, como constructor, toString, valueOf, etc.

const actor = {
  name: 'Xuxa da Silva',
  toString: 'Test string',
};

myMap.set(actor);

assert.ok(myMap.has(actor));
assert.throws(() => myMap.get(actor).toString, TypeError);

// Não da pra llimpar um Objeto sem reassina-lo
myMap.clear();
assert.deepStrictEqual([...myMap], []);

// --- WeakMap

// Pode ser coletado após perder as referencias
// Usado em casos bem específicos
// Tem a maioria dos benefícios do Map
// Mas não é iterável
// Só tem chaves de referência e que você já conhece
// Mais leve e preve leak de memória, porque depois de as instancias saem da memória, tudo é limpo

const weakMap = new WeakMap();
const hero = { name: 'flash' };

weakMap.set(hero, 'teste');
weakMap.has(hero);
weakMap.get(hero);
weakMap.delete(hero);
