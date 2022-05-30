import {
  checkFunc, checkDef, checkCase, checkPrintOrScan, maps, processingFunc, processingDef, processingPrintOrScan, processingExp, checkTern
} from './config.js';

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
    const idOfRoundBrackets = [];
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
    const idOfCurlyBrackets = [];
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
      type,
      text,
      id,
      prevId,
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
      str.split('')[str.split('').length - 1] === '{'
      || arr[i + 1].trimStart().split('')[0] === '{'
    ) {
      BlockBuilder.currArr = arr.slice(i, arr.length);
      currRowLimits = this.insideCurlyBrackets(BlockBuilder.currArr);
      this.prevId = this.id;
      this.findKeyWords(
        BlockBuilder.currArr.slice(currRowLimits[0] + 1, currRowLimits[1]),
        this.prevId,
      );
      return i + currRowLimits[1];
    }
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
      let flag= false;
      for (const key in maps) {
        const elems = maps[key];
        if (str.includes(elems) && !flag) {
          i = this.nestedBlocks(key, arr, str, i, previousId);
          flag = true;
        } else if (typeof elems === 'object' && !flag) {
          if (checkDef(elems, maps)) {
            flag = processingDef.apply(this, [elems, str, key, previousId]);
          }
          if (checkCase(elems) && str.includes(elems[1])) {
            i = this.findCaseDefault(arr, i, previousId, elems[0], elems[1]);
            flag = true;
          }
          if (checkPrintOrScan(elems)) {
            flag = processingPrintOrScan.apply(this, [elems, str, key, previousId]);
          }
          if (checkFunc(elems, maps) && processingFunc(elems, str)) {
            i = this.nestedBlocks(key, arr, str, i, previousId);
            flag = true;
          }
          if (checkTern(elems) && str.includes(elems[0], elems[1])) {
            i = this.findTern(i, previousId, str);
            flag = true;
          }
        }
      } if (!flag && !str.includes('#') && str.length != 1) {
        flag = processingExp.apply(this, [str, previousId]);
      }
    }
  }

  getResult() {
    return this.res;
  }
}

export { BlockBuilder };
