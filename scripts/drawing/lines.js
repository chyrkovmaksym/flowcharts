import { ctx, configs } from './figures.js';

const downLine = (X, Y, space = null) => {
  ctx.moveTo(X, Y + configs.uniHeight);
  ctx.lineTo(X, Y + configs.spaceY + space);
  ctx.stroke();
};

const ifLines = (X, Y, rhoWidth) => {
  console.log('ifLines');
  const yLevel = Y + configs.uniHeight / configs.half;
  ctx.moveTo(X - rhoWidth / configs.half, yLevel);
  if (rhoWidth > configs.spaceX4) ctx.lineTo(X - rhoWidth / configs.half, yLevel + configs.uniHeight);
  else if (rhoWidth < configs.spaceX1) ctx.lineTo(X - configs.spaceX3, yLevel);
  else ctx.lineTo(X - rhoWidth, yLevel);
  if (rhoWidth < configs.spaceX1) ctx.lineTo(X - configs.spaceX3, yLevel + configs.uniHeight);
  else if (rhoWidth < configs.spaceX4) ctx.lineTo(X - rhoWidth, yLevel + configs.uniHeight);
  ctx.moveTo(X + rhoWidth / configs.half, yLevel);
  if (rhoWidth > configs.spaceX4) ctx.lineTo(X + rhoWidth / configs.half, yLevel + configs.uniHeight);
  else if (rhoWidth < configs.spaceX1) ctx.lineTo(X + configs.spaceX3, yLevel);
  else ctx.lineTo(X + rhoWidth, yLevel);
  if (rhoWidth < configs.spaceX1) ctx.lineTo(X + configs.spaceX3, yLevel + configs.uniHeight);
  else if (rhoWidth < configs.spaceX4) ctx.lineTo(X + rhoWidth, yLevel + configs.uniHeight);
  ctx.stroke();
};

const lineWithoutElse = (ifPrevId, idLoop, idIf) => {
  const currId = ifPrevId !== 1 && ifPrevId !== idLoop ? ifPrevId : idIf;
  const ifX = cordinatX(currId);
  const ifY = cordinatY(currId);
  ctx.moveTo(ifX + configs.spaceX2, ifY + configs.uniHeight);
  ctx.lineTo(ifX + configs.spaceX2, Y);
  ctx.lineTo(X, Y);
  ctx.stroke();
};

export { downLine, ifLines, lineWithoutElse };
