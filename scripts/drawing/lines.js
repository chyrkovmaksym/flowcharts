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

const processingMaxLength = (X, Y, rhoWidth) => {
  const yLevel = Y + configs.uniHeight / configs.half;
  const yMove = yLevel + configs.uniHeight;
  const xRhoBorderLeft = X - rhoWidth / configs.half;
  const xRhoBorderRight = X + rhoWidth / configs.half;
  ctx.moveTo(xRhoBorderLeft, yLevel);
  ctx.lineTo(xRhoBorderLeft, yMove);
  ctx.moveTo(xRhoBorderRight, yLevel);
  ctx.lineTo(xRhoBorderRight, yMove);
  ctx.stroke();
}

const processingMidLength = (X, Y, rhoWidth) => {
  const yLevel = Y + configs.uniHeight / configs.half;
  const yMove = yLevel + configs.uniHeight;
  const xRhoBorderLeft = X - rhoWidth / configs.half;
  const xRhoBorderRight = X + rhoWidth / configs.half;
  const xMoveLeft = X - rhoWidth;
  const xMoveRight = X + rhoWidth;
  ctx.moveTo(xRhoBorderLeft, yLevel);
  ctx.lineTo(xMoveLeft, yLevel);
  ctx.lineTo(xMoveLeft, yMove);
  ctx.moveTo(xRhoBorderRight, yLevel);
  ctx.lineTo(xMoveRight, yLevel);
  ctx.lineTo(xMoveRight, yMove);
  ctx.stroke();
}

const processingMinLength = (X, Y, rhoWidth) => {
  const yLevel = Y + configs.uniHeight / configs.half;
  const yMove = yLevel + configs.uniHeight
  const xRhoBorderLeft = X - rhoWidth / configs.half
  const xRhoBorderRight = X + rhoWidth / configs.half
  const xMoveLeft = X - configs.spaceX3;
  const xMoveRight = X + configs.spaceX3;
  ctx.moveTo(xRhoBorderLeft, yLevel);
  ctx.lineTo(xMoveLeft, yLevel);
  ctx.lineTo(xMoveLeft, yMove);
  ctx.moveTo(xRhoBorderRight, yLevel);
  ctx.lineTo(xMoveRight, yLevel);
  ctx.lineTo(xMoveRight, yMove);
  ctx.stroke();
}

const maxlineWithoutElse = (X, Y, ifPrevId, idLoop, idIf, rhoWidth) => {
  const currId = ifPrevId !== 1 && ifPrevId !== idLoop ? ifPrevId : idIf;
  const ifX = cordinatX(currId, resFigures);
  const ifY = cordinatY(currId, resFigures);
  const ifYLevel = ifY + configs.uniHeight / configs.half;
  ctx.moveTo(ifX - rhoWidth / configs.half, ifYLevel);
  ctx.lineTo(ifX - rhoWidth / configs.half, Y);
  ctx.lineTo(X, Y);
  ctx.stroke();
};

const minlineWithoutElse = (X, Y, ifPrevId, idLoop, idIf, rhoWidth) => {
  const currId = ifPrevId !== 1 && ifPrevId !== idLoop ? ifPrevId : idIf;
  const ifX = cordinatX(currId, resFigures);
  const ifY = cordinatY(currId, resFigures);
  const ifYLevel = ifY + configs.uniHeight / configs.half;
  ctx.moveTo(ifX - configs.spaceX3, ifYLevel);
  ctx.lineTo(ifX - configs.spaceX3, Y);
  ctx.lineTo(X, Y);
  ctx.stroke();
}

const midlineWithoutElse = (X, Y, ifPrevId, idLoop, idIf, rhoWidth) => {
  const currId = ifPrevId !== 1 && ifPrevId !== idLoop ? ifPrevId : idIf;
  const ifX = cordinatX(currId, resFigures);
  const ifY = cordinatY(currId, resFigures);
  const ifYLevel = ifY + configs.uniHeight / configs.half;
  ctx.moveTo(ifX - rhoWidth, ifYLevel);
  ctx.lineTo(ifX - rhoWidth, Y);
  ctx.lineTo(X, Y);
  ctx.stroke();
}

export {
  downLine,
  processingMaxLength,
  processingMidLength,
  processingMinLength,
  maxlineWithoutElse,
  minlineWithoutElse,
  midlineWithoutElse,
  horizontalLine
};
