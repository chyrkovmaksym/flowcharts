import { BlockBuilder } from './parser/parsecode.js';
import { Cleaner } from './parser/cleancode.js';
import { Finder } from './drawing/drawingfunction.js';
import { configs } from './drawing/figures.js';
import { canvas, ctx } from './drawing/figures.js';

const code = document.getElementById('code');
const buttonSend = document.getElementById('button-send');
const buttonClear = document.getElementById('button-clear');

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const resultingFunction = (arrayOfObjects) => {
  let counter = 0;
  arrayOfObjects.forEach((element) => {
    if (element.type === 'customF') counter++;
  });
  if (counter === 1) {
    new Finder(arrayOfObjects, configs.coordinatX, configs.coordinatY);
  } else {
    modalWarning.open();
  }
};

buttonSend.addEventListener('click', () => {
  clearCanvas();
  const cleanedCode = new Cleaner(code.value);
  const resultOfCleaner = cleanedCode.getResult();
  const parsedCode = new BlockBuilder(resultOfCleaner);
  const resultOfProgramm = parsedCode.getResult();
  resultingFunction(resultOfProgramm);
});

buttonClear.addEventListener('click', () => {
  location.reload();
});
