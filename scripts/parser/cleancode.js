class Cleaner {
  constructor(text) {
    this.result = this.sortingText(text);
  }

  cleanCode(arr) {
    return arr
      .map((item) => item.trimStart().trimEnd())
      .filter((item) => item !== '');
  }

  sortingText(string) {
    const sorted = string
      .replaceAll('}', '}\n')
      .replaceAll('{', '\n{')
      .split(/\r\n|\r|\n/g);
    const res = this.cleanCode(sorted);
    return res;
  }

  getResult() {
    return this.result;
  }
}

export { Cleaner };
