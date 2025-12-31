9999999999999999; // 16 9's
// 10000000000000000

true + 2;
// 3

'21' + true;
// '21true'

'21' - true;
// 20

'21' - -1;
// 22

0.1 + 0.2 === 0.3;
// false (0.30000000000000004)

3 > 2 > 1;
// false

3 > 2 >= 1;
// true

'B' + 'a' + +'a' + 'a';
//BaNaNa

'1' == 1;
// true

'1' === 1;
// false

// ------------------------------------

console.assert(String(123) === '123', 'Explicit convertion to string');
console.assert(123 + '' === '123', 'Implicit convertion to string');
console.assert(('hello' || 1) === 'hello', '|| returns the first element');
console.assert(('hello' && 1) === 1, '&& returns the last element');

// ------------------------------------

const item = {
  name: 'Esteban',
  age: 31,
  // string: primeiro, se resultado não for primitivo chama o valueOf
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
  // number: primeiro, se resultado não for primitivo, chama o toString
  valueOf() {
    return 123;
  },
  // Ele tem prioridade
  [Symbol.toPrimitive](coercionType) {
    // console.log('Trying to convert to ', coercionType);
    const types = {
      string: JSON.stringify(this),
      number: 123456,
    };

    return types[coercionType] || types.string;
  },
};

console.log('toString: ', String(item));
console.log('valueOf: ', Number(item));
console.log('valueOf: ', new Date(item));

console.assert(item + 0 === '{"name":"Esteban","age":31}0');
console.assert(!!item);
console.assert('Oi'.concat(item) === 'Oi{"name":"Esteban","age":31}');
console.assert(item == String(item));
