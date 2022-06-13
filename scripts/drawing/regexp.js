const highlightText = (text) => {
  let result = '';
  let regex = /.*/;
  if (text.includes('%')) {
    regex = /(?:")(?<info>.*)(?:%.*",\s*)(?<number>.*)(?:\))/;
    const { groups } = text.match(regex);
    let { info, number } = groups;
    if (number.includes('&')) {
      regex = /(?:\s*&)(?<variable>\w)/;
      let { variable } = number.match(regex).groups;
      number = variable;
    }
    result = info + number;
  }
  else {
    regex = /".*"/;
    result = text.match(regex)[0];
  }
  return result;
}
