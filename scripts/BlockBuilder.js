import { checkFunc, checkDef, checkCase, maps } from './config.js';

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
      } else {
        for (const key in maps) {
          const elems = maps[key];
          if (typeof elems === 'object') {
            if (checkFunc(elems)) {
              const item = elems[0];
              if (str.includes(item) && !str.includes(';')) {
                i = this.nestedBlocks(key, arr, str, i, previousId);
                break;
              }
            } else if (checkDef(elems)) {
              const item = elems[0];
              if (str.includes(item) && !str.includes('(', ')', '?')) {
                this.id++;
                this.resGeneration(key, str, this.id, previousId);
                break;
              }
            } else if (checkCase(elems)) {
              const item = elems[1];
              if (str.includes(item)) {
                i = this.findCaseDefault(arr, i, previousId, elems[0], elems[1]);
                break;
              }
            } else {
              const item = elems[0];
              if (str.includes(item) && str.includes(':')) {
                i = this.findTern(i, previousId, str);
                break;
              } else {
                if (!str.includes('#') && str.length != 1) {
                  this.id++;
                  this.resGeneration('expression', str, this.id, previousId);
                }
              }
            }
          }
          if (str.includes(elems)) {
            i = this.nestedBlocks(key, arr, str, i, previousId);
            break;
          }
        }
      } 
    }
  }

  getResult() {
    return this.res;
  }
}

export { BlockBuilder };
