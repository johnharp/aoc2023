import { readLines } from '../util/input.js';

export function solve(filename) {
    const lines = readLines(filename);
   
    const part1 = lines.length;
    const part2 = 0;

    return [part1, part2];
}

console.log(solve('day07/input-sample.txt'));
