
const highlightText = (text) => {
  let result = ''
  let regex = /.*/
  if(text.includes('%')){
    regex = /(?:")(?<info>.*)(?:%.*",)(?<numbers>.*)(?:\))/;
    const groups = text.match(regex).groups;
    result = groups.info + groups.numbers;
  }
  else if(text.includes('&')){
    regex = /(?:")(?<info>.*)(?:%.*", &)(?<numbers>.*)(?:\))/;
    const groups = text.match(regex).groups;
    result = groups.info + groups.numbers;
  }
  else{
    regex = /".*"/;
    result = text.match(regex)[0];
  }
  return result;
}

export { highlightText };