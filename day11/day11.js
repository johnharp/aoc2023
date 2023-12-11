import { readLines } from '../util/input.js';

export function solve(filename) {
    const lines = readLines(filename);
    const colcounts = Array(lines[0].length);
    const rowcounts = Array(lines.length);

    for (let row = 0; row < lines.length; row++) {
        const line = lines[row];

        for (let col = 0; col < line.length; col++) {
            if (line[col] === "#") {
                if (colcounts[col] === undefined) colcounts[col] = 0;
                if (rowcounts[row] === undefined) rowcounts[row] = 0;

                colcounts[col] ++;
                rowcounts[row] ++;
            }
        }
    }

    expand(rowcounts);
    expand(colcounts);

    let sum = 0;
    for (let col=0; col < colcounts.length - 1; col++) {
        if (colcounts[col] !== undefined) {
            for (let col2 = col+1; col2 < colcounts.length; col2++) {
                if (colcounts[col2] !== undefined) {
                    sum += colcounts[col] * colcounts[col2] * (col2 - col);
                }
            }

        }
    }

    for (let row = 0; row < rowcounts.length - 1; row++) {
        if (rowcounts[row] !== undefined) {
            for (let row2 = row+1; row2 < rowcounts.length; row2++) {
                if (rowcounts[row2] != undefined) {
                    sum += rowcounts[row] * rowcounts[row2] * (row2 - row);
                }
            }
        }
    }

    
    
    const part1 = sum;
    const part2 = lines.length;

    return [part1, part2];
}

function expand(arr) {
    for (let i = arr.length; i >= 0; i--) {
        if (arr[i] === undefined) {
            arr.splice(i, 0, undefined);
        }
    }
}

console.log(solve('day11/input.txt'));
