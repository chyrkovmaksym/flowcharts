const codeCleaner = (text) => {
  const result = text
    .replaceAll('}', '}\n')
    .replaceAll('{', '\n{')
    .split(/\r\n|\r|\n/g)
    .map((item) => item.trimStart().trimEnd())
    .filter((item) => item !== '');
  return result;
};

export { codeCleaner };
