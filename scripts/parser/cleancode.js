class Cleaner {
  constructor(text) {
    this.result = this.sortingText(text);
  }

  cleanCode(arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].trimStart().trimEnd();
    }
    arr = arr.filter((str) => str !== '');
    return arr;
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
