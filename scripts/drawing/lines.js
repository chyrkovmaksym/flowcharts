import { ctx, configs } from './figures.js';

const downLine = (X, Y, space = null) => {
  ctx.moveTo(X, Y + configs.uniHeight);
  ctx.lineTo(X, Y + configs.spaceY + space);
  ctx.stroke();
};

const ifLines = (X, Y, text) => {
  console.log('ifLines');
  const yLevel = Y + configs.uniHeight / 2;
  ctx.moveTo(X - text.length * configs.toText2, yLevel);
  ctx.lineTo(X - configs.spaceX2, yLevel);
  ctx.lineTo(X - configs.spaceX2, yLevel + configs.uniHeight);
  ctx.moveTo(X + text.length * configs.toText2, yLevel);
  ctx.lineTo(X + configs.spaceX2, yLevel);
  ctx.lineTo(X + configs.spaceX2, yLevel + configs.uniHeight);
  ctx.stroke();
};

const lineWithoutElse = (ifPrevId, idLoop, idIf) => {
  let currId = ifPrevId !== 1 && ifPrevId !== idLoop ? ifPrevId : idIf;
  const ifX = cordinatX(currId);
  const ifY = cordinatY(currId);
  ctx.moveTo(ifX + configs.spaceX2, ifY + configs.uniHeight);
  ctx.lineTo(ifX + configs.spaceX2, Y);
  ctx.lineTo(X, Y);
  ctx.stroke();
};

export { downLine, ifLines, lineWithoutElse };
