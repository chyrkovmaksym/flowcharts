import { BlockBuilder } from './parser/parsecode.js';
import { Cleaner } from './parser/cleancode.js';
import { finder, X, Y } from './drawing/drawingfunction.js';

const code = document.getElementById('code');
const buttonSend = document.getElementById('button-send');
const buttonClear = document.getElementById('button-clear');

let resultOfProgramm = [];
let resultOfCleaner = [];

const resultingFunction = (arrayOfObjects) => {
  let counter = 0;
  arrayOfObjects.forEach((element) => {
    if (element.type === 'customF') counter++;
  });
  if (counter === 1) {
    finder(arrayOfObjects, X, Y);
  } else {
    modalWarning.open();
  }
};

buttonSend.addEventListener('click', () => {
  const cleanedCode = new Cleaner(code.value);
  resultOfCleaner = cleanedCode.getResult();
  const parsedCode = new BlockBuilder(resultOfCleaner);
  resultOfProgramm = parsedCode.getResult();
  resultingFunction(resultOfProgramm);
});

buttonClear.addEventListener('click', () => {
  location.reload();
});
