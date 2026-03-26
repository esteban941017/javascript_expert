const TextProcessorFluentAPI = require('./textProcessorFluentAPI');

class TextProcessorFacade {
  #TextProcessorFluentAPI;
  constructor(text) {
    this.#TextProcessorFluentAPI = new TextProcessorFluentAPI(text);
  }

  getPeopleFromPDF() {
    return this.#TextProcessorFluentAPI.extractPeopleData().divideTextInColumns().removeEmptyCharacters().mapPerson().build();
  }
}

module.exports = TextProcessorFacade;
