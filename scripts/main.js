import { BlockBuilder } from './parser/parsecode.js';
import { codeCleaner } from './parser/cleancode.js';
import { Finder } from './drawing/drawingfunction.js';
import { configs, canvas, ctx } from './drawing/figures.js';

const code = document.getElementById('code');
const buttonSend = document.getElementById('button-send');
const buttonClear = document.getElementById('button-clear');
const download = document.getElementById('download');

const getResult = (codeBlocks) => {
  let counter = 0;
  for (const block of codeBlocks) {
    if (block.type === 'customF') counter++;
  }
  if (counter === 1) {
    const scheme = new Finder(codeBlocks, configs.coordinatX, configs.coordinatY);
    scheme.draw();
    download.setAttribute('download', 'download');
    download.href = canvas.toDataURL();
  } else {
    modalWarning.open();
  }
};

buttonSend.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const resultOfCleaner = codeCleaner(code.value);
  console.log(resultOfCleaner);
  const parsedCode = new BlockBuilder(resultOfCleaner);
  const resultOfProgramm = parsedCode.getResult();
  console.log(resultOfProgramm);
  getResult(resultOfProgramm);
});

buttonClear.addEventListener('click', () => {
  location.reload();
});
