import { BlockBuilder } from './scripts.js';
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

class Cleaner {
    constructor(text) {
        this.result = this.sortingText(text);
    }

    cleanCode(arr) {
        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i].trimStart().trimEnd();
        }
        arr = arr.filter((str) => str !== '');
        return arr;
    }

    sortingText(string) {
        let sorted = string
            .replaceAll('}', '}\n')
            .replaceAll('{', '\n{')
            .split(/\r\n|\r|\n/g);
        sorted = this.cleanCode(sorted);
        return sorted;
    }

    getResult() {
        return this.result;
    }
}
