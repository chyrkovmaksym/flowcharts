import { BlockBuilder } from './blockbuilder.js';
import { Cleaner } from './cleaner.js';

const code = document.getElementById('code');
const button = document.getElementById('button');
let resultOfProgramm = [];
let resultOfCleaner = [];

button.addEventListener('click', () => {
  const cleanedCode = new Cleaner(code.value);
  resultOfCleaner = cleanedCode.getResult();
  console.log(resultOfCleaner);
  resultOfProgramm = new BlockBuilder(resultOfCleaner);
  console.log(resultOfProgramm.getResult());
});
