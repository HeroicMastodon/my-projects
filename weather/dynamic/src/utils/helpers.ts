export function proper(name: string) {
    if (name == '') {
        return '';
    }
    return name[0].toUpperCase() + name.slice(1);
}

export function camelCase(sentence: string) {
    let arr = sentence.split(' ');
    if (arr.length === 1) {
        return proper(arr[0]);
    }

    return arr.reduce((before, current) => {
        if (before[0] !== before[0].toUpperCase()) {
            before = proper(before);
        }

        before += ' ' + proper(current);
        return before;
    });
}