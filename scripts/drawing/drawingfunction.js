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
} from './figures.js';

import { highlightText } from './regexp.js';

const resFigures = [];
const figuresAfterIf = [];

const cordinatX = (prevId) => resFigures[prevId - 1].x;

const cordinatY = (prevId) => resFigures[prevId - 1].y;

const afterIf = (id, prevId, X, Y, idFor, idIf, ifPrevId, idElse, flagForIf) => {
  // console.log(id);
  X = cordinatX(prevId);
  Y = cordinatY(prevId);
  if (prevId !== 1 && prevId !== idFor) X -= configs.spaceX1;
  for (const figure of figuresAfterIf) {
    if (figure.y > Y) Y = figure.y;
  }
  for (let i = 0; i < figuresAfterIf.length; i++) {
    let currY = figuresAfterIf[i].y + configs.uniHeight; ///
    const currX = figuresAfterIf[i].x;
    if (flagForIf != null) {
      if (flagForIf === 'left' && i === 0) {
        currY += configs.spaceY;
        Y += configs.spaceY;
      } else if (flagForIf === 'right') {
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
    ifPrevId !== 1 && ifPrevId !== idFor ? (currId = ifPrevId) : (currId = idIf);
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

function afterFor(X, Y, idFor, flagIfFor, flagForIf) {
  Y += configs.spaceY;
  context.moveTo(X, Y);
  if (flagIfFor !== false) X -= (configs.spaceX1 / 4) * 3;
  if (flagForIf != null) X += configs.spaceX1 / 4;
  context.lineTo(X - configs.spaceX1, Y);
  let forX = cordinatX(idFor);
  const forY = cordinatY(idFor);
  context.lineTo(X - configs.spaceX1, forY + configs.uniHeight / 2);
  context.lineTo(forX - configs.spaceX1 / 2, forY + configs.uniHeight / 2);
  context.moveTo(forX + configs.spaceX1 / 2, forY + configs.uniHeight / 2);
  if (flagIfFor !== false) forX += (configs.spaceX1 / 4) * 3;
  if (flagForIf !== null) forX -= configs.spaceX1 / 4;
  context.lineTo(forX + configs.spaceX1, forY + configs.uniHeight / 2);
  context.lineTo(forX + configs.spaceX1, Y + configs.spaceY / 3);
  if (flagIfFor !== false) forX -= (configs.spaceX1 / 4) * 3;
  if (flagForIf !== null) forX += configs.spaceX1 / 4;
  context.lineTo(forX, Y + configs.spaceY / 3);
  if (flagIfFor !== false) Y -= configs.spaceY / 3;
  context.lineTo(forX, Y + configs.spaceY);
  context.stroke();
  if (flagIfFor !== false) X += (configs.spaceX1 / 4) * 3;
  if (flagForIf !== null) X -= configs.spaceX1 / 4;
  return { X, Y };
}

function drowLine(X, Y) {
  context.moveTo(X, Y + configs.uniHeight);
  context.lineTo(X, Y + configs.spaceY);
  context.stroke();
}

function ifLines(X, Y, text) {
  context.moveTo(X - text.length * 10, Y + configs.uniHeight / 2);
  context.lineTo(X - configs.spaceX2, Y + configs.uniHeight / 2);
  context.lineTo(X - configs.spaceX2, Y + configs.uniHeight / 2 + configs.uniHeight);
  context.moveTo(X + text.length * 10, Y + configs.uniHeight / 2);
  context.lineTo(X + configs.spaceX2, Y + configs.uniHeight / 2);
  context.lineTo(X + configs.spaceX2, Y + configs.uniHeight / 2 + configs.uniHeight);
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
  let flagIfFor = false;
  let flagForIf = null;
  let idFor = null;
  let idIf = null;
  let ifPrevId = null;
  let idElse = null;
  let flagAfterIf = false;
  const imgOfCanvas = document.getElementById('canvas');

  for (const obj of array) {
    const {
      type, text, id, prevId,
    } = obj;

    if (idFor != null && idIf != null && idFor > idIf) {
      if (idFor !== null && prevId !== idFor) { // && prevId !== idIf && prevId !== idElse
        const currCordinats = afterFor(X, Y, idFor, flagIfFor, flagForIf);
        X = currCordinats.X;
        Y = currCordinats.Y;
        idFor = null;
        flagIfFor = false;
      }
      if (prevId !== idIf && prevId !== idElse && prevId !== idFor && type !== 'else') flagIf = false;
      if (
        flagAfterIf === true && flagIf === false && idIf !== null && prevId !== idElse && type !== 'else'
      ) {
        figuresAfterIf.push(resFigures[id - 2]);
        const currCordinats = afterIf(id, prevId, X, Y, idFor, idIf, ifPrevId, idElse, flagForIf);
        X = currCordinats.X;
        Y = currCordinats.Y;
        idElse = null;
        flagIf = false;
        flagAfterIf = false;
        flagForIf = null;
        idIf = null;
      }
    } else {
      if (prevId !== idIf && prevId !== idElse && prevId !== idFor && type !== 'else') flagIf = false;
      if (
        flagAfterIf === true && flagIf === false && idIf !== null && prevId !== idElse && type !== 'else'
      ) {
        figuresAfterIf.push(resFigures[id - 2]);
        const currCordinats = afterIf(id, prevId, X, Y, idFor, idIf, ifPrevId, idElse, flagForIf);
        X = currCordinats.X;
        Y = currCordinats.Y;
        idElse = null;
        flagIf = false;
        flagAfterIf = false;
        flagForIf = null;
        idIf = null;
      }
      if (idFor !== null && prevId !== idFor && prevId !== idElse && prevId !== idIf) {
        const currCordinats = afterFor(X, Y, idFor, flagIfFor, flagForIf);
        X = currCordinats.X;
        Y = currCordinats.Y;
        idFor = null;
        flagIfFor = false;
      }
    }
    if (type === 'customF' || type === 'end') {
      let editedText = text;
      if (type === 'end') Y += configs.spaceY;
      if (type === 'customF') {
        editedText = textEditor(text, type);
        drowLine(X, Y);
      }
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
      const parallelogram = new Parallelogram45(X, Y, configs.uniHeight, editedText);
      parallelogram.draw();
      resFigures.push(parallelogram);
      drowLine(X, Y);
    } else if (
      type === 'expression'
    ) {
      const editedText = textEditor(text, type);
      Y += configs.spaceY;
      const rectangle = new Rectangle(X, Y, configs.uniHeight, editedText);
      rectangle.draw();
      resFigures.push(rectangle);
      drowLine(X, Y);
    } else if (type === 'if') {
      if (idFor != null) flagIfFor = true;
      flagIf = true;
      idIf = id;
      ifPrevId = prevId;
      flagAfterIf = true;
      Y += configs.spaceY;
      const rhombus = new Rhombus(X, Y, configs.uniHeight, obj.text);
      rhombus.draw();
      resFigures.push(rhombus);
      ifLines(X, Y, text);
      X -= configs.spaceX2;
    } else if (type === 'for' || type === 'while') {
      if (idIf !== null) {
        idElse !== null ? flagForIf = 'right' : flagForIf = 'left';
      }
      idFor = id;
      Y += configs.spaceY;
      const hexagon = new Hexagon(X, Y, configs.uniHeight, text);
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
  const ellipseRect = new EllipseRect(X, Y, configs.uniHeight, ' End ', configs.uniHeight / 2);
  ellipseRect.draw();
  resFigures.push(ellipseRect);
  resFigures.length = null;
  imgOfCanvas.src = canvas.toDataURL();
}

export { finder };
