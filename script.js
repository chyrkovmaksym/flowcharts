const code = document.getElementById('code');
const button = document.getElementById('button');

button.addEventListener('click', () => {
  const code1 = new BlockBuilder(code.value);
});

class BlockBuilder {
  constructor(text) {
    this.res = [];
    this.strArray = text.split(/\r\n|\r|\n/g);
    this.findKeyWords();
    console.log(this.res);
  }
  resGeneration(type, text) {
    this.res.push({
      type: type,
      text:
        text.match(/\(([^)]+)\)/) !== null
          ? text.match(/\(([^)]+)\)/)[1]
          : 'no round brackets',
    });
  }
  findKeyWords() {
    for (let str of this.strArray) {
      str = str.trimStart();
      if (
        str.includes('if') &&
        !str.includes('print') &&
        !str.includes('scan')
      ) {
        this.resGeneration('if', str);
      } else if (
        str.includes('else') &&
        !str.includes('print') &&
        !str.includes('scan')
      ) {
        this.resGeneration('else', str);
      } else if (
        str.includes('while') &&
        !str.includes('print') &&
        !str.includes('scan')
      ) {
        this.resGeneration('while', str);
      } else if (
        str.includes('for') &&
        !str.includes('print') &&
        !str.includes('scan')
      ) {
        this.resGeneration('for', str);
      }
    }
  }
}
