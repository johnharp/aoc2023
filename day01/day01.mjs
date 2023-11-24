import { readGroupsOfLines } from "../util/input.mjs";
import { sumArray, sumArrayN } from "../util/calc.mjs";


export function solve() {
    const rawInput = readGroupsOfLines("day01/input.txt");

    // parse the raw input into integers
    const input = rawInput.map(group => 
        group.map(item => parseInt(item)));

    const sums = input.map(sumArray);
    const sortedSums = sums.sort((a, b) => b-a);
    
    const part1 = sortedSums[0];
    const part2 = sumArrayN(sortedSums, 3);

    return [part1, part2];
}

console.log(solve());