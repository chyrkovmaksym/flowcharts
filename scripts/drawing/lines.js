import { ctx, configs } from "./figures.js";
import { cordinatX, cordinatY } from "./config.js";
import { resFigures } from "./drawingfunction.js";

const horizontalLine = (X, Y, space = null) => {
  ctx.moveTo(X, Y);
  ctx.lineTo(X + space, Y);
  ctx.stroke();
};

const downLine = (X, Y, space = null) => {
  ctx.moveTo(X, Y + configs.uniHeight);
  ctx.lineTo(X, Y + configs.spaceY + space);
  ctx.stroke();
};

const ifLines = (X, Y, rhoWidth) => {
  const yLevel = Y + configs.uniHeight / configs.half;
  ctx.moveTo(X - rhoWidth / configs.half, yLevel);
  if (rhoWidth >= configs.spaceX4)
    ctx.lineTo(X - rhoWidth / configs.half, yLevel + configs.uniHeight);
  else if (rhoWidth <= configs.spaceX1) ctx.lineTo(X - configs.spaceX3, yLevel);
  else ctx.lineTo(X - rhoWidth, yLevel);
  if (rhoWidth <= configs.spaceX1)
    ctx.lineTo(X - configs.spaceX3, yLevel + configs.uniHeight);
  else if (rhoWidth < configs.spaceX4)
    ctx.lineTo(X - rhoWidth, yLevel + configs.uniHeight);
  ctx.moveTo(X + rhoWidth / configs.half, yLevel);
  if (rhoWidth >= configs.spaceX4)
    ctx.lineTo(X + rhoWidth / configs.half, yLevel + configs.uniHeight);
  else if (rhoWidth <= configs.spaceX1) ctx.lineTo(X + configs.spaceX3, yLevel);
  else ctx.lineTo(X + rhoWidth, yLevel);
  if (rhoWidth <= configs.spaceX1)
    ctx.lineTo(X + configs.spaceX3, yLevel + configs.uniHeight);
  else if (rhoWidth < configs.spaceX4)
    ctx.lineTo(X + rhoWidth, yLevel + configs.uniHeight);
  ctx.stroke();
};

const lineWithoutElse = (X, Y, ifPrevId, idLoop, idIf, rhoWidth) => {
  const currId = ifPrevId !== 1 && ifPrevId !== idLoop ? ifPrevId : idIf;
  console.log(currId);
  console.log(resFigures);
  const ifX = cordinatX(currId, resFigures);
  const ifY = cordinatY(currId, resFigures);
  const ifYLevel = ifY + configs.uniHeight / 2;
  if (rhoWidth > configs.spaceX4)
    ctx.moveTo(X - rhoWidth / configs.half, ifYLevel);
  else if (rhoWidth < configs.spaceX1)
    ctx.moveTo(ifX - configs.spaceX3, ifYLevel);
  else ctx.moveTo(X - rhoWidth, ifYLevel);
  if (rhoWidth > configs.spaceX4) ctx.line.to(X - rhoWidth / configs.half, Y);
  else if (rhoWidth < configs.spaceX1) ctx.lineTo(ifX - configs.spaceX3, Y);
  else ctx.moveTo(X - rhoWidth, Y);
  ctx.lineTo(X, Y);
  ctx.stroke();
};

export { downLine, ifLines, lineWithoutElse, horizontalLine };
