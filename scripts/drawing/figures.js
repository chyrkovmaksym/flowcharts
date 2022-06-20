const canvas = document.getElementById('c1');
const ctx = canvas.getContext('2d');

const configs = {
  sizeAndFont: '20px helvetica',
  xTextMove: 10,
  yTextMove: 30,
  arrowMove: 10,
  toText1: 15,
  toText2: 10,
  uniHeight: 50,
  coordinatX: 1100,
  coordinatY: 25,
  spaceY: 75,
  spaceX1: 200,
  spaceX2: 400,
  xNumber: 10,
  yNumber: 5,
  half: 2,
  third: 3,
  quarter: 4,
};

class EllipseRect {
  constructor(x, y, value, text, radius) {
    this.x = x;
    this.y = y;
    this.height = value;
    this.text = text;
    this.radius = radius;
  }

  get width() {
    return this.text.length * configs.toText1 + configs.half * this.radius;
  }

  draw() {
    const diameter = configs.half * this.radius;
    const halfWidthCordsPlus = this.x + this.width / configs.half;
    const halfWidthCordsMinus = this.x - this.width / configs.half;
    const right = halfWidthCordsMinus + this.radius;
    const left = halfWidthCordsPlus - this.radius;
    const yLevel = this.y + this.radius;
    const yDiameter = this.y + diameter;
    ctx.beginPath();
    ctx.moveTo(right, this.y);
    ctx.lineTo(left, this.y);
    ctx.quadraticCurveTo(
      halfWidthCordsPlus,
      this.y,
      halfWidthCordsPlus,
      yLevel,
    );
    ctx.quadraticCurveTo(
      halfWidthCordsPlus,
      yDiameter,
      left,
      yDiameter,
    );
    ctx.lineTo(right, yDiameter);
    ctx.quadraticCurveTo(
      halfWidthCordsMinus,
      yDiameter,
      halfWidthCordsMinus,
      yLevel,
    );
    ctx.quadraticCurveTo(
      halfWidthCordsMinus,
      this.y,
      right,
      this.y,
    );
    ctx.font = configs.sizeAndFont;
    ctx.fillText(
      this.text,
      this.x - this.width / configs.half + this.radius,
      this.y + configs.yTextMove,
    );
    ctx.stroke();
  }
}

class Parallelogram45 { // arallelogram with 45 degree angle
  constructor(x, y, value, text) {
    this.x = x;
    this.y = y;
    this.height = value;
    this.text = text;
  }

  get width() {
    return configs.half * configs.uniHeight + this.text.length * configs.toText2;
  }

  draw() {
    const halfWidthCordsPlus = this.x + this.width / configs.half;
    const halfWidthCordsMinus = this.x - this.width / configs.half;
    ctx.beginPath();
    ctx.moveTo(halfWidthCordsMinus + this.height, this.y);
    ctx.lineTo(halfWidthCordsPlus, this.y);
    ctx.lineTo(halfWidthCordsPlus - this.height, this.y + this.height);
    ctx.lineTo(halfWidthCordsMinus, this.y + this.height);
    ctx.lineTo(halfWidthCordsMinus + this.height, this.y);
    ctx.font = configs.sizeAndFont;
    ctx.fillText(
      this.text,
      halfWidthCordsMinus + this.height,
      this.y + configs.yTextMove,
    );
    ctx.stroke();
  }
}

class Rectangle {
  constructor(x, y, value, text) {
    this.x = x;
    this.y = y;
    this.height = value;
    this.text = text;
  }

  get width() {
    return 2 * configs.xTextMove + this.text.length * configs.toText2;
  }

  draw() {
    const halfWidthCordsPlus = this.x + this.width / configs.half;
    const halfWidthCordsMinus = this.x - this.width / configs.half;
    ctx.beginPath();
    ctx.moveTo(halfWidthCordsMinus, this.y);
    ctx.lineTo(halfWidthCordsPlus, this.y);
    ctx.lineTo(halfWidthCordsPlus, this.y + this.height);
    ctx.lineTo(halfWidthCordsMinus, this.y + this.height);
    ctx.lineTo(halfWidthCordsMinus, this.y);
    ctx.font = configs.sizeAndFont;
    ctx.fillText(
      this.text,
      halfWidthCordsMinus + configs.xTextMove,
      this.y + configs.yTextMove,
    );
    ctx.stroke();
  }
}

class Rhombus {
  constructor(x, y, value, text) {
    this.x = x;
    this.y = y;
    this.height = value;
    this.text = text;
  }

  get width() {
    return configs.half * this.text.length * configs.toText2;
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.width / configs.half, this.y + this.height / configs.half);
    ctx.lineTo(this.x, this.y + this.height);
    ctx.lineTo(this.x - this.width / configs.half, this.y + this.height / configs.half);
    ctx.lineTo(this.x, this.y);
    ctx.font = configs.sizeAndFont;
    ctx.fillText(
      this.text,
      this.x - this.width / configs.quarter,
      this.y + configs.yTextMove,
    );
    ctx.fillText(
      '1',
      this.x - this.width / configs.half - configs.xNumber,
      this.y + configs.uniHeight / configs.half - configs.yNumber,
    );
    ctx.fillText(
      '0',
      this.x + this.width / configs.half,
      this.y + configs.uniHeight / configs.half - configs.xNumber,
    );
    ctx.stroke();
  }
}

class Hexagon {
  constructor(x, y, value, text) {
    this.x = x;
    this.y = y;
    this.height = value;
    this.text = text;
  }

  get width() {
    return this.text.length * configs.toText2 + configs.uniHeight;
  }

  draw() {
    const halfWidthCordsPlus = this.x + this.width / configs.half;
    const halfWidthCordsMinus = this.x - this.width / configs.half;
    ctx.beginPath();
    ctx.moveTo(halfWidthCordsMinus + this.height / configs.half, this.y);
    ctx.lineTo(halfWidthCordsPlus - this.height / configs.half, this.y);
    ctx.lineTo(halfWidthCordsPlus, this.y + this.height / configs.half);
    ctx.lineTo(
      halfWidthCordsPlus - this.height / configs.half,
      this.y + this.height,
    );
    ctx.lineTo(
      this.x - this.width / configs.half + this.height / configs.half,
      this.y + this.height,
    );
    ctx.lineTo(halfWidthCordsMinus, this.y + this.height / configs.half);
    ctx.lineTo(halfWidthCordsMinus + this.height / configs.half, this.y);
    ctx.font = configs.sizeAndFont;
    ctx.fillText(
      this.text,
      halfWidthCordsMinus + this.height / configs.half,
      this.y + configs.yTextMove,
    );
    ctx.stroke();
  }
}

class ElseMove {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// Can be deleted in the future
class VerticalLine {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  set lengthSet(value) {
    this.length = value;
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.length);
    ctx.stroke();
  }
}

class HorizontalLine {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  set lengthSet(value) {
    this.length = value;
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.length, this.y);
    ctx.stroke();
  }
}

class ArrowDown {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x - configs.arrowMove, this.y - configs.arrowMove);
    ctx.lineTo(this.x, this.y);
    ctx.lineTo(this.x + configs.arrowMove, this.y - configs.arrowMove);
    ctx.stroke();
  }
}

class ArrowRight {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x - configs.arrowMove, this.y - configs.arrowMove);
    ctx.lineTo(this.x, this.y);
    ctx.lineTo(this.x - configs.arrowMove, this.y + configs.arrowMove);
    ctx.stroke();
  }
}

class ArrowLeft {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x + configs.arrowMove, this.y - configs.arrowMove);
    ctx.lineTo(this.x, this.y);
    ctx.lineTo(this.x + configs.arrowMove, this.y + configs.arrowMove);
    ctx.stroke();
  }
}

export {
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
};
