import { BlockBuilder } from './parsecode.js';
import { Cleaner } from './cleancode.js';
import { finder, X, Y } from './test.js';

const code = document.getElementById('code');
const button = document.getElementById('button');

let resultOfProgramm = [];
let resultOfCleaner = [];

button.addEventListener('click', () => {
  const cleanedCode = new Cleaner(code.value);
  resultOfCleaner = cleanedCode.getResult();
  const parsedCode = new BlockBuilder(resultOfCleaner);
  resultOfProgramm = parsedCode.getResult();
  finder(resultOfProgramm, X, Y);
});
