import { downLine, ifLines, horizontalLine } from './lines.js';
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
      configs.uniHeight / configs.half
    );
    ellipseRect.draw();
    return ellipseRect;
  },

  expression({ type }) {
    const { editedText } = this;
    if (editedText != 'break;') {
      let space1 = null;
      let space2 = null;
      let arrowX = null;
      this.Y += configs.spaceY;
      const { X, Y } = this;
      let figure;
      if (type === 'expression') {
        figure = new Rectangle(X, Y, configs.uniHeight, editedText);
        space1 = 0;
        space2 = 0;
        arrowX = 0;
      } else {
        figure = new Parallelogram45(X, Y, configs.uniHeight, editedText);
        space1 = -20;
        space2 = 20;
        arrowX = 20;
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
        space1 += -configs.spaceX3 + this.figWidth / 2;
        horizontalLine(X + configs.spaceX3, yLevel, space1);
        space2 += configs.spaceX3 - this.rhoSwitchWidth / 2 - this.figWidth / 2;
        // const arrowRight = new ArrowRight(X + configs.spaceX3, yLevel);
        // arrowRight.draw();
        horizontalLine(
          X - configs.spaceX3 + this.rhoSwitchWidth / 2,
          yLevel,
          space2
        );
        arrowX += X - this.figWidth / 2;
        const arrowRight = new ArrowRight(arrowX, yLevel);
        arrowRight.draw();
        downLine(
          X + 300,
          Y - configs.uniHeight / configs.half,
          configs.uniHeight
        );
      }
      return figure;
    }
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
    rhombus.draw();
    ifLines(X, Y, this.rhoWidth);
    if (this.rhoWidth > configs.spaceX4) this.X += this.rhoWidth / configs.half;
    else if (this.rhoWidth < configs.spaceX1) this.X += configs.spaceX3;
    else this.X += this.rhoWidth;
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

  else({ figuresAfterIf, resFigures, id, prevId }) {
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
      if (this.rhoWidth > configs.spaceX4)
        this.X -= this.rhoWidth / configs.half;
      else if (this.rhoWidth < configs.spaceX1) this.X -= configs.spaceX3;
      else this.X -= this.rhoWidth;
      res = new ElseMove(this.X, this.Y);
    } else {
      this.X = cordinatX(this.idIf, resFigures);
      this.Y = cordinatY(this.idIf, resFigures);
      this.Y += configs.spaceY;
      if (this.rhoWidth > configs.spaceX4)
        this.X -= this.rhoWidth / configs.half;
      else if (this.rhoWidth < configs.spaceX1) this.X -= configs.spaceX3;
      else this.X -= this.rhoWidth;
      const { X, Y, editedText } = this;
      res = new Rhombus(X, Y, configs.uniHeight, editedText);
      this.rhoWidth = res.width;
      const arrowDown = new ArrowDown(X, Y);
      arrowDown.draw();
      res.draw();
      ifLines(X, Y, this.rhoWidth);
      if (this.rhoWidth > configs.spaceX4)
        this.X += this.rhoWidth / configs.half;
      else if (this.rhoWidth < configs.spaceX1) this.X += configs.spaceX3;
      else this.X += this.rhoWidth;
      this.idIf = id;
    }
    return res;
  },

  switch({}) {
    console.log('switch');
    this.Y += configs.spaceY;
    const { X, Y, editedText } = this;
    const arrowDown = new ArrowDown(X, Y);
    arrowDown.draw();
    const rhombus = new Rhombus(X, Y, configs.uniHeight, editedText);
    //this.rhoWidth = rhombus.width;
    rhombus.draw();
    downLine(X, Y);
  },

  case({ id }) {
    if (this.idCase != null) this.X -= 300;
    if (this.idCase == null) this.idCase = id;
    console.log('case');
    this.Y += configs.spaceY;
    const { X, Y, editedText } = this;
    const arrowDown = new ArrowDown(X, Y);
    arrowDown.draw();
    const rhombus = new Rhombus(X, Y, configs.uniHeight, editedText);
    this.rhoSwitchWidth = rhombus.width;
    rhombus.draw();
    this.Y -= configs.spaceY;
    this.X += 300;
    downLine(X, Y);
    return rhombus;
  },

  default({}) {
    this.idCase = null;
    this.Y += configs.spaceY;
    this.X -= 300;
    const { X, Y, editedText } = this;
    const yLevel = Y + configs.uniHeight / configs.half;
    const arrowDown = new ArrowDown(X, Y);
    arrowDown.draw();
    const rectangle = new Rectangle(X, Y, configs.uniHeight, editedText);
    this.rectWidth = rectangle.width;
    rectangle.draw();
    const arrowLeft = new ArrowLeft(X + this.rectWidth / 2, yLevel);
    arrowLeft.draw();
    ctx.moveTo(X + 600, yLevel);
    ctx.lineTo(X + this.rectWidth / configs.half, yLevel);
    downLine(X, Y);
    //horizontalLine(X, Y, configs.spaceX3 + 50);
    return rectangle;
  },
};
export { types, getType, cordinatX, cordinatY };
