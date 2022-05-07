
class BlockBuilder {
  constructor(text) {
    this.id = 0;
    this.prevId = 0;
    this.res = [];
    this.strArray = text;
    this.findKeyWords(this.strArray, 0);
  }

  insideRoundBrackets(txt) {
    let counter = 0;
    let idOfRoundBrackets = [];
    const splitedString = txt.split('');
    for (let i = 0; i < splitedString.length; i++) {
      if (splitedString[i] === '(') {
        if (!counter) {
          idOfRoundBrackets.push(i);
        }
        counter++;
      }
      if (splitedString[i] === ')') {
        counter--;
        if (!counter) {
          idOfRoundBrackets.push(i);
          break;
        }
      }
    }
    return idOfRoundBrackets;
  }

  insideCurlyBrackets(txt) {
    let counter = 0;
    let idOfCurlyBrackets = [];
    for (let i = 0; i < txt.length; i++) {
      if (txt[i].includes('{')) {
        if (!counter) {
          idOfCurlyBrackets.push(i);
        }
        counter++;
      } else if (txt[i].includes('}')) {
        counter--;
        if (!counter) {
          idOfCurlyBrackets.push(i);
          break;
        }
      }
    }
    return idOfCurlyBrackets;
  }

  resGeneration(type, text, id, prevId) {
    const element = {
      type: type,
      text: text,
      id: id,
      prevId: prevId,
    };
    this.res.push(element);
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
    const findInCase = [];
    BlockBuilder.currArr = arr.slice(i, arr.length);
    const array = BlockBuilder.currArr;
    for (let j = 0; j < array.length; j++) {
      if (array[j].includes(end)) {
        break;
      }
      findInCase.push(array[j]);
    }
    this.id++;
    this.resGeneration(resType, findInCase[0], this.id, previousId);
    this.prevId = this.id;
    findInCase.shift();
    this.findKeyWords(findInCase, this.prevId);
    return i + findInCase.length;
  }

  findTern(i, previousId, str) {
    this.id++;
    this.prevId = this.id;
    const ternParts = str.replace('?', ':').split(':');
    this.resGeneration('tern', ternParts[0], this.id, previousId);
    ternParts.shift();
    this.findKeyWords(ternParts, this.prevId);
    return ++i;
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
        i = this.findTern(i, previousId, str);
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
  getResult() {
    return this.res;
  }
}

export { BlockBuilder };
