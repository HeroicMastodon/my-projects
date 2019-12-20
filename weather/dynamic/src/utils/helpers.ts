export function proper(name: string) {
    return name[0].toUpperCase() + name.slice(1);
}

export function camelCase(sentence: string) {
    let arr = sentence.split(' ');

    return arr.reduce((before, current) => {
        if (before[0] !== before[0].toUpperCase()) {
            before = proper(before);
        }

        before += ' ' + proper(current);
        return before;
    });
}