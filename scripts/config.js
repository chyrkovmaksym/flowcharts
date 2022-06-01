const maps = {
  printf: ['printf', '(', ')', '"'],
  customF: [['main', '(', ')'], ['double', '(', ')'], ['void', '(', ')'], ['char', '(', ')'], ['int', '(', ')'], ['float', '(', ')']],
  def: [['double', ';'], ['void', ';'], ['char', ';'], ['int', ';'], ['float', ';']],
  do: 'do',
  else: 'else',
  if: 'if',
  for: 'for',
  while: 'while',
  switch: 'switch',
  case: ['break', 'case'],
  default: ['}', 'default'],
  tern: ['?', ':'],
  scanf: ['scanf', '(', ')', '"'],
};

const checkFunc = (array, maps) => array === maps.customF;

const checkDef = (array, maps) => array === maps.def;

const checkCase = (array) => array.includes('break', 'case') || array.includes('}', 'default');

const checkPrintOrScan = (array) => array.includes('printf') || array.includes('scanf');

const checkTern = (array) => array === maps.tern;

function processingFunc(elems, str) {
  for (const func of elems) {
    if (str.includes(...func) && !str.includes(';')) {
      return true;
    }
  }
  return false;
}

function processingDef(elems, str, key, previousId) {
  for (const def of elems) {
    if (str.includes(...def) && !str.includes('(', ')', '?')) {
      this.id++;
      this.resGeneration(key, str, this.id, previousId);
      return true;
    }
  }
  return false;
}

function processingPrintOrScan(elems, str, key, previousId) {
  if (str.includes(...elems)) {
    this.id++;
    this.resGeneration(key, str, this.id, previousId);
    return true;
  }
  return false;
}

function processingExp(str, previousId) {
  this.id++;
  this.resGeneration('expression', str, this.id, previousId);
  return true;
}

export {
  maps, checkFunc, checkDef, checkCase, checkPrintOrScan, processingFunc, processingDef, processingPrintOrScan, processingExp, checkTern,
};
