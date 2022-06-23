import { maps } from './config.js';
import {
  checkFunc,
  checkDef,
  checkCase,
  checkPrintOrScan,
  processingFunc,
  processingDef,
  processingPrintOrScan,
  processingExp,
  checkTern,
} from './processingfunctions.js';

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

  hasNested = (lastSymbolOfStr, nextRow) => lastSymbolOfStr === '{' || nextRow.split('')[0] === '{';

  nestedBlocks(keyWord, arr, str, i, previousId) {
    this.id++;
    const [leftBorderStr, rightBorderStr] = this.insideRoundBrackets(str);
    const strArray = str.split('');
    const lastElement = (arr) => arr[arr.length - 1];
    const lastSymbolOfStr = lastElement(strArray);
    const nextRow = arr[i + 1];
    this.resGeneration(
      keyWord,
      strArray.slice(leftBorderStr, rightBorderStr + 1).join(''),
      this.id,
      previousId,
    );

    if (this.hasNested(lastSymbolOfStr, nextRow)) {
      BlockBuilder.currArr = arr.slice(i, arr.length);
      const [leftBorderRow, rightBorderRow] = this.insideCurlyBrackets(
        BlockBuilder.currArr,
      );
      this.prevId = this.id;
      this.findKeyWords(
        BlockBuilder.currArr.slice(leftBorderRow + 1, rightBorderRow),
        this.prevId,
      );
      return i + rightBorderRow;
    }
    if (lastSymbolOfStr === ';') {
      this.prevId = this.id;
      this.findKeyWords(
        [strArray.slice(rightBorderStr + 1, strArray.length).join('')],
        this.prevId,
      );
    } else {
      this.prevId = this.id;
      this.findKeyWords([nextRow], this.prevId);
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
    return i++;
  }

  findKeyWords(arr, previousId) {
    BlockBuilder.currArr = arr;
    for (let i = 0; i < arr.length; i++) {
      const str = arr[i];
      let flag = false;
      for (const key in maps) {
        const elems = maps[key];
        if (typeof elems === 'object' && !flag) {
          if (checkDef(elems, maps)) {
            flag = processingDef.apply(this, [elems, str, key, previousId]);
          } else if (checkCase(elems) && str.includes(elems[1])) {
            i = this.findCaseDefault(arr, i, previousId, elems[0], elems[1]);
            flag = true;
          } else if (checkPrintOrScan(elems)) {
            flag = processingPrintOrScan.apply(this, [
              elems,
              str,
              key,
              previousId,
            ]);
          } else if (checkTern(elems) && str.includes(elems[0], elems[1])) {
            i = this.findTern(i, previousId, str);
            flag = true;
          } else if (checkFunc(elems, maps) && processingFunc(elems, str)) {
            i = this.nestedBlocks(key, arr, str, i, previousId);
            flag = true;
          }
        } else if (str.includes(elems) && !flag) {
          i = this.nestedBlocks(key, arr, str, i, previousId);
          flag = true;
        }
      }
      if (!flag && !str.includes('#') && str.length != 1) {
        flag = processingExp.apply(this, [str, previousId]);
      }
    }
  }

  getResult() {
    return this.res;
  }
}

export { BlockBuilder };
