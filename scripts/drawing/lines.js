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

const processingLength = (X, Y, rhoWidth) => {
  const yLevel = Y + configs.uniHeight / configs.half;
  const yMove = yLevel + configs.uniHeight;
  const xRhoBorderLeft = X - rhoWidth / configs.half;
  const xRhoBorderRight = X + rhoWidth / configs.half;
  let xMoveLeft;
  let xMoveRight;

  if (rhoWidth >= configs.spaceX4) {
    X += rhoWidth / configs.half;
  } else if (rhoWidth <= configs.spaceX1) {
    xMoveLeft = X - configs.spaceX3;
    xMoveRight = X + configs.spaceX3;
    X += configs.spaceX3;
  } else {
    xMoveLeft = X - rhoWidth;
    xMoveRight = X + rhoWidth;
    X += rhoWidth;
  }

  if (rhoWidth >= configs.spaceX4) {
    ctx.moveTo(xRhoBorderLeft, yLevel);
    ctx.lineTo(xRhoBorderLeft, yMove);
    ctx.moveTo(xRhoBorderRight, yLevel);
    ctx.lineTo(xRhoBorderRight, yMove);
    ctx.stroke();
  } else {
    ctx.moveTo(xRhoBorderLeft, yLevel);
    ctx.lineTo(xMoveLeft, yLevel);
    ctx.lineTo(xMoveLeft, yMove);
    ctx.moveTo(xRhoBorderRight, yLevel);
    ctx.lineTo(xMoveRight, yLevel);
    ctx.lineTo(xMoveRight, yMove);
    ctx.stroke();
  }
  return X;
};

const lineWithoutElse = (X, Y, ifPrevId, idLoop, idIf, rhoWidth) => {
  const currId = ifPrevId !== 1 && ifPrevId !== idLoop ? ifPrevId : idIf;
  const ifX = cordinatX(currId, resFigures);
  const ifY = cordinatY(currId, resFigures);
  const ifYLevel = ifY + configs.uniHeight / configs.half;
  if (rhoWidth >= configs.spaceX4) {
    ctx.moveTo(ifX - rhoWidth / configs.half, ifYLevel);
    ctx.lineTo(ifX - rhoWidth / configs.half, Y);
    ctx.lineTo(X, Y);
    ctx.stroke();
  } else if (rhoWidth <= configs.spaceX1) {
    ctx.moveTo(ifX - configs.spaceX3, ifYLevel);
    ctx.lineTo(ifX - configs.spaceX3, Y);
    ctx.lineTo(X, Y);
    ctx.stroke();
  } else {
    ctx.moveTo(ifX - rhoWidth, ifYLevel);
    ctx.lineTo(ifX - rhoWidth, Y);
    ctx.lineTo(X, Y);
    ctx.stroke();
  }
};

export { downLine, processingLength, lineWithoutElse, horizontalLine };
