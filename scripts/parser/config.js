const maps = {
  tern: ['?', ':', ';'],
  printf: ['printf', '(', ')', '"'],
  customF: [['main', '(', ')'], ['double', '(', ')'], ['void', '(', ')'], ['char', '(', ')'], ['int', '(', ')'], ['float', '(', ')']],
  def: [['double', ';'], ['void', ';'], ['char', ';'], ['int', ';'], ['float', ';']],
  else: 'else',
  if: 'if',
  for: 'for',
  do: 'do',
  while: 'while',
  switch: 'switch',
  case: ['break', 'case'],
  default: ['}', 'default'],
  scanf: ['scanf', '(', ')', '"'],
};

export { maps };
