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
  startX: 1000,
  startY: 50,
  classicHeight: 75,
  lineLength: 200
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
      this.x - this.width / 2 + configs.xTextMove,
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
  { type: 'main', text: 'Begin', id: 1, prevId: 0 },
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
];

const endPrevId = res5.find(item => item.prevId === 0);

res5.push({
  type: 'end', text: 'End',id: res5.length + 1, prevId: endPrevId.id 
});

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

//let X = 1000;
//let Y = 50;
//const H = 75;
let flagIf = 'start';
let idFor = null;
let idIf = null;
const resFigures = new Array();
const figuresAfterIf = new Array();

const cordinatX = (prevId) => resFigures[prevId - 1].x;

const cordinatY = (prevId) => resFigures[prevId - 1].y;

//виходить з else
const afterIf = (id) => {
  //-1 - тільки після else буде виконуватись
  figuresAfterIf.push(resFigures[id - 2]); //останній елемент справа
  configs.startX = cordinatX(1);
  configs.startY = cordinatY(1);
  let lastY = 0;
  for (const figure of figuresAfterIf) {
    //знаходить найнижчий Y
    const currY = figure.y;
    if (currY > lastY) {
      lastY = currY;
    }
  }
  configs.startY = lastY;
  for (const figure of figuresAfterIf) {
    //малює з'єднання
    const currY = figure.y + configs.uniHeight;
    const currX = figure.x;
    context.moveTo(currX, currY);
    context.lineTo(currX, configs.startY + configs.classicHeight);
    context.lineTo(configs.startX, configs.startY + configs.classicHeight);
    context.stroke();
  }
  context.moveTo(configs.startX,
    configs.startY + configs.uniHeight + configs.classicHeight / 3
  );
  context.lineTo(configs.startX, configs.startY + configs.classicHeight * 2);
  context.stroke();
  flagIf = 'start';
  //малюєм
  configs.startY = lastY + configs.classicHeight;
};

function finder(array) {
  for (const obj of array) {
    const type = obj.type;
    const text = obj.text;
    const id = obj.id;
    const prevId = obj.prevId;
    //розпізнавання For
    if (idFor !== null) {
      if (prevId === idFor && type === 'if') {
        idIf = id;
      }
      if (prevId !== idFor && prevId !== idIf) {
        console.log(id);
        const lastFigureFor = resFigures[id - 2];
        idIf = null;
        idFor = null;
        console.log(lastFigureFor);
      }
    }
    if (id !== 1 && prevId === 1 && flagIf === 'end') afterIf(id);
    if (type === 'main' || type === 'end') {
      if (type === 'end') {
        configs.startY += configs.classicHeight;
        const arrowDown = new ArrowDown(configs.startX, configs.startY);
        arrowDown.draw();
      }
      const ellipseRect = new EllipseRect(
        configs.startX, configs.startY,
        id,
        prevId
      );
      ellipseRect.textSet = obj.text;
      ellipseRect.radiusSet = configs.uniHeight / 2;
      ellipseRect.widthSet = text.length * configs.toText1 + configs.xTextMove;
      ellipseRect.draw();
      resFigures.push(ellipseRect);
      context.beginPath();
      if (type === 'main') {
        context.moveTo(configs.startX, configs.startY + configs.uniHeight);
        context.lineTo(configs.startX, configs.startY + configs.classicHeight);
        context.stroke();
      }
    } else if (
      type === 'print/scan' ||
      type === 'variable def'
    ) {
      configs.startY += configs.classicHeight;
      const arrowDown = new ArrowDown(configs.startX, configs.startY);
      arrowDown.draw();
      const parallelogram = new Parallelogram45(configs.startX, configs.startY);
      parallelogram.textSet = obj.text;
      parallelogram.heightSet = configs.uniHeight;
      parallelogram.widthSet =
        2 * configs.uniHeight + text.length * configs.toText2;
      parallelogram.draw();
      resFigures.push(parallelogram);
      context.moveTo(configs.startX, configs.startY + configs.uniHeight);
      context.lineTo(configs.startX, configs.startY + configs.classicHeight);
      context.stroke();
    } else if (
      type === 'expression'
    ) {
      configs.startY += configs.classicHeight;
      const arrowDown = new ArrowDown(configs.startX, configs.startY);
      arrowDown.draw();
      const rectangle = new Rectangle(configs.startX, configs.startY);
      rectangle.textSet = obj.text;
      rectangle.heightSet = configs.uniHeight;
      rectangle.widthSet =
        text.length * configs.toText2 + configs.xTextMove;
      rectangle.draw();
      resFigures.push(rectangle);
      context.moveTo(configs.startX, configs.startY + configs.uniHeight);
      context.lineTo(configs.startX, configs.startY + configs.classicHeight);
      context.stroke();
    } else if (type === 'if') {
      configs.startY += configs.classicHeight;
      const arrowDown = new ArrowDown(configs.startX, configs.startY);
      arrowDown.draw();
      const rhombus = new Rhombus(configs.startX, configs.startY);
      rhombus.textSet = obj.text;
      rhombus.heightSet = configs.uniHeight;
      rhombus.widthSet = 2 * (text.length * configs.toText2);
      rhombus.draw();
      resFigures.push(rhombus);
      context.moveTo(
        configs.startX - text.length * configs.toText2,
        configs.startY + configs.uniHeight / 2
      );
      context.lineTo(
        configs.startX - configs.lineLength,
        configs.startY + configs.uniHeight / 2
      );
      context.lineTo(
        configs.startX - configs.lineLength,
        configs.startY + configs.uniHeight / 2 + configs.uniHeight
      );
      context.moveTo(
        configs.startX + text.length * 10,
        configs.startY + configs.uniHeight / 2
      );
      context.lineTo(
        configs.startX + configs.lineLength,
        configs.startY + configs.uniHeight / 2
      );
      context.lineTo(
        configs.startX + configs.lineLength,
        configs.startY + configs.uniHeight / 2 + configs.uniHeight
      );
      /*context.lineTo(X - configs.lineLength,
        Y + configs.uniHeight / 2 + configs.uniHeight
      );*/
      context.stroke();
      configs.startX -= configs.lineLength;
    } else if (type === 'for') {
      idFor = id;
      configs.startY += configs.classicHeight;
      const arrowDown = new ArrowDown(configs.startX, configs.startY);
      arrowDown.draw();
      const hexsagon = new Hexsagon(configs.startX, configs.startY);
      hexsagon.textSet = obj.text;
      hexsagon.heightSet = configs.uniHeight;
      hexsagon.widthSet = text.length * configs.toText2;
      hexsagon.draw();
      resFigures.push(hexsagon);
      context.moveTo(configs.startX, configs.startY + configs.uniHeight);
      context.lineTo(configs.startX, configs.startY + configs.classicHeight);
      context.stroke();
    } else if (type === 'else') {
      figuresAfterIf.push(resFigures[id - 2]);
      //так як id з 1 починається і попередній
      flagIf = 'end';
      configs.startX = cordinatX(prevId);
      configs.startY = cordinatY(prevId);
      configs.startX += 200;
      const elseEllement = new ElseMove(configs.startX, configs.startY);
      //console.log(elseEllement);
      resFigures.push(elseEllement);
    } else if (type === 'while') {
      configs.startY += configs.classicHeight;
      const rhombus = new Rhombus(configs.startX, configs.startY);
      rhombus.textSet = obj.text;
      rhombus.heightSet = configs.uniHeight;
      rhombus.widthSet = 2 * (text.length * configs.toText2);
      rhombus.draw();
      resFigures.push(rhombus);
    }
  }
}
finder(res5);
