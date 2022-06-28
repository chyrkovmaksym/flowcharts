import { downLine, processingLength, horizontalLine } from './lines.js';

import {
  EllipseRect,
  ArrowDown,
  Parallelogram45,
  Rectangle,
  Rhombus,
  Hexagon,
  ElseMove,
  configs,
  ArrowLeft,
  ctx,
  ArrowRight,
} from './figures.js';

const cordinatX = (prevId, resFigures) => resFigures[prevId - 1].x;

const cordinatY = (prevId, resFigures) => resFigures[prevId - 1].y;

const fillRhoNumbers = (X, Y, rhoWidth) => {
  ctx.fillText(
    '0',
    X - rhoWidth / configs.half - configs.xNumber,
    Y + configs.uniHeight / configs.half - configs.yNumber,
  );
  ctx.fillText(
    '1',
    X + rhoWidth / configs.half,
    Y + configs.uniHeight / configs.half - configs.xNumber,
  );
};

const keyWords = {
  customF: ['customF'],
  expression: ['printf', 'scanf', 'def', 'expression'],
  if: ['if'],
  cycle: ['for', 'while'],
  else: ['else'],
  switch: ['switch'],
  case: ['case'],
  default: ['default'],
};

const getType = (keyWord) => {
  for (const key of Object.keys(keyWords)) {
    if (keyWords[key].includes(keyWord)) return key;
  }
  return null;
};

const types = {
  customF() {
    const { X, Y, editedText } = this;
    downLine(X, Y);
    const ellipseRect = new EllipseRect(
      X,
      Y,
      configs.uniHeight,
      editedText,
      configs.uniHeight / configs.half,
    );
    ellipseRect.draw();
    return ellipseRect;
  },

  expression({ type }) {
    const { editedText } = this;
    if (editedText == 'break;') return;
    let space1 = null;
    let space2 = null;
    let arrowX = null;
    this.Y += configs.spaceY;
    const { X, Y } = this;
    let figure;
    if (type === 'expression') {
      figure = new Rectangle(X, Y, configs.uniHeight, editedText);
    } else {
      figure = new Parallelogram45(X, Y, configs.uniHeight, editedText);
      space1 = -configs.uniHeight / configs.half;
      space2 = configs.uniHeight / configs.half;
      arrowX = configs.uniHeight / configs.half;
    }
    this.figWidth = figure.width;
    figure.draw();
    if (this.idCase == null) {
      downLine(X, Y);
      const arrowDown = new ArrowDown(X, Y);
      arrowDown.draw();
    }
    if (this.idCase != null) {
      const yLevel = Y + configs.uniHeight / configs.half;
      space1 += -configs.spaceX3 + this.figWidth / configs.half;
      horizontalLine(X + configs.spaceX3, yLevel, space1);
      space2
        += configs.spaceX3
        - this.rhoSwitchWidth / configs.half
        - this.figWidth / configs.half;
      horizontalLine(
        X - configs.spaceX3 + this.rhoSwitchWidth / configs.half,
        yLevel,
        space2,
      );
      arrowX += X - this.figWidth / configs.half;
      const arrowRight = new ArrowRight(arrowX, yLevel);
      arrowRight.draw();
      downLine(
        X + configs.spaceX3,
        Y - configs.uniHeight / configs.half,
        configs.uniHeight,
      );
    }
    return figure;
  },

  if({ id, prevId }) {
    if (this.idLoop != null) this.flagIfLoop = true;
    this.flagIf = true;
    this.idIf = id;
    this.ifPrevId = prevId;
    this.flagAfterIf = true;
    this.Y += configs.spaceY;
    const { X, Y, editedText } = this;
    const arrowDown = new ArrowDown(X, Y);
    arrowDown.draw();
    const rhombus = new Rhombus(X, Y, configs.uniHeight, editedText);
    this.rhoWidth = rhombus.width;
    fillRhoNumbers(X, Y, this.rhoWidth);
    rhombus.draw();
    this.X = processingLength(X, Y, this.rhoWidth);
    return rhombus;
  },

  cycle({ id }) {
    if (this.idIf !== null) {
      this.idElse !== null
        ? (this.flagLoopIf = 'right')
        : (this.flagLoopIf = 'left');
    }
    this.idLoop = id;
    this.Y += configs.spaceY;
    const { X, Y, editedText } = this;
    const arrowDown = new ArrowDown(X, Y);
    arrowDown.draw();
    const hexagon = new Hexagon(X, Y, configs.uniHeight, editedText);
    this.hexWidth = hexagon.width;
    hexagon.draw();
    downLine(X, Y);
    return hexagon;
  },

  else({
    figuresAfterIf, resFigures, id, prevId,
  }) {
    figuresAfterIf.push(resFigures[id - 2]);
    let res;
    if (this.editedText === '') {
      this.idElse = id;
      let mainIf = null;
      prevId === this.ifPrevId
        ? (mainIf = this.idIf)
        : (mainIf = this.ifPrevId);
      this.X = cordinatX(mainIf, resFigures);
      this.Y = cordinatY(mainIf, resFigures);

      if (this.rhoWidth > configs.spaceX4) {
        this.X -= this.rhoWidth / configs.half;
      } else if (this.rhoWidth < configs.spaceX1) this.X -= configs.spaceX3;
      else this.X -= this.rhoWidth;

      res = new ElseMove(this.X, this.Y);
    } else {
      this.X = cordinatX(this.idIf, resFigures);
      this.Y = cordinatY(this.idIf, resFigures);
      this.Y += configs.spaceY;

      if (this.rhoWidth > configs.spaceX4) {
        this.X -= this.rhoWidth / configs.half;
      } else if (this.rhoWidth < configs.spaceX1) this.X -= configs.spaceX3;
      else this.X -= this.rhoWidth;

      const { X, Y, editedText } = this;
      res = new Rhombus(X, Y, configs.uniHeight, editedText);
      this.rhoWidth = res.width;
      fillRhoNumbers(X, Y, this.rhoWidth);
      const arrowDown = new ArrowDown(X, Y);
      arrowDown.draw();
      res.draw();

      this.X = processingLength(X, Y, this.rhoWidth);

      this.idIf = id;
    }
    return res;
  },

  switch({}) {
    this.Y += configs.spaceY;
    const { X, Y, editedText } = this;
    const arrowDown = new ArrowDown(X, Y);
    arrowDown.draw();
    const rhombus = new Rhombus(X, Y, configs.uniHeight, editedText);
    rhombus.draw();
    downLine(X, Y);
  },

  case({ id }) {
    if (this.idCase != null) this.X -= configs.spaceX3;
    if (this.idCase == null) this.idCase = id;
    this.Y += configs.spaceY;
    const { X, Y, editedText } = this;
    const arrowDown = new ArrowDown(X, Y);
    arrowDown.draw();
    const rhombus = new Rhombus(X, Y, configs.uniHeight, editedText);
    this.rhoSwitchWidth = rhombus.width;
    rhombus.draw();
    this.Y -= configs.spaceY;
    this.X += configs.spaceX3;
    downLine(X, Y);
    return rhombus;
  },

  default({}) {
    this.idCase = null;
    this.Y += configs.spaceY;
    this.X -= configs.spaceX3;
    const { X, Y, editedText } = this;
    const yLevel = Y + configs.uniHeight / configs.half;
    const arrowDown = new ArrowDown(X, Y);
    arrowDown.draw();
    const rectangle = new Rectangle(X, Y, configs.uniHeight, editedText);
    this.rectWidth = rectangle.width;
    rectangle.draw();
    const arrowLeft = new ArrowLeft(X + this.rectWidth / configs.half, yLevel);
    arrowLeft.draw();
    ctx.moveTo(X + configs.spaceX4, yLevel);
    ctx.lineTo(X + this.rectWidth / configs.half, yLevel);
    downLine(X, Y);
    return rectangle;
  },
};
export {
  types, getType, cordinatX, cordinatY,
};
