const canvas = document.getElementById('c1');
const context = canvas.getContext('2d');

const configs = {
  sizeAndFont: '20px helvetica',
  xTextMove: 10,
  yTextMove: 30,
  arrowMove: 10,
  toText1: 15,
  toText2: 10,
  uniHeight: 50,
  coordinatX: 500,
  coordinatY: 25,
  spaceY: 75,
  spaceX1: 200,
  spaceX2: 300,
  xNumber: 10,
  yNumber: 5,
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
    return this.text.length * configs.toText1;
  }

  draw() {
    const diameter = 2 * this.radius;
    const halfWidthCordsPlus = this.x + this.width / 2;
    const halfWidthCordsMinus = this.x - this.width / 2;
    context.beginPath();
    context.moveTo(halfWidthCordsMinus + this.radius, this.y);
    context.lineTo(halfWidthCordsPlus - this.radius, this.y);
    context.quadraticCurveTo(
      halfWidthCordsPlus,
      this.y,
      halfWidthCordsPlus,
      this.y + this.radius,
    );
    context.quadraticCurveTo(
      halfWidthCordsPlus,
      this.y + diameter,
      halfWidthCordsPlus - this.radius,
      this.y + diameter,
    );
    context.lineTo(halfWidthCordsMinus + this.radius, this.y + diameter);
    context.quadraticCurveTo(
      halfWidthCordsMinus,
      this.y + diameter,
      halfWidthCordsMinus,
      this.y + this.radius,
    );
    context.quadraticCurveTo(
      halfWidthCordsMinus,
      this.y,
      halfWidthCordsMinus + this.radius,
      this.y,
    );
    context.font = configs.sizeAndFont;
    context.fillText(
      this.text,
      this.x - this.width / 2 + configs.xTextMove,
      this.y + configs.yTextMove,
    );
    context.stroke();
  }
}

class Parallelogram45 {
  constructor(x, y, value, text) {
    this.x = x;
    this.y = y;
    this.height = value;
    this.text = text;
  }

  get width() {
    return 2 * configs.uniHeight + this.text.length * configs.toText2;
  }

  draw() {
    context.beginPath();
    context.moveTo(this.x - this.width / 2 + this.height, this.y);
    context.lineTo(this.x + this.width / 2, this.y);
    context.lineTo(this.x + this.width / 2 - this.height, this.y + this.height);
    context.lineTo(this.x - this.width / 2, this.y + this.height);
    context.lineTo(this.x - this.width / 2 + this.height, this.y);
    context.font = configs.sizeAndFont;
    context.fillText(
      this.text,
      this.x - this.width / 2 + this.height,
      this.y + configs.yTextMove,
    );
    context.stroke();
  }
}

class ElseMove {
  constructor(x, y) {
    this.x = x;
    this.y = y;
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
    context.beginPath();
    context.moveTo(this.x - this.width / 2, this.y);
    context.lineTo(this.x + this.width / 2, this.y);
    context.lineTo(this.x + this.width / 2, this.y + this.height);
    context.lineTo(this.x - this.width / 2, this.y + this.height);
    context.lineTo(this.x - this.width / 2, this.y);
    context.font = configs.sizeAndFont;
    context.fillText(
      this.text,
      this.x - this.width / 2 + configs.xTextMove,
      this.y + configs.yTextMove,
    );
    context.stroke();
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
    return 2 * this.text.length * configs.toText2;
  }

  draw() {
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x + this.width / 2, this.y + this.height / 2);
    context.lineTo(this.x, this.y + this.height);
    context.lineTo(this.x - this.width / 2, this.y + this.height / 2);
    context.lineTo(this.x, this.y);
    context.font = configs.sizeAndFont;
    context.fillText(
      this.text,
      this.x - this.width / 4,
      this.y + configs.yTextMove,
    );
    context.fillText(
      '1',
      this.x - this.width / 2 - configs.xNumber,
      this.y + configs.uniHeight / 2 - configs.yNumber,
    );
    context.fillText(
      '0',
      this.x + this.width / 2,
      this.y + configs.uniHeight / 2 - configs.xNumber,
    );
    context.stroke();
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
    context.beginPath();
    context.moveTo(this.x - this.width / 2 + this.height / 2, this.y);
    context.lineTo(this.x + this.width / 2 - this.height / 2, this.y);
    context.lineTo(this.x + this.width / 2, this.y + this.height / 2);
    context.lineTo(
      this.x + this.width / 2 - this.height / 2,
      this.y + this.height,
    );
    context.lineTo(
      this.x - this.width / 2 + this.height / 2,
      this.y + this.height,
    );
    context.lineTo(this.x - this.width / 2, this.y + this.height / 2);
    context.lineTo(this.x - this.width / 2 + this.height / 2, this.y);
    context.font = configs.sizeAndFont;
    context.fillText(
      this.text,
      this.x - this.width / 2 + this.height / 2,
      this.y + configs.yTextMove,
    );
    context.stroke();
  }
}

class VerticalLine {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  set lengthSet(value) {
    this.length = value;
  }

  draw() {
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x, this.y + this.length);
    context.stroke();
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
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x + this.length, this.y);
    context.stroke();
  }
}

class ArrowDown {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    context.beginPath();
    context.moveTo(this.x - configs.arrowMove, this.y - configs.arrowMove);
    context.lineTo(this.x, this.y);
    context.lineTo(this.x + configs.arrowMove, this.y - configs.arrowMove);
    context.stroke();
  }
}

class ArrowRight {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    context.beginPath();
    context.moveTo(this.x - configs.arrowMove, this.y - configs.arrowMove);
    context.lineTo(this.x, this.y);
    context.lineTo(this.x - configs.arrowMove, this.y + configs.arrowMove);
    context.stroke();
  }
}

class ArrowLeft {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    context.beginPath();
    context.moveTo(this.x + configs.arrowMove, this.y - configs.arrowMove);
    context.lineTo(this.x, this.y);
    context.lineTo(this.x + configs.arrowMove, this.y + configs.arrowMove);
    context.stroke();
  }
}

export {
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
};
