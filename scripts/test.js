'use strict';

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
};

class EllipseRect {
  //Begin, End, Error
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  set radiusSet(value) {
    this.radius = value;
  }
  set widthSet(value) {
    this.width = value;
  }
  set textSet(value) {
    this.text = value;
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
      this.y + this.radius
    );
    context.quadraticCurveTo(
      halfWidthCordsPlus,
      this.y + diameter,
      halfWidthCordsPlus - this.radius,
      this.y + diameter
    );
    context.lineTo(halfWidthCordsMinus + this.radius, this.y + diameter);
    context.quadraticCurveTo(
      halfWidthCordsMinus,
      this.y + diameter,
      halfWidthCordsMinus,
      this.y + this.radius
    );
    context.quadraticCurveTo(
      halfWidthCordsMinus,
      this.y,
      halfWidthCordsMinus + this.radius,
      this.y
    );
    context.font = configs.sizeAndFont;
    context.fillText(
      this.text,
      this.x - this.width / 2 + configs.xTextMove,
      this.y + configs.yTextMove
    );
    context.stroke();
  }
}

class Parallelogram45 {
  // 45 degree angle
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  set heightSet(value) {
    this.height = value;
  }
  set widthSet(value) {
    this.width = value;
  }
  set textSet(value) {
    this.text = value;
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
      this.y + configs.yTextMove
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

// смещение текста для этой фигуры пока хз, надо протестить и посмотреть, что карсиво /////////////////////////////////////////////////////////

class Rectangle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  set heightSet(value) {
    this.height = value;
  }
  set widthSet(value) {
    this.width = value;
  }
  set textSet(value) {
    this.text = value;
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
      this.x - this.width / 2,
      this.y + configs.yTextMove
    );
    context.stroke();
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Hexsagon {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  set heightSet(value) {
    this.height = value;
  }
  set widthSet(value) {
    this.width = value;
  }
  set textSet(value) {
    this.text = value;
  }
  draw() {
    context.beginPath();
    context.moveTo(this.x - this.width / 2 + this.height / 2, this.y);
    context.lineTo(this.x + this.width / 2 - this.height / 2, this.y);
    context.lineTo(this.x + this.width / 2, this.y + this.height / 2);
    context.lineTo(
      this.x + this.width / 2 - this.height / 2,
      this.y + this.height
    );
    context.lineTo(
      this.x - this.width / 2 + this.height / 2,
      this.y + this.height
    );
    context.lineTo(this.x - this.width / 2, this.y + this.height / 2);
    context.lineTo(this.x - this.width / 2 + this.height / 2, this.y);
    context.font = configs.sizeAndFont;
    context.fillText(
      this.text,
      this.x - this.width / 2 + this.height / 2,
      this.y + configs.yTextMove
    );
    context.stroke();
  }
}

class Rhombus {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  set heightSet(value) {
    this.hight = value;
  }
  set widthSet(value) {
    this.width = value;
  }
  set textSet(value) {
    this.text = value;
  }
  draw() {
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x + this.width / 2, this.y + this.hight / 2);
    context.lineTo(this.x, this.y + this.hight);
    context.lineTo(this.x - this.width / 2, this.y + this.hight / 2);
    context.lineTo(this.x, this.y);
    context.font = configs.sizeAndFont;
    context.fillText(
      this.text,
      this.x - this.width / 4,
      this.y + configs.yTextMove
    );
    context.stroke();
  }
}

//с ними пока хз/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

const res = [
  { type: 'main', text: 'Begin', id: 1, prevId: 0 }, //ellipseRect
  { type: 'print/scan', text: 'scanf("%d", &a)', id: 2, prevId: 1 }, //parallelogram
  { type: 'for', text: '(int i = 0; i<a; i++)', id: 3, prevId: 2 }, //hexsagon
  { type: 'if', text: '(i<5)', id: 4, prevId: 3 }, //rhombus
  { type: 'print/scan', text: 'printf("less then 5")', id: 5, prevId: 4 }, //parallelogram
  { type: 'else', text: '', id: 6, prevId: 4 },
  { type: 'print/scan', text: 'printf("more then 5")', id: 7, prevId: 6 }, //parallelogram
  { type: 'while', text: '(true)', id: 8, prevId: 6 }, // //rhombus
  { type: 'print/scan', text: 'scanf("%d", &a)', id: 9, prevId: 8 }, //parallelogram
  //{ type: 'printf/scan', text: 'End', id: 2, prevId: 8 }, //parallelogram
];
const res3 = [
  { type: 'main', text: 'Begin', id: 1, prevId: 0 },
  { type: 'variable def', text: 'float x;', id: 2, prevId: 1 },
  { type: 'print/scan', text: 'printf("Enter x: \\n");', id: 3, prevId: 1 },
  { type: 'print/scan', text: 'scanf("%f", &x);', id: 4, prevId: 1 },
  { type: 'if', text: 'x>=-49 && x<-10', id: 5, prevId: 1 },
  { type: 'expression', text: 'x=10*x*x*x+7*x/5+2;', id: 6, prevId: 5 },
  { type: 'print/scan', text: 'printf("%f", x);', id: 7, prevId: 5 },
  { type: 'else', text: '', id: 8, prevId: 5 },
  { type: 'if', text: '(x>20)', id: 9, prevId: 5 },
  { type: 'expression', text: 'x=-x+9;', id: 10, prevId: 9 },
  { type: 'print/scan', text: 'printf("%f", x);', id: 11, prevId: 9 },
  { type: 'else', text: '', id: 12, prevId: 9 }, //якесь else має передаватись
  { type: 'print/scan', text: 'no value', id: 13, prevId: 9 },
  { type: 'expression', text: 'return 0;', id: 14, prevId: 1 },
  { type: 'for', text: '(i = 1; i < 11; ++i)', id: 15, prevId: 1 },
  { type: 'print/scan', text: 'printf("%d ", i);', id: 16, prevId: 15 },
  { type: 'expression', text: 'return 0;', id: 17, prevId: 15 },
  { type: 'end', text: 'End ', id: 18, prevId: 1 },
];

const res4 = [
  { type: 'main', text: 'Begin', id: 1, prevId: 0 },
  { type: 'variable def', text: 'int i;', id: 2, prevId: 1 },
  { type: 'for', text: '(i = 1; i < 11; ++i)', id: 3, prevId: 1 },
  { type: 'print/scan', text: 'printf("%d ", i);', id: 4, prevId: 3 },
  { type: 'expression', text: 'return 0;', id: 5, prevId: 1 },
  { type: 'if', text: '(i>5)', id: 6, prevId: 1 },
  { type: 'print/scan', text: 'printf("%d ", i);', id: 7, prevId: 6 },
  // у всіх елементах під if та відповідному else завжди prevId = idIf
  { type: 'expression', text: 'const a=0;', id: 8, prevId: 6 },
  { type: 'expression', text: 'a+3;', id: 9, prevId: 6 },
  { type: 'else', text: '', id: 10, prevId: 6 }, //завжди при виході з If був об'єкт else

  //позамовчуванню був End // елементи що не відносяться до цикла, ifа prevId=1
];
const res5 = [
  { type: 'main', text: '(Begin)', id: 1, prevId: 0 },
  { type: 'variable def', text: 'int i;', id: 2, prevId: 1 },
  { type: 'for', text: '(i = 1; i < 11; ++i)', id: 3, prevId: 1 },
  { type: 'print/scan', text: 'printf("%d ", i);', id: 4, prevId: 3 },
  { type: 'if', text: '(x<8)', id: 5, prevId: 3 },
  { type: 'print/scan', text: 'printf("%d ", i);', id: 6, prevId: 5 },
  { type: 'expression', text: 'return 0;', id: 7, prevId: 1 },
  { type: 'if', text: '(i>5)', id: 8, prevId: 1 },
  { type: 'print/scan', text: 'printf("%d ", i);', id: 9, prevId: 8 },
  { type: 'expression', text: 'const a=0;', id: 10, prevId: 8 },
  { type: 'expression', text: 'a+3;', id: 11, prevId: 8 },
  { type: 'else', text: '', id: 12, prevId: 8 },
  { type: 'else', text: '', id: 13, prevId: 5 },
  { type: 'end', text: 'End ', id: 14, prevId: 1 },
];

const res6 = [
  { type: 'main', text: '(Begin)', id: 1, prevId: 0 },
  { type: 'variable def', text: 'int i;', id: 2, prevId: 1 },
  { type: 'for', text: '(i = 1; i < 11; ++i)', id: 3, prevId: 1 },
  { type: 'print/scan', text: 'printf("%d ", i);', id: 4, prevId: 3 },
  { type: 'print/scan', text: 'printf("%d ", i);', id: 5, prevId: 3 },
  { type: 'if', text: '(i>5)', id: 6, prevId: 1 },
  { type: 'print/scan', text: 'printf("%d ", i);', id: 7, prevId: 6 },
  { type: 'expression', text: 'const a=0;', id: 8, prevId: 6 },
  { type: 'if', text: '(x < 9)', id: 9, prevId: 6 },
  { type: 'expression', text: 'const b = x;', id: 10, prevId: 9 },
  { type: 'else', text: '', id: 11, prevId: 6 },
  { type: 'expression', text: 'const b = x-1;', id: 12, prevId: 11 },
  { type: 'expression', text: 'a+3;', id: 13, prevId: 6 },
  { type: 'end', text: 'End ', id: 14, prevId: 1 },
];
const res7 = [
  { type: 'main', text: '(Begin)', id: 1, prevId: 0 },
  { type: 'variable def', text: 'float x;', id: 2, prevId: 1 },
  { type: 'print/scan', text: 'printf("Enter x: \\n");', id: 3, prevId: 1 },
  { type: 'print/scan', text: 'scanf("%f", &x);', id: 4, prevId: 1 },
  { type: 'if', text: 'x<-10 || x>0 && x<=10)', id: 5, prevId: 1 },
  { type: 'expression', text: 'x=10*x*x*x+7*x/5+2;', id: 6, prevId: 5 },
  { type: 'print/scan', text: 'printf("%f", x);', id: 7, prevId: 5 },
  { type: 'if', text: '(x>20)', id: 8, prevId: 1 },
  { type: 'expression', text: 'x=-x+9;', id: 9, prevId: 8 },
  { type: 'print/scan', text: 'printf("%f", x);', id: 10, prevId: 8 },
  { type: 'else', text: '', id: 11, prevId: 1 },
  { type: 'expression', text: 'return 0;', id: 12, prevId: 11 },
  { type: 'end', text: 'End ', id: 13, prevId: 1 },
];
const res8 = [
  { type: 'main', text: '(Begin)', id: 1, prevId: 0 },
  { type: 'variable def', text: 'int i;', id: 2, prevId: 1 },
  { type: 'for', text: '(i = 1; i < 11; ++i)', id: 3, prevId: 1 },
  { type: 'print/scan', text: 'printf("%d ", i);', id: 4, prevId: 3 },
  { type: 'if', text: '(x < 9)', id: 5, prevId: 3 },
  { type: 'expression', text: 'const b = x;', id: 6, prevId: 5 },
  { type: 'print/scan', text: 'printf("%d ", i);', id: 7, prevId: 3 },
  { type: 'if', text: '(i>5)', id: 8, prevId: 1 },
  { type: 'print/scan', text: 'printf("%d ", i);', id: 9, prevId: 8 },
  { type: 'expression', text: 'const a=0;', id: 10, prevId: 8 },
  { type: 'if', text: '(x < 9)', id: 11, prevId: 8 },
  { type: 'expression', text: 'const b = x;', id: 12, prevId: 11 },
  { type: 'else', text: '', id: 13, prevId: 8 },
  { type: 'expression', text: 'const b = x-1;', id: 14, prevId: 13 },
  { type: 'expression', text: 'a+3;', id: 15, prevId: 8 },
  { type: 'expression', text: 'a+3;', id: 16, prevId: 1 },
];
const res9 = [
  { type: 'main', text: '()', id: 1, prevId: 0 },
  { type: 'variable def', text: 'int i;', id: 2, prevId: 1 },
  { type: 'for', text: '(i = 1; i < 11; ++i)', id: 3, prevId: 1 },
  { type: 'print/scan', text: 'printf("%d ", i);', id: 4, prevId: 3 },
  { type: 'expression', text: 'return 0;', id: 5, prevId: 1 },
  { type: 'if', text: '(i>5)', id: 6, prevId: 1 },
  { type: 'for', text: '(i = 1; i < 11; ++i)', id: 7, prevId: 6 },
  { type: 'print/scan', text: 'printf("%d ", i);', id: 8, prevId: 7 },
  { type: 'else', text: '', id: 9, prevId: 1 },
  { type: 'print/scan', text: 'printf("%d ", i);', id: 10, prevId: 9 },
  { type: 'expression', text: 'const a=0;', id: 11, prevId: 9 },
  { type: 'expression', text: 'a+3;', id: 12, prevId: 9 },
  { type: 'end', text: 'End ', id: 13, prevId: 1 },
];
// #include <stdio.h>

// int main() {
//   int i;
//    for (i = 1; i < 11; ++i){
//     printf("%d ", i);
//   }
//   return 0;
//   if(i>5){
//    printf("%d ", i);
//    const a=0;
//    a+3;
//   }
// }
//start position
//  { type: 'end', text: 'End ', id: 11, prevId: 1 },
let X = 600;
let Y = 25;
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

//виходить з else
const afterIf = (id, prevId, X, Y, idFor, idIf, ifPrevId, idElse) => {
  console.log(id);
  figuresAfterIf.push(resFigures[id - 2]);
  X = cordinatX(prevId);
  Y = cordinatY(prevId);
  if (prevId != 1 && prevId != idFor) X -= 200;
  for (const figure of figuresAfterIf) {
    //знаходить найнижчий Y
    if (figure.y > Y) Y = figure.y;
  }
  for (const figure of figuresAfterIf) {
    //малює з'єднання
    const currY = figure.y + configs.uniHeight;
    const currX = figure.x;
    context.moveTo(currX, currY);
    context.lineTo(currX, Y + H);
    context.lineTo(X, Y + H);
    context.stroke();
  }
  //вертикальне з'єднання
  context.moveTo(X, Y + configs.uniHeight + H / 3);
  context.lineTo(X, Y + H * 2);
  context.stroke();
  Y += H;
  if (idElse == null && figuresAfterIf[0].x <= 500) {
    //просто хз
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
  if (flagIfFor != 'false') {
    //якщо в for був if
    X += 200;
    Y += 25;
  }
  Y += H;
  context.moveTo(X, Y);
  if (flagIfFor != 'false') X -= 150;
  context.lineTo(X - 200, Y);
  let forX = cordinatX(idFor);
  let forY = cordinatY(idFor);
  context.lineTo(X - 200, forY + configs.uniHeight / 2);
  context.lineTo(forX - 100, forY + configs.uniHeight / 2);
  context.moveTo(forX + 100, forY + configs.uniHeight / 2);
  if (flagIfFor != 'false') forX += 150;
  context.lineTo(forX + 200, forY + configs.uniHeight / 2);
  context.lineTo(forX + 200, Y + 25);
  if (flagIfFor != 'false') forX -= 150;
  context.lineTo(forX, Y + 25);
  if (flagIfFor != 'false') Y -= 25;
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
  let flagIfFor = 'false';
  let idFor = null;
  let idIf = null;
  let ifPrevId = null;
  let idElse = null;
  for (const obj of array) {
    const type = obj.type;
    const text = obj.text;
    const id = obj.id;
    const prevId = obj.prevId;
    // console.log(id);
    // console.log(X);
    // console.log(Y);
    //розпізнавання For
    if (idFor !== null && prevId !== idFor && prevId !== idIf) {
      const currCordinats = afterFor(X, Y, idFor, flagIfFor);
      X = currCordinats.X;
      Y = currCordinats.Y;
      idFor = null;
      flagIfFor = 'false';
    }
    if (prevId !== idIf && prevId !== idElse) flagIf = 'end';
    if (
      flagIf === 'end' &&
      idIf !== null &&
      prevId !== idElse &&
      type !== 'else' &&
      prevId !== idFor
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
        idElse
      );
      X = currCordinats.X;
      Y = currCordinats.Y;
      idElse = null;
      flagIf = 'end';
    }
    if (type === 'main' || type === 'end') {
      if (type === 'end') Y += H;
      const ellipseRect = new EllipseRect(X, Y, id, prevId);
      ellipseRect.textSet = obj.text;
      ellipseRect.radiusSet = configs.uniHeight / 2;
      ellipseRect.widthSet = text.length * configs.toText1;
      ellipseRect.draw();
      //context.beginPath();
      if (type === 'main') drowLine(X, Y);
      resFigures.push(ellipseRect);
    } else if (
      type == 'print/scan' ||
      type == 'variable def' ||
      type == 'expression'
    ) {
      Y += H;
      const parallelogram = new Parallelogram45(X, Y);
      parallelogram.textSet = obj.text;
      parallelogram.heightSet = configs.uniHeight;
      parallelogram.widthSet =
        2 * configs.uniHeight + text.length * configs.toText2;
      parallelogram.draw();
      resFigures.push(parallelogram);
      drowLine(X, Y);
    } else if (type === 'if') {
      if (idFor != null) flagIfFor = 'true';
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
      figuresAfterIf.push(resFigures[id - 2]); //так як id з 1 починається і попередній
      //бере кординати в залежності від того що закрили
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
      //else if(array.length)
    }
  }
  resFigures.length = null;
}
finder(res9, X, Y);
console.log(resFigures);
console.log(figuresAfterIf);
