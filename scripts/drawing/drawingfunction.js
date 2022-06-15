import {
  canvas,
  context,
  configs,
  Rectangle,
  Rhombus,
  Hexagon,
  Parallelogram45,
  ElseMove,
  EllipseRect,
  ArrowDown,
  ArrowRight,
} from './figures.js';

import { highlightText } from './regexp.js';

const resFigures = [];
const figuresAfterIf = [];

const cordinatX = (prevId) => resFigures[prevId - 1].x;

const cordinatY = (prevId) => resFigures[prevId - 1].y;

const afterIf = (id, prevId, X, Y, idLoop, idIf, ifPrevId, idElse, flagLoopIf) => {
  X = cordinatX(prevId);
  Y = cordinatY(prevId);
  if (prevId !== 1 && prevId !== idLoop) X -= configs.spaceX1;
  for (const figure of figuresAfterIf) {
    if (figure.y > Y) Y = figure.y;
  }
  for (let i = 0; i < figuresAfterIf.length; i++) {
    let currY = figuresAfterIf[i].y + configs.uniHeight; ///
    const currX = figuresAfterIf[i].x;
    if (flagLoopIf != null) {
      if (flagLoopIf === 'left' && i === 0) {
        currY += configs.spaceY;
        Y += configs.spaceY;
      } else if (flagLoopIf === 'right') {
        // не для if в if і for одночасно
        if (i === 0) Y += configs.spaceY;
        if (i === 1) currY += configs.spaceY;
      }
    }
    context.moveTo(currX, currY);
    context.lineTo(currX, Y + configs.spaceY);
    context.lineTo(X, Y + configs.spaceY);
    context.stroke();
  }
  context.moveTo(X, Y + configs.uniHeight + configs.spaceY / 3);
  context.lineTo(X, Y + configs.spaceY * 2);
  context.stroke();
  Y += configs.spaceY;
  if (idElse == null && resFigures[id - 2].x < configs.coordinatX) {
    let currId = null;
    ifPrevId !== 1 && ifPrevId !== idLoop ? (currId = ifPrevId) : (currId = idIf);
    const ifX = cordinatX(currId);
    const ifY = cordinatY(currId);
    context.moveTo(ifX + configs.spaceX2, ifY + configs.uniHeight);
    context.lineTo(ifX + configs.spaceX2, Y);
    context.lineTo(X, Y);
    context.stroke();
  }
  figuresAfterIf.length = null;
  return { X, Y };
};

function afterLoop(X, Y, idLoop, flagIfLoop, flagLoopIf, hexWidth) {
  Y += configs.spaceY;
  context.moveTo(X, Y);
  if (flagIfLoop !== false) X -= configs.spaceX2;
  if (flagLoopIf != null) X += configs.spaceX1 / 4;
  context.lineTo(X - configs.spaceX1, Y);
  let loopX = cordinatX(idLoop);
  const loopY = cordinatY(idLoop);
  const loopYLevel = loopY + configs.uniHeight / 2;
  context.lineTo(X - configs.spaceX1, loopYLevel);
  context.lineTo(loopX - hexWidth / 2, loopYLevel);
  context.moveTo(loopX + hexWidth / 2, loopYLevel);
  if (flagIfLoop !== false) loopX += configs.spaceX2;
  if (flagLoopIf !== null) loopX -= configs.spaceX1 / 4;
  context.lineTo(loopX + configs.spaceX1, loopYLevel);
  context.lineTo(loopX + configs.spaceX1, Y + configs.spaceY / 3);
  if (flagIfLoop !== false) loopX -= configs.spaceX2;
  if (flagLoopIf !== null) loopX += configs.spaceX1 / 4;
  context.lineTo(loopX, Y + configs.spaceY / 3);
  if (flagIfLoop !== false) Y -= configs.spaceY / 3;
  context.lineTo(loopX, Y + configs.spaceY);
  context.stroke();
  if (flagIfLoop !== false) X += configs.spaceX2;
  if (flagLoopIf !== null) X -= configs.spaceX1 / 4;
  const arrowRight = new ArrowRight(loopX - hexWidth / 2, loopYLevel);
  arrowRight.draw();
  return { X, Y };
}

function drowLine(X, Y) {
  context.moveTo(X, Y + configs.uniHeight);
  context.lineTo(X, Y + configs.spaceY);
  context.stroke();
}

function ifLines(X, Y, text) {
  const yLevel = Y + configs.uniHeight / 2;
  context.moveTo(X - text.length * configs.toText2, yLevel);
  context.lineTo(X - configs.spaceX2, yLevel);
  context.lineTo(X - configs.spaceX2, yLevel + configs.uniHeight);
  context.moveTo(X + text.length * configs.toText2, yLevel);
  context.lineTo(X + configs.spaceX2, yLevel);
  context.lineTo(X + configs.spaceX2, yLevel + configs.uniHeight);
  context.stroke();
}

const textEditor = (text, type) => {
  let newText = text;
  if (type === 'printf') {
    const element = highlightText(text);
    newText = `output ${element}`;
  }
  if (type === 'scanf') {
    const element = highlightText(text);
    newText = `input ${element}`;
  }
  if (type === 'customF')newText = 'Begin';
  return newText;
};

function finder(array, x, y) {
  let X = x;
  let Y = y;
  let flagIf = false;
  let flagIfLoop = false;
  let flagLoopIf = null;
  let idLoop = null;
  let idIf = null;
  let ifPrevId = null;
  let idElse = null;
  let flagAfterIf = false;
  let hexWidth;
  const imgOfCanvas = document.getElementById('canvas');

  for (const obj of array) {
    const {
      type, text, id, prevId,
    } = obj;

    if (idLoop != null && idIf != null && idLoop > idIf) {
      if (idLoop !== null && prevId !== idLoop) { // && prevId !== idIf && prevId !== idElse
        const currCordinats = afterLoop(X, Y, idLoop, flagIfLoop, flagLoopIf, hexWidth);
        X = currCordinats.X;
        Y = currCordinats.Y;
        idLoop = null;
        flagIfLoop = false;
      }
      if (prevId !== idIf && prevId !== idElse && prevId !== idLoop && type !== 'else') flagIf = false;
      if (
        flagAfterIf === true && flagIf === false && idIf !== null && prevId !== idElse && type !== 'else'
      ) {
        figuresAfterIf.push(resFigures[id - 2]);
        const currCordinats = afterIf(id, prevId, X, Y, idLoop, idIf, ifPrevId, idElse, flagLoopIf);
        X = currCordinats.X;
        Y = currCordinats.Y;
        idElse = null;
        flagIf = false;
        flagAfterIf = false;
        flagLoopIf = null;
        idIf = null;
      }
    } else {
      if (prevId !== idIf && prevId !== idElse && prevId !== idLoop && type !== 'else') flagIf = false;
      if (
        flagAfterIf === true && flagIf === false && idIf !== null && prevId !== idElse && type !== 'else'
      ) {
        figuresAfterIf.push(resFigures[id - 2]);
        const currCordinats = afterIf(id, prevId, X, Y, idLoop, idIf, ifPrevId, idElse, flagLoopIf);
        X = currCordinats.X;
        Y = currCordinats.Y;
        idElse = null;
        flagIf = false;
        flagAfterIf = false;
        flagLoopIf = null;
        idIf = null;
      }
      if (idLoop !== null && prevId !== idLoop && prevId !== idElse && prevId !== idIf) {
        const currCordinats = afterLoop(X, Y, idLoop, flagIfLoop, flagLoopIf, hexWidth);
        X = currCordinats.X;
        Y = currCordinats.Y;
        idLoop = null;
        flagIfLoop = false;
      }
    }
    if (type === 'customF') {
      let editedText = text;
      editedText = textEditor(text, type);
      drowLine(X, Y);
      const ellipseRect = new EllipseRect(X, Y, configs.uniHeight, editedText, configs.uniHeight / 2);
      ellipseRect.draw();
      resFigures.push(ellipseRect);
    } else if (
      type === 'printf'
      || type === 'scanf'
      || type === 'def'
    ) {
      const editedText = textEditor(text, type);
      Y += configs.spaceY;
      const arrowDown = new ArrowDown(X, Y);
      arrowDown.draw();
      const parallelogram = new Parallelogram45(X, Y, configs.uniHeight, editedText);
      parallelogram.draw();
      resFigures.push(parallelogram);
      drowLine(X, Y);
    } else if (
      type === 'expression'
    ) {
      const editedText = textEditor(text, type);
      Y += configs.spaceY;
      const arrowDown = new ArrowDown(X, Y);
      arrowDown.draw();
      const rectangle = new Rectangle(X, Y, configs.uniHeight, editedText);
      rectangle.draw();
      resFigures.push(rectangle);
      drowLine(X, Y);
    } else if (type === 'if') {
      if (idLoop != null) flagIfLoop = true;
      flagIf = true;
      idIf = id;
      ifPrevId = prevId;
      flagAfterIf = true;
      Y += configs.spaceY;
      const arrowDown = new ArrowDown(X, Y);
      arrowDown.draw();
      const rhombus = new Rhombus(X, Y, configs.uniHeight, obj.text);
      rhombus.draw();
      resFigures.push(rhombus);
      ifLines(X, Y, text);
      X -= configs.spaceX2;
    } else if (type === 'for' || type === 'while') {
      if (idIf !== null) {
        idElse !== null ? flagLoopIf = 'right' : flagLoopIf = 'left';
      }
      idLoop = id;
      Y += configs.spaceY;
      const arrowDown = new ArrowDown(X, Y);
      arrowDown.draw();
      const hexagon = new Hexagon(X, Y, configs.uniHeight, text);
      hexWidth = hexagon.width;
      hexagon.draw();
      resFigures.push(hexagon);
      drowLine(X, Y);
    } else if (type === 'else') {
      idElse = id;
      figuresAfterIf.push(resFigures[id - 2]);
      let mainIf = null;
      prevId === ifPrevId ? (mainIf = idIf) : (mainIf = ifPrevId);
      X = cordinatX(mainIf);
      Y = cordinatY(mainIf);
      X += configs.spaceX2;
      const elseEllement = new ElseMove(X, Y);
      resFigures.push(elseEllement);
    }
  }
  Y += configs.spaceY;
  const arrowDown = new ArrowDown(X, Y);
  arrowDown.draw();
  const ellipseRect = new EllipseRect(X, Y, configs.uniHeight, ' End ', configs.uniHeight / 2);
  ellipseRect.draw();
  resFigures.push(ellipseRect);
  resFigures.length = null;
  imgOfCanvas.src = canvas.toDataURL();
}

export { finder };
