const highlightText = (text, type) => {
  let result = text;
  let regex = /.*/;
  if (["if", "while", "for"].includes(type)) {
    regex = /\((?<condition>.*)\)/;
    const { groups } = text.match(regex);
    const { condition } = groups;
    result = condition;
  } else if (type === "printf") {
    if (text.includes("%")) {
      regex = /\"(?<info>.*)%.*\", (?<variable>\w)\)/;
      const { groups } = text.match(regex);
      const { info, variable } = groups;
      result = "Output" + ` ${info}${variable}`;
    } else {
      regex = /\"(?<content>.*)\"/;
      const { groups } = text.match(regex);
      const { content } = groups;
      result = "Output" + ` ${content}`;
    }
  } else if (type === "scanf") {
    regex = /\"(?<info>.*)%.*\", &(?<variable>\w)\)/;
    const { groups } = text.match(regex);
    const { info, variable } = groups;
    result = "Input" + ` ${info}${variable}`;
  } else if (type === "customF") {
    result = "Begin";
  }
  return result;
};

export { highlightText };
