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
import { getType, types } from './config.js';

const resFigures = new Array();
const figuresAfterIf = new Array();

const cordinatX = (prevId) => resFigures[prevId - 1].x;

const cordinatY = (prevId) => resFigures[prevId - 1].y;

const afterIf = (
  id,
  prevId,
  X,
  Y,
  idLoop,
  idIf,
  ifPrevId,
  idElse,
  flagLoopIf
) => {
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
      } else if (flagLoopIf === 'right') {
        // not for if in if or loop at the same time
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
    ifPrevId !== 1 && ifPrevId !== idLoop
      ? (currId = ifPrevId)
      : (currId = idIf);
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

function Finder(array, x, y) {
  this.X = x;
  this.Y = y;
  this.flagIf = false;
  this.flagIfLoop = false;
  this.flagLoopIf = null;
  this.idLoop = null;
  this.idIf = null;
  this.ifPrevId = null;
  this.idElse = null;
  this.flagAfterIf = false;
  this.hexWidth;

  const imgOfCanvas = document.getElementById('canvas');

  for (const obj of array) {
    const { type, text, id, prevId } = obj;
    console.log(id);
    this.editedText = highlightText(text, type);
    if (this.idLoop != null && this.idIf != null && this.idLoop > this.idIf) {
      if (this.idLoop !== null && prevId !== this.idLoop) {
        // && prevId !== this.idIf && prevId !== idElse
        const currCordinats = afterLoop(
          this.X,
          this.Y,
          this.idLoop,
          this.flagIfLoop,
          this.flagLoopIf,
          this.hexWidth
        );
        this.X = currCordinats.X;
        this.Y = currCordinats.Y;
        this.idLoop = null;
        this.flagIfLoop = false;
      }
      if (
        prevId !== this.idIf &&
        prevId !== this.idElse &&
        prevId !== this.idLoop &&
        type !== 'else'
      )
        this.flagIf = false;
      if (
        this.flagAfterIf === true &&
        this.flagIf === false &&
        this.idIf !== null &&
        prevId !== this.idElse &&
        type !== 'else'
      ) {
        figuresAfterIf.push(resFigures[id - 2]);
        const currCordinats = afterIf(
          id,
          prevId,
          this.X,
          this.Y,
          this.idLoop,
          this.idIf,
          this.ifPrevId,
          this.idElse,
          this.flagLoopIf
        );
        this.X = currCordinats.X;
        this.Y = currCordinats.Y;
        this.idElse = null;
        this.flagIf = false;
        this.flagAfterIf = false;
        this.flagLoopIf = null;
        this.idIf = null;
      }
    } else {
      if (
        prevId !== this.idIf &&
        prevId !== this.idElse &&
        prevId !== this.idLoop &&
        type !== 'else'
      )
        this.flagIf = false;
      if (
        this.flagAfterIf === true &&
        this.flagIf === false &&
        this.idIf !== null &&
        prevId !== this.idElse &&
        type !== 'else'
      ) {
        figuresAfterIf.push(resFigures[id - 2]);
        const currCordinats = afterIf(
          id,
          prevId,
          this.X,
          this.Y,
          this.idLoop,
          this.idIf,
          this.ifPrevId,
          this.idElse,
          this.flagLoopIf
        );
        this.X = currCordinats.X;
        this.Y = currCordinats.Y;
        this.idElse = null;
        this.flagIf = false;
        this.flagAfterIf = false;
        this.flagLoopIf = null;
        this.idIf = null;
      }
      if (
        this.idLoop !== null &&
        prevId !== this.idLoop &&
        prevId !== this.idElse &&
        prevId !== this.idIf
      ) {
        const currCordinats = afterLoop(
          this.X,
          this.Y,
          this.idLoop,
          this.flagIfLoop,
          this.flagLoopIf,
          this.hexWidth
        );
        this.X = currCordinats.X;
        this.Y = currCordinats.Y;
        this.idLoop = null;
        this.flagIfLoop = false;
      }
    }
    const res = types[getType(type)].apply(this, [
      { ...obj, figuresAfterIf, resFigures },
    ]);
    resFigures.push(res);
  }
  this.Y += configs.spaceY;
  const arrowDown = new ArrowDown(this.X, this.Y);
  arrowDown.draw();
  const ellipseRect = new EllipseRect(
    this.X,
    this.Y,
    configs.uniHeight,
    'End',
    configs.uniHeight / 2
  );
  ellipseRect.draw();
  resFigures.push(ellipseRect);
  resFigures.length = null;
  imgOfCanvas.src = canvas.toDataURL();
}

export { Finder };
