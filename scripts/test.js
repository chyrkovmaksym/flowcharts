import {
  canvas, context, configs, Rhombus, Hexsagon, Parallelogram45, ElseMove, EllipseRect,
} from './figures.js';

const X = 500;
const Y = 25;
const H = 75;

const resFigures = [];
const figuresAfterIf = [];

const cordinatX = (prevId) => resFigures[prevId - 1].x;

const cordinatY = (prevId) => resFigures[prevId - 1].y;

// function withoutElse() {
//   let currId = null;
//   ifPrevId !== 1 && ifPrevId != idFor ? (currId = ifPrevId) : (currId = idIf);
//   const ifX = cordinatX(currId);
//   const ifY = cordinatY(currId);
//   context.moveTo(ifX + 200, ifY + configs.uniHeight);
//   context.lineTo(ifX + 200, Y);
//   context.lineTo(X, Y);
//   context.stroke();
// }

const afterIf = (id, prevId, X, Y, idFor, idIf, ifPrevId, idElse) => {
  console.log(id);
  figuresAfterIf.push(resFigures[id - 2]);
  X = cordinatX(prevId);
  Y = cordinatY(prevId);
  if (prevId != 1 && prevId != idFor) X -= 200;
  for (const figure of figuresAfterIf) {
    if (figure.y > Y) Y = figure.y;
  }
  for (const figure of figuresAfterIf) {
    const currY = figure.y + configs.uniHeight;
    const currX = figure.x;
    context.moveTo(currX, currY);
    context.lineTo(currX, Y + H);
    context.lineTo(X, Y + H);
    context.stroke();
  }
  context.moveTo(X, Y + configs.uniHeight + H / 3);
  context.lineTo(X, Y + H * 2);
  context.stroke();
  Y += H;
  if (idElse == null && figuresAfterIf[0].x <= 500) {
    let currId = null;
    ifPrevId !== 1 && ifPrevId != idFor ? (currId = ifPrevId) : (currId = idIf);
    const ifX = cordinatX(currId);
    const ifY = cordinatY(currId);
    context.moveTo(ifX + 200, ifY + configs.uniHeight);
    context.lineTo(ifX + 200, Y);
    context.lineTo(X, Y);
    context.stroke();
  }
  figuresAfterIf.length = null;
  // if (flagIfFor == null) idFor = null;
  return { X, Y };
};

function afterFor(X, Y, idFor, flagIfFor) {
  if (flagIfFor != false) {
    X += 200;
    Y += 25;
  }
  Y += H;
  context.moveTo(X, Y);
  if (flagIfFor != false) X -= 150;
  context.lineTo(X - 200, Y);
  let forX = cordinatX(idFor);
  const forY = cordinatY(idFor);
  context.lineTo(X - 200, forY + configs.uniHeight / 2);
  context.lineTo(forX - 100, forY + configs.uniHeight / 2);
  context.moveTo(forX + 100, forY + configs.uniHeight / 2);
  if (flagIfFor != false) forX += 150;
  context.lineTo(forX + 200, forY + configs.uniHeight / 2);
  context.lineTo(forX + 200, Y + 25);
  if (flagIfFor != false) forX -= 150;
  context.lineTo(forX, Y + 25);
  if (flagIfFor != false) Y -= 25;
  context.lineTo(forX, Y + 75);
  context.stroke();
  return { X, Y };
}

function drowLine(X, Y) {
  context.moveTo(X, Y + configs.uniHeight);
  context.lineTo(X, Y + H);
  context.stroke();
}

function ifLines(X, Y, text) {
  context.moveTo(X - text.length * 10, Y + configs.uniHeight / 2);
  context.lineTo(X - 200, Y + configs.uniHeight / 2);
  context.lineTo(X - 200, Y + configs.uniHeight / 2 + configs.uniHeight);
  context.moveTo(X + text.length * 10, Y + configs.uniHeight / 2);
  context.lineTo(X + 200, Y + configs.uniHeight / 2);
  context.lineTo(X + 200, Y + configs.uniHeight / 2 + configs.uniHeight);
  context.stroke();
}

function finder(array, x, y) {
  let X = x;
  let Y = y;
  let flagIf = 'start';
  let flagIfFor = false;
  let idFor = null;
  let idIf = null;
  let ifPrevId = null;
  let idElse = null;
  const imgOfCanvas = document.getElementById('canvas');

  for (const obj of array) {
    const {
      type, text, id, prevId,
    } = obj;
    if (idFor !== null && prevId !== idFor && prevId !== idIf) {
      const currCordinats = afterFor(X, Y, idFor, flagIfFor);
      X = currCordinats.X;
      Y = currCordinats.Y;
      idFor = null;
      flagIfFor = false;
    }
    if (prevId !== idIf && prevId !== idElse) flagIf = 'end';
    if (
      flagIf === 'end'
      && idIf !== null
      && prevId !== idElse
      && type !== 'else'
      && prevId !== idFor
    ) {
      console.log(resFigures);
      const currCordinats = afterIf(
        id,
        prevId,
        X,
        Y,
        idFor,
        idIf,
        ifPrevId,
        idElse,
      );
      X = currCordinats.X;
      Y = currCordinats.Y;
      idElse = null;
      flagIf = 'end';
    }
    if (type === 'customF' || type === 'end') {
      if (type === 'end') Y += H;
      const ellipseRect = new EllipseRect(X, Y, id, prevId);
      ellipseRect.textSet = obj.text;
      ellipseRect.radiusSet = configs.uniHeight / 2;
      ellipseRect.widthSet = text.length * configs.toText1;
      ellipseRect.draw();
      if (type === 'customF') drowLine(X, Y);
      resFigures.push(ellipseRect);
    } else if (
      type == 'printf'
      || type == 'scanf'
      || type == 'def'
      || type == 'expression'
    ) {
      Y += H;
      const parallelogram = new Parallelogram45(X, Y);
      parallelogram.textSet = obj.text;
      parallelogram.heightSet = configs.uniHeight;
      parallelogram.widthSet = 2 * configs.uniHeight + text.length * configs.toText2;
      parallelogram.draw();
      resFigures.push(parallelogram);
      drowLine(X, Y);
    } else if (type === 'if') {
      if (idFor != null) flagIfFor = true;
      flagIf = 'start';
      idIf = id;
      ifPrevId = prevId;
      Y += H;
      const rhombus = new Rhombus(X, Y);
      rhombus.textSet = obj.text;
      rhombus.heightSet = configs.uniHeight;
      rhombus.widthSet = 2 * (text.length * configs.toText2);
      rhombus.draw();
      resFigures.push(rhombus);
      ifLines(X, Y, text);
      X -= 200;
    } else if (type === 'for') {
      idFor = id;
      Y += H;
      const hexsagon = new Hexsagon(X, Y);
      hexsagon.textSet = obj.text;
      hexsagon.heightSet = configs.uniHeight;
      hexsagon.widthSet = text.length * configs.toText2;
      hexsagon.draw();
      resFigures.push(hexsagon);
      drowLine(X, Y);
    } else if (type === 'else') {
      idElse = id;
      flagIf = 'end';
      figuresAfterIf.push(resFigures[id - 2]);
      let mainIf = null;
      prevId === ifPrevId ? (mainIf = idIf) : (mainIf = ifPrevId);
      X = cordinatX(mainIf);
      Y = cordinatY(mainIf);
      X += 200;
      const elseEllement = new ElseMove(X, Y);
      resFigures.push(elseEllement);
    } else if (type === 'while') {
      Y += H;
      const rhombus = new Rhombus(X, Y);
      rhombus.textSet = obj.text;
      rhombus.heightSet = configs.uniHeight;
      rhombus.widthSet = 2 * (text.length * configs.toText2);
      rhombus.draw();
      resFigures.push(rhombus);
    }
  }
  resFigures.length = null;
  imgOfCanvas.src = canvas.toDataURL();
}

export { finder, X, Y };
