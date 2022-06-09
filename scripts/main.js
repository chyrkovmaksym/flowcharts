import { BlockBuilder } from './parser/parsecode.js';
import { Cleaner } from './parser/cleancode.js';
import { finder, X, Y } from './drawing/drawingfunction.js';

const code = document.getElementById('code');
const buttonSend = document.getElementById('button-send');
const buttonClear = document.getElementById('button-clear');

let resultOfProgramm = [];
let resultOfCleaner = [];

buttonSend.addEventListener('click', () => {
  const cleanedCode = new Cleaner(code.value);
  resultOfCleaner = cleanedCode.getResult();
  const parsedCode = new BlockBuilder(resultOfCleaner);
  resultOfProgramm = parsedCode.getResult();
  finder(resultOfProgramm, X, Y);
});

buttonClear.addEventListener('click', () => {
  location.reload();
});
