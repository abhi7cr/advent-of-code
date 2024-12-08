const input = `.......................V.........e...O............
..........q.pj8...............................u...
...................8..............................
.............8.....6.................J....l....u..
........................6................J..Z..B..
......e.........E...........................O.J...
......Jq..........................5...............
...............E...........e.Q..5.f...............
..............................Q..A.....f..B.....O.
....V...................j.....Af..................
............8......n..............l...f....Z7.....
...............n..........4........A........BD....
...........j...................Q..z.......R....l..
N.........6....q.....3....n.........D...........Z.
.............a.6..3.F........D..I.................
.............03.................Q.......h...2.....
......................A.u.......................m.
.V........F......L.............5..........z.R....Z
.......N....q.................n.......L.E.........
..................M.........y.....................
......N............................m.L..y........R
.o....................L...........I...7..R........
......o..........9..............2.......D.........
..od.............y...........................I....
d........3.....M...........E.............I........
......X.W....................p.2.....7...z....s...
V......o........M.....9.................G......7..
.................M.....................h..0....m..
.......d.......F......p.........s.h........z......
..r..........Y.i................9............s....
.....W..a.Y..........y.............p..............
.....g.......r........w...........................
....r.....b...............g........x.s.....h......
....a.....d.......................................
.....................S.......w.............1......
..Y...............................H...............
...b...........Y........................e..t...0.v
..........i..........w.........9....T........v....
.................U...........2....................
.........S........t......T........................
....................U..................Gt.........
....U...S..........................P.....1.B......
.r...X............w.......P.....x.j...............
...W......x..b........g........F.....a............
S.i.................................1.......H.....
.......U......b......x.....X..........G.1.........
...i....X....................P..4........H........
.................................H................
......W...................T4...g................v.
..........................v........GP..4.....t....`;

const testInput = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

const grid = input.split("\n").map((row) => row.split(""));
const rows = grid.length;
const cols = grid[0].length;
let antennas = new Map();
let antinodes = new Set();
for (let i = 0; i < rows; ++i) {
  for (let j = 0; j < cols; ++j) {
    const item = grid[i][j];
    if (item !== ".") {
      antennas.set(
        item,
        antennas.get(item) ? [...antennas.get(item), [i, j]] : [[i, j]]
      );
    }
  }
}
const outOfBounds = (i, j) => i < 0 || i >= rows || j < 0 || j >= cols;

const visualize = (antinodes) => {
  const grid = Array(rows)
    .fill()
    .map(() => Array(cols).fill("."));
  for (const [key, v] of antennas) {
    for (const entry of v) {
      const [x, y] = entry;
      grid[x][y] = key;
    }
  }
  for (const entry of antinodes.values()) {
    const [x, y] = entry.split(",").map(Number);
    grid[x][y] = "#";
  }
  console.log('\x1b[36m%s\x1b[0m', grid.map((row) => row.join("")).join("\n"));
};

const part1 = () => {
  const antinodes = new Set();
  for (const [k, v] of antennas) {
    for (let i = 0; i < v.length; ++i) {
      for (let j = i + 1; j < v.length; ++j) {
        const first = v[i];
        const second = v[j];
        const dx = second[0] - first[0];
        const dy = second[1] - first[1];
        const firstAntinodeX = first[0] - dx;
        const firstAntinodeY = first[1] - dy;
        const secondAntinodeX = second[0] + dx;
        const secondAntinodeY = second[1] + dy;
        if (!outOfBounds(firstAntinodeX, firstAntinodeY)) {
          antinodes.add(`${firstAntinodeX},${firstAntinodeY}`);
        }
        if (!outOfBounds(secondAntinodeX, secondAntinodeY)) {
          antinodes.add(`${secondAntinodeX},${secondAntinodeY}`);
        }
      }
    }
  }
  return antinodes;
};

const part2 = () => {
  const antinodes = new Set();
  for (const [k, v] of antennas) {
    for (let i = 0; i < v.length; ++i) {
      antinodes.add(`${v[i][0]},${v[i][1]}`);
      for (let j = i + 1; j < v.length; ++j) {
        const first = v[i];
        const second = v[j];
        const dx = Math.abs(second[0] - first[0]);
        const dy = Math.abs(second[1] - first[1]);
        let x, y;
        // Move up from first antenna (going left/right based on the relative position of the first antenna)
        do {
          if (x !== undefined && y !== undefined) {
            antinodes.add(`${x},${y}`);
          }
          x = (x != undefined ? x : first[0]) - dx;
          y =
            first[1] > second[1]
              ? (y != undefined ? y : first[1]) + dy
              : (y != undefined ? y : first[1]) - dy;
        } while (x >= 0 && y >= 0 && x < rows && y < cols);
        x = undefined;
        y = undefined;
        // Move down from second antenna (going left/right based on the relative position of the second antenna)
        do {
          if (x !== undefined && y !== undefined) {
            antinodes.add(`${x},${y}`);
          }
          x = (x != undefined ? x : second[0]) + dx;
          y =
            second[1] > first[1]
              ? (y != undefined ? y : second[1]) + dy
              : (y != undefined ? y : second[1]) - dy;
        } while (x >= 0 && y >= 0 && x < rows && y < cols);
      }
    }
  }
  return antinodes;
};

console.log("***PART1***");
const part1Antinodes = part1();
console.log("ANSWER: ", part1Antinodes.size);
console.log("***MAP***");
visualize(part1Antinodes);

console.log("***PART2***");
const part2Antinodes = part2();
console.log("ANSWER: ", part2Antinodes.size);
console.log("***MAP***");
visualize(part2Antinodes);
