import { readLines } from '../util/input.js';

export function solve(filename) {
    const lines = readLines(filename);

    const part1 = lines.length;
    const part2 = lines.length;
    return [part1, part2];
}

console.log(solve('day10/input-sample.txt'));
