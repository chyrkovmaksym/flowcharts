import { downLine, ifLines } from './lines.js';
import {
  EllipseRect,
  ArrowDown,
  Parallelogram45,
  Rectangle,
  Rhombus,
  Hexagon,
  ElseMove,
} from './figures.js';
import { configs } from './figures.js';

const cordinatX = (prevId, resFigures) => resFigures[prevId - 1].x;

const cordinatY = (prevId, resFigures) => resFigures[prevId - 1].y;

const keyWords = {
  customF: 'customF',
  expression: ['printf', 'scanf', 'def', 'expression'],
  if: 'if',
  cycle: ['for', 'while'],
  else: 'else',
};

const getType = (keyWord) => {
  for (const key of Object.keys(keyWords)) {
    if (Array.isArray(keyWords[key])) {
      if (keyWords[key].includes(keyWord)) return key;
      continue;
    }
    if (keyWords[key] === keyWord) return key;
  }
};

const types = {
  customF: function () {
    const { X, Y, editedText } = this;
    downLine(X, Y);
    const ellipseRect = new EllipseRect(
      X,
      Y,
      configs.uniHeight,
      editedText,
      configs.uniHeight / 2
    );
    ellipseRect.draw();
    return ellipseRect;
  },
  expression: function ({ type }) {
    this.Y += configs.spaceY;
    const { X, Y, editedText } = this;
    const arrowDown = new ArrowDown(X, Y);
    arrowDown.draw();
    const figure =
      type === 'expression'
        ? new Rectangle(X, Y, configs.uniHeight, editedText)
        : new Parallelogram45(X, Y, configs.uniHeight, editedText);
    figure.draw();
    downLine(X, Y);
    return figure;
  },
  if: function ({ id, prevId }) {
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
    rhombus.draw();
    ifLines(X, Y, editedText);
    this.X -= configs.spaceX2;
    return rhombus;
  },
  cycle: function ({ id }) {
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
  else: function ({ figuresAfterIf, resFigures, id, prevId }) {
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
      this.X += configs.spaceX2;
      res = new ElseMove(this.X, this.Y);
    } else {
      this.X = cordinatX(this.idIf, resFigures);
      this.Y = cordinatY(this.idIf, resFigures);
      this.Y += configs.spaceY;
      this.X += configs.spaceX2;
      const { X, Y, editedText } = this;
      res = new Rhombus(X, Y, configs.uniHeight, editedText);
      res.draw();
      ifLines(X, Y, editedText);
      this.X -= configs.spaceX2;
      this.idIf = id;
    }
    return res;
  },
};
export { types, getType };
