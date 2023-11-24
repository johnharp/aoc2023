import { readGroupsOfNumbers } from "../util/input.mjs";
import { sumArray, sumArrayN } from "../util/calc.mjs";


export function solve() {
    const input = readGroupsOfNumbers("day01/input.txt");

    const sums = input.map(sumArray);
    const sortedSums = sums.sort((a, b) => b-a);
    
    const part1 = sortedSums[0];
    const part2 = sumArrayN(sortedSums, 3);

    return [part1, part2];
}

console.log(solve());