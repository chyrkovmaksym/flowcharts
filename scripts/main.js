import { BlockBuilder } from './BlockBuilder.js';
import { Cleaner } from './Cleaner.js';
const code = document.getElementById('code');
const button = document.getElementById('button');

button.addEventListener('click', () => {
    const cleanedCode = new Cleaner(code.value);
    resultOfCleaner = cleanedCode.getResult();
    console.log(resultOfCleaner);
    resultOfProgramm = new BlockBuilder(resultOfCleaner);
    console.log(resultOfProgramm.getResult());

});

let resultOfProgramm = [];
let resultOfCleaner = [];


