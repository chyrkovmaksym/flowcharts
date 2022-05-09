class Cleaner {
    constructor(text) {
        this.result = this.sortingText(text);
    }

    cleanCode(arr) {
        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i].trimStart().trimEnd();
        }
        arr = arr.filter((str) => str !== '');
        return arr;
    }

    sortingText(string) {
        let sorted = string
            .replaceAll('}', '}\n')
            .replaceAll('{', '\n{')
            .split(/\r\n|\r|\n/g);
        sorted = this.cleanCode(sorted);
        return sorted;
    }

    getResult() {
        return this.result;
    }
}

export { Cleaner };
