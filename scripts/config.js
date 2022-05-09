
const maps = {
    defD: ['double', ';'],
    defV: ['void', ';'],
    defC: ['char', ';'],
    defI: ['int', ';'],
    defF: ['float', ';'],
    else: 'else',
    if: 'if',
    main: ['main', '(', ')'],
    for: 'for',
    customFD: ['double', '(', ')'],
    customFV: ['void', '(', ')'],
    customFC: ['char', '(', ')'],
    customFI: ['int', '(', ')'],
    customFF: ['float', '(', ')'],
    while: ['while', '(', ')'],
    do: 'do',
    doWhile: 'while',
    switch: 'switch',
    case: ['break', 'case'],
    default: ['}', 'default'],
    tern: ['?', ':'],
};

const checkFunc = function (array) {
    let flag = false;
    if (array.includes('(', ')')) {
        flag = true;
    }
    return flag;
};

const checkDef = function (array) {
    let flag = false;
    if (array.includes(';')) {
        flag = true;
    }
    return flag;
}

const checkCase = function (array) {
    let flag = false;
    if (array.includes('break', 'case') || array.includes('}', 'default')) {
        flag = true;
    }
    return flag;
}

export { maps, checkFunc, checkDef, checkCase };
