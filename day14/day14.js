import { readLines } from '../util/input.js';

export function solve(filename) {

    const input = readLines(filename);
    const grid = input.map(line => line.split(''));

    tiltGridNorth(grid);


    const part1 = calcLoad(grid);
    const part2 = 0;

    return [part1, part2];
}

function logGrid(grid) {
    grid.forEach(row => console.log(row.join('')));
}

function tiltGridNorth(grid) {
    for (let col = 0; col < grid[0].length; col++) {
        let open = -1;

        for (let row = 0; row < grid.length; row++) {
            if (grid[row][col] === '.' && open === -1) {
                open = row;
            } else if (grid[row][col] === '#') {
                open = -1;
            } else if (grid[row][col] === 'O') {
                if (open > -1) {
                    grid[open][col] = 'O';
                    grid[row][col] = '.';
                    open++;
                }
            }
        }
    }
}

function calcLoad(grid) {
    let load = 0;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            if (grid[row][col] === 'O') {
                load += grid.length - row;
            }
        }
    }

    return load;
}

console.log(solve('day14/input.txt'));