import { ctx, configs } from './figures.js';
const downLine = (X, Y) => {
  ctx.moveTo(X, Y + configs.uniHeight);
  ctx.lineTo(X, Y + configs.spaceY);
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

export { downLine, ifLines };
