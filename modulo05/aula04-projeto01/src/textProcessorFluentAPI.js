const { evaluateRegex } = require('./util');
const Person = require('./person');

/**
 * O objetivo do Fluent API é executar tarefas
 * como um pipeline, step by step
 * e no fim, chama o build. MUITO similar ao padrão Builder
 * a diferença que aqui é sobre processos, o Builder sobre
 * construção de Objetos
 */

class TextProcessorFluentAPI {
  // propriedade privada
  #content;
  constructor(content) {
    this.#content = content;
  }

  extractPeopleData() {
    /**
     * ?<= fala que vai extrair os dados que virão depois desse grupo
     * [contratante|contratada] ou um ou outro, (no exemplo da aula funciona, mas isso esta errado)
     * tem a flag "i" no final da expressão para pegar maiúsculo e minúsculo
     * :\s{1} vai procurar o caráter literal do dois pontos seguido de um espaço
     * tudo acima fica dentro de um parêntese para falar "vamos pegar daí pra frente"
     * (?!s) negative lookaround, vai ignorar os contratantes do final do documento que só tem espaço a frente deles
     * .*\n Pega qualquer coisa até o primeiro \n
     * .*? non greedy, esse ? faz com que ele pare na primeira recorrência, assim evita ficar em loop
     * $ informar que a pesquisa acaba no fim da linha
     * g -> global
     * i -> insensitive
     * m -> multiline
     */

    const matchPerson = evaluateRegex(/(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gim);
    const onlyPerson = this.#content.match(matchPerson);

    this.#content = onlyPerson;

    return this;
  }

  divideTextInColumns() {
    const splitRegex = /,/gim;

    this.#content = this.#content.map((line) => line.split(splitRegex));

    return this;
  }

  removeEmptyCharacters() {
    const trimSpaces = evaluateRegex(/^\s+|\s+$|\n/g);
    this.#content = this.#content.map((line) => line.map((item) => item.replace(trimSpaces, '')));

    return this;
  }

  mapPerson() {
    this.#content = this.#content.map((line) => new Person(line));

    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;
