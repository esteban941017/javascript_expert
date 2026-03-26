const { describe, it } = require('mocha');
const { expect } = require('chai');
const { InvalidRegexError, evaluateRegex } = require('./../src/util');

describe('Util', () => {
  it('#evaluateRegex should throw an error using unsafe regex', () => {
    const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/;

    /**
     * ISSO AQUI É UM EXEMPLO DE COMO QUEBRA,
     * Catastrophic backtracking!
     * 
     time \
     node --eval "/^([a-z|A-Z|0-9]+\s?)+$/.test('eaaae man como vai voce e como vai voce e como vai voce?') && console.log('legalzin')"
     */

    expect(() => evaluateRegex(unsafeRegex)).to.throw(InvalidRegexError, `This ${unsafeRegex} is unsafe!`);
  });

  it('#evaluateRegex should not throw an error using safe regex', () => {
    const safeRegex = /^([a-z])$/;

    expect(() => evaluateRegex(safeRegex)).to.not.throw();
    expect(evaluateRegex(safeRegex)).to.be.ok;
  });
});
