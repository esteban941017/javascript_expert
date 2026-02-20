'use strict';

const assert = require('assert');

// Garantir semántica e segurança em objetos

// --- apply
const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue;
  },
};

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130);

// Um problema que pode acontecer (raro)
// Function.prototype.apply = () => { throw new TypeError('Eita!') }

// Esse aqui pode acontecer!
// myObj.add.apply = function () {throw new TypeError('Vixxx')}

myObj.add.apply = function () {
  throw new TypeError('Vixxx');
};

assert.throws(() => {
  (myObj.add.apply({}, []),
    {
      name: 'TypeError',
      message: 'Vixxx',
    });
});

// Usando reflect:
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200]);

assert.deepStrictEqual(result, 260);
// --- apply

// --- defineProperty

// questões semánticas
function MyDate() {}

// Muito feio, tudo é Object, mas Object adicionando prop para uma function?
Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey There!' });

// Agora faz mais sentido
Reflect.defineProperty(MyDate, 'withReflection', { value: () => 'Hey Dude!' });

assert.deepStrictEqual(MyDate.withObject(), 'Hey There!');
assert.deepStrictEqual(MyDate.withReflection(), 'Hey Dude!');
// --- defineProperty

// --- deleteProperty
const withDelete = { user: 'Esteban' };
// Imperformático, evitar ao máximo!
delete withDelete.user;

assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false);

const withReflection = { user: 'Xuxa da Silva' };
Reflect.deleteProperty(withReflection, 'user');

assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false);
// --- deleteProperty

// --- get

// --- Deveriamos fazer um get somente em instancias de referência
assert.deepStrictEqual((1)['userName'], undefined);

// com reflection, a exeção é lançada!
assert.throws(() => Reflect.get(1, ['userName']), TypeError);
// --- get

// --- has

assert.ok('superman' in { superman: '' });
assert.ok(Reflect.has({ batman: '' }, 'batman'));
// --- has

// --- ownKeys

const user = Symbol('user');
const databaseUser = {
  id: 1,
  [Symbol.for('password')]: 123,
  [user]: 'esteban',
};

// Com os metodos de object, temos que fazer 2 requisições
const objectKeys = [...Object.getOwnPropertyNames(databaseUser), ...Object.getOwnPropertySymbols(databaseUser)];
assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user]);

assert.deepStrictEqual(Reflect.ownKeys(databaseUser), ['id', Symbol.for('password'), user]);
// --- ownKeys
