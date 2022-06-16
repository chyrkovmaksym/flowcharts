import {
  canvas,
  ctx,
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

const resFigures = new Array();
const figuresAfterIf = new Array();

const cordinatX = (prevId) => resFigures[prevId - 1].x;

const cordinatY = (prevId) => resFigures[prevId - 1].y;

const afterIf = (id, prevId, X, Y, idLoop, idIf, ifPrevId, idElse, flagLoopIf) => {
  console.log('afterIf');
  X = cordinatX(prevId);
  Y = cordinatY(prevId);
  if (prevId !== 1 && prevId !== idLoop) X -= configs.spaceX1;
  for (const figure of figuresAfterIf) {
    if (figure.y > Y) Y = figure.y;
  }
  for (let i = 0; i < figuresAfterIf.length; i++) {
    let currY = figuresAfterIf[i].y + configs.uniHeight;
    const currX = figuresAfterIf[i].x;
    if (flagLoopIf != null) {
      if (flagLoopIf === 'left' && i === 0) {
        currY += configs.spaceY;
        Y += configs.spaceY;
      } else if (flagLoopIf === 'right') { // not for if in if or loop at the same time
        if (i === 0) Y += configs.spaceY;
        if (i === 1) currY += configs.spaceY;
      }
    }
    ctx.moveTo(currX, currY);
    ctx.lineTo(currX, Y + configs.spaceY);
    ctx.lineTo(X, Y + configs.spaceY);
    ctx.stroke();
  }
  ctx.moveTo(X, Y + configs.uniHeight + configs.spaceY / 3);
  ctx.lineTo(X, Y + configs.spaceY * 2);
  ctx.stroke();
  Y += configs.spaceY;
  if (idElse == null && resFigures[id - 2].x < configs.coordinatX) {
    let currId = null;
    ifPrevId !== 1 && ifPrevId !== idLoop ? (currId = ifPrevId) : (currId = idIf);
    const ifX = cordinatX(currId);
    const ifY = cordinatY(currId);
    ctx.moveTo(ifX + configs.spaceX2, ifY + configs.uniHeight);
    ctx.lineTo(ifX + configs.spaceX2, Y);
    ctx.lineTo(X, Y);
    ctx.stroke();
  }
  figuresAfterIf.length = null;
  return { X, Y };
};

function afterLoop(X, Y, idLoop, flagIfLoop, flagLoopIf, hexWidth) {
  console.log('afterLoop');
  Y += configs.spaceY;
  ctx.moveTo(X, Y);
  if (flagIfLoop !== false) X -= configs.spaceX2;
  if (flagLoopIf != null) X += configs.spaceX1 / 4;
  ctx.lineTo(X - configs.spaceX1, Y);
  let loopX = cordinatX(idLoop);
  const loopY = cordinatY(idLoop);
  const loopYLevel = loopY + configs.uniHeight / 2;
  ctx.lineTo(X - configs.spaceX1, loopYLevel);
  ctx.lineTo(loopX - hexWidth / 2, loopYLevel);
  ctx.moveTo(loopX + hexWidth / 2, loopYLevel);
  if (flagIfLoop !== false) loopX += configs.spaceX2;
  if (flagLoopIf !== null) loopX -= configs.spaceX1 / 4;
  ctx.lineTo(loopX + configs.spaceX1, loopYLevel);
  ctx.lineTo(loopX + configs.spaceX1, Y + configs.spaceY / 3);
  if (flagIfLoop !== false) loopX -= configs.spaceX2;
  if (flagLoopIf !== null) loopX += configs.spaceX1 / 4;
  ctx.lineTo(loopX, Y + configs.spaceY / 3);
  if (flagIfLoop !== false) Y -= configs.spaceY / 3;
  ctx.lineTo(loopX, Y + configs.spaceY);
  ctx.stroke();
  if (flagIfLoop !== false) X += configs.spaceX2;
  if (flagLoopIf !== null) X -= configs.spaceX1 / 4;
  const arrowRight = new ArrowRight(loopX - hexWidth / 2, loopYLevel);
  arrowRight.draw();
  return { X, Y };
}

function downLine(X, Y) {
  ctx.moveTo(X, Y + configs.uniHeight);
  ctx.lineTo(X, Y + configs.spaceY);
  ctx.stroke();
}

function ifLines(X, Y, text) {
  console.log('ifLines');
  const yLevel = Y + configs.uniHeight / 2;
  ctx.moveTo(X - text.length * configs.toText2, yLevel);
  ctx.lineTo(X - configs.spaceX2, yLevel);
  ctx.lineTo(X - configs.spaceX2, yLevel + configs.uniHeight);
  ctx.moveTo(X + text.length * configs.toText2, yLevel);
  ctx.lineTo(X + configs.spaceX2, yLevel);
  ctx.lineTo(X + configs.spaceX2, yLevel + configs.uniHeight);
  ctx.stroke();
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
    console.log(id);
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
      downLine(X, Y);
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
      downLine(X, Y);
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
      downLine(X, Y);
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
      downLine(X, Y);
    }else if (type === 'else' && text !=='' ) { //else if
      figuresAfterIf.push(resFigures[id - 2]);
      X = cordinatX(idIf);
      Y = cordinatY(idIf);
      Y += configs.spaceY;
      X += configs.spaceX2;
      const rhombus = new Rhombus(X, Y, configs.uniHeight, obj.text);
      rhombus.draw();
      resFigures.push(rhombus);
      ifLines(X, Y, text);
      X -= configs.spaceX2;
      idIf=id;
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
  const ellipseRect = new EllipseRect(X, Y, configs.uniHeight, 'End', configs.uniHeight / 2);
  ellipseRect.draw();
  resFigures.push(ellipseRect);
  resFigures.length = null;
  imgOfCanvas.src = canvas.toDataURL();
}

export { finder };
