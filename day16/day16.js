import { readLines } from "../util/input.js";

export function solve(filename) {
    const lines = readLines(filename);
    const grid = newGrid(lines);

    const energized = new Set();

    const beams = [];
    const tracedBeams = [];

    beams.push(newBeam([0, 0], [1, 0]));

    while (beams.length > 0) {
        const beam = beams.shift();
        trace(beam);
    }

    for (const beam of tracedBeams) {
        for (const pos of beam.trace) {
            energized.add(pos.join(","));
        }
    }

    const part1 = energized.size;
    const part2 = 0;

    function trace(beam) {
        // find if any prior tracedBeams have the same start and direction
        if (
            tracedBeams.some(
                (b) =>
                    b.start[0] === beam.start[0] &&
                    b.start[1] === beam.start[1] &&
                    b.dir[0] === beam.dir[0] &&
                    b.dir[1] == beam.dir[1]
            )
        ) {
            return;
        }

        let pos = beam.start;
        let priorPos = beam.start;
        let done = false;
        beam.trace.push(pos);

        while (!done) {
            priorPos = pos;
            pos = [pos[0] + beam.dir[0], pos[1] + beam.dir[1]];
            const c = grid.get(pos);

            switch (c) {
                case null:
                    beam.end = priorPos;
                    tracedBeams.push(beam);
                    done = true;
                    break;
                case "|":
                    beam.end = priorPos;
                    tracedBeams.push(beam);
                    done = true;
                    if (beam.dir[0] === 0) {
                        // if moving vertically, no split is created
                        // just end this segment and start a new one continuing
                        // in the same direction
                        beams.push(newBeam(pos, beam.dir));
                    } else if (beam.dir[1] === 0) {
                        // if moving horizontally, end this segment and start
                        // two new ones continuing vertically
                        beams.push(newBeam(pos, [0, 1]));
                        beams.push(newBeam(pos, [0, -1]));
                    }
                    break;
                case "-":
                    beam.end = priorPos;
                    tracedBeams.push(beam);
                    done = true;
                    if (beam.dir[0] === 0) {
                        // if moving vertically, end this segment and start
                        // two new ones continuing horizontally
                        beams.push(newBeam(pos, [1, 0]));
                        beams.push(newBeam(pos, [-1, 0]));
                    } else if (beam.dir[1] === 0) {
                        // if moving horizontally, no split is created
                        // just end this segment and start a new one continuing
                        // in the same direction
                        beams.push(newBeam(pos, beam.dir));
                    }
                    break;
                case "/":
                    beam.end = priorPos;
                    tracedBeams.push(beam);
                    done = true;
                    if (beam.dir[0] === 0) {
                        // if moving vertically, end this segment and start
                        // a new one with the with horizontal direction opposite
                        // of the current vertical direction
                        beams.push(newBeam(pos, [-beam.dir[1], 0]));
                    } else if (beam.dir[1] === 0) {
                        // if moving horizontally, end this segment and start
                        // a new one with the with vertical direction opposite
                        // of the current horizontal direction
                        beams.push(newBeam(pos, [0, -beam.dir[0]]));
                    }
                    break;
                case "\\":
                    beam.end = priorPos;
                    tracedBeams.push(beam);
                    done = true;
                    if (beam.dir[0] === 0) {
                        // if moving vertically, end this segment and start
                        // a new one with the with horizontal direction same
                        // as the current vertical direction
                        beams.push(newBeam(pos, [beam.dir[1], 0]));
                    } else if (beam.dir[1] === 0) {
                        // if moving horizontally, end this segment and start
                        // a new one with the with vertical direction same
                        // as the current horizontal direction
                        beams.push(newBeam(pos, [0, beam.dir[0]]));
                    }
                    break;
                case ".":
                    beam.trace.push(pos);
                    break;
            }
        }
    }

    return [part1, part2];
}

function newBeam(start, dir) {
    return { start: start, dir: dir, end: null, trace: [] };
}

function newGrid(lines) {
    const data = lines.map((line) => line.trim().split(""));
    return {
        data: data,
        width: data[0].length,
        height: data.length,
        get(loc) {
            if (loc[0] < 0 || loc[0] >= this.width) return null;
            if (loc[1] < 0 || loc[1] >= this.height) return null;
            return this.data[loc[1]][loc[0]];
        },
    };
}

console.log(solve("day16/input.txt"));
