
const code = document.getElementById('code');
const button = document.getElementById('button');

button.addEventListener('click', () => {
  const code1 = new BlockBuilder(code.value);
});

class BlockBuilder {
  constructor(text) {
    this.id = 0; // id of this code string
    this.prevId = 0; // id of parent string
    this.res = []; // result
    text = text.replaceAll('}', '}\n'); // put Enter after curly brackets
    text = text.replaceAll('{', '\n{');
    this.strArray = text.split(/\r\n|\r|\n/g); // split text on strings
    this.strArray = this.cleanCode(this.strArray); // clean code
    this.findKeyWords(this.strArray, 0);
    console.log(this.res);
  }

  cleanCode(arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].trimStart();
      arr[i] = arr[i].trimEnd();
    }
    arr = arr.filter((str) => str !== ''); // clean empty strings
    return arr;
  }

  insideRoundBrackets(txt) {
    let counter = 0;
    let startId;
    let endId;
    const splitedString = txt.split('');
    for (let i = 0; i < splitedString.length; i++) {
      if (splitedString[i] === '(') {
        if (counter === 0) {
          startId = i;
        }
        counter++;
      }
      if (splitedString[i] === ')') {
        counter--;
        if (counter === 0) {
          endId = i;
          break;
        }
      }
    }
    return [startId, endId];
  }

  insideCurlyBrackets(txt) {
    let counter = 0;
    let startId;
    let endId;
    for (let i = 0; i < txt.length; i++) {
      if (txt[i].includes('{')) {
        if (counter === 0) {
          startId = i;
        }
        counter++;
      } else if (txt[i].includes('}')) {
        counter--;
        if (counter === 0) {
          endId = i;
          break;
        }
      }
    }
    return [startId, endId];
  }

  resGeneration(type, text, id, prevId) {
    this.res.push({
      type: type,
      text: text,
      id: id,
      prevId: prevId,
    });
  }

  static currArr = [];

  nestedBlocks(keyWord, arr, str, i, previousId) {
    let currRowLimits = [];
    let currStrLimits = [];
    this.id++;
    currStrLimits = this.insideRoundBrackets(str);

    this.resGeneration(
        keyWord,
        str
            .split('')
            .slice(currStrLimits[0], currStrLimits[1] + 1)
            .join(''),
        this.id,
        previousId,
    );

    if (
      str.split('')[str.split('').length - 1] === '{' ||
      arr[i + 1].trimStart().split('')[0] === '{'
    ) {
      BlockBuilder.currArr = arr.slice(i, arr.length);
      currRowLimits = this.insideCurlyBrackets(BlockBuilder.currArr);
      this.prevId = this.id;
      this.findKeyWords(
          BlockBuilder.currArr.slice(currRowLimits[0] + 1, currRowLimits[1]),
          this.prevId,
      );
      return i + currRowLimits[1];
    } else {
      if (str.split('')[str.split('').length - 1] === ';') {
        this.prevId = this.id;
        this.findKeyWords(
            [
              str
                  .split('')
                  .slice(currStrLimits[1] + 1, str.split('').length)
                  .join(''),
            ],
            this.prevId,
        );
      } else {
        this.prevId = this.id;
        this.findKeyWords([arr[i + 1]], this.prevId);
        i++;
      }
    }
    return i;
  }
  findCaseDefault(arr, i, previousId, end, resType) {
    BlockBuilder.currArr = arr.slice(i, arr.length);
    const findInCase = [];
    for (let j = 0; j < BlockBuilder.currArr.length; j++) {
      if (BlockBuilder.currArr[j].includes(end)) {
        break;
      }
      findInCase.push(BlockBuilder.currArr[j]);
    }
    this.id++;
    this.resGeneration(resType, findInCase[0], this.id, previousId);
    this.prevId = this.id;
    findInCase.shift();
    this.findKeyWords(findInCase, this.prevId);
    return i + findInCase.length;
  }

  findTern(arr, i, previousId, str) {
    let ternParts = [];
    ternParts = str.replace('?', ':').split(':');
    this.id++;
    this.resGeneration('tern', ternParts[0], this.id, previousId);
    this.prevId = this.id;
    ternParts.shift();
    this.findKeyWords(ternParts, this.prevId);
    return i + 1;
  }

  findKeyWords(arr, previousId) {
    BlockBuilder.currArr = arr;
    for (let i = 0; i < arr.length; i++) {
      const str = arr[i];
      // REMOVE MAGIC NUMBER
      if (
        str.trimStart().split('').slice(0, 7).join('').includes('print') ||
        str.trimStart().split('').slice(0, 7).join('').includes('scan')
      ) {
        this.id++;
        this.resGeneration('print/scan', str, this.id, previousId);
      } else if (
        str.includes('main') &&
        str.includes('(') &&
        str.includes(')')
      ) {
        i = this.nestedBlocks('main', arr, str, i, previousId);
      } else if (str.includes('while') && str.includes(';')) {
        this.id++;
        this.resGeneration('while(do)', str, this.id, previousId);
      } else if (str.includes('else')) {
        i = this.nestedBlocks('else', arr, str, i, previousId);
      } else if (str.includes('if')) {
        i = this.nestedBlocks('if', arr, str, i, previousId);
      } else if (str.includes('while') && !str.includes(';')) {
        i = this.nestedBlocks('while', arr, str, i, previousId);
      } else if (str.includes('for')) {
        i = this.nestedBlocks('for', arr, str, i, previousId);
      } else if (str.includes('do')) {
        i = this.nestedBlocks('do', arr, str, i, previousId);
      } else if (str.includes('switch')) {
        i = this.nestedBlocks('switch', arr, str, i, previousId);
      } else if (str.includes('case')) {
        i = this.findCaseDefault(arr, i, previousId, 'break', 'case');
      } else if (str.includes('default')) {
        i = this.findCaseDefault(arr, i, previousId, '}', 'default');
      } else if (str.includes('?') && str.includes(':')) {
        i = this.findTern(arr, i, previousId, str);
      } else if (
        (str.includes('char') ||
          str.includes('int') ||
          str.includes('float') ||
          str.includes('double')) &&
        str.includes(';')
      ) {
        this.id++;
        this.resGeneration('variable def', str, this.id, previousId);
      } else if (
        (str.includes('char') ||
          str.includes('int') ||
          str.includes('float') ||
          str.includes('double') ||
          str.includes('void')) &&
        !str.includes(';')
      ) {
        i = this.nestedBlocks('custom function', arr, str, i, previousId);
      } else if (!str.includes('#')) {
        this.id++;
        this.resGeneration('expression', str, this.id, previousId);
      }
    }
  }
}
