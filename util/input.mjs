import * as fs from "fs";

/**
 * Expects an input file of this form:
    1000
    2000
    3000

    4000

    5000
    6000
 * returns
   [
    [ 1000, 2000, 3000 ],
    [ 4000 ],
    [ 5000, 6000 ]
   ]
 * @param {string} fileName 
 */
export function readGroupsOfNumbers(fileName) {
    let lines = fs
        .readFileSync(fileName, "utf8")
        .toString()
        .trim()
        .split("\n\n");
    let input = lines.map(l => 
        l.split("\n").map(i => Number(i)));

    return input;
}

