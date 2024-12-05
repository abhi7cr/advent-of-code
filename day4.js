const find = (input, word, directions) => {
    const rows = input.split('\n').map(row => row.split(''))
    let res = 0;
    const rowLen = rows.length;
    const colLen = rows[0].length;
    const visited = new Set();

    const isSafeExploration = (i, j) => i >= 0 && i < rowLen && j >= 0 && j < colLen;

    const dfs = (i, j, [dx, dy], searchWord, curr = '', path = []) => {
        if (curr.length > 4) return;
        if (curr === searchWord && !visited.has(path.join('->'))) {
            visited.add(path.join('->'))
            res++;
            return;
        }
        if (!isSafeExploration(i, j)) {
            return;
        }
        const el = rows[i][j];
        path.push(`${i},${j}`);
        dfs(i + dx, j + dy, [dx, dy], searchWord, curr + el, path)
        path.pop();
    }

    for (let i = 0; i < rowLen; ++i) {
        for (let j = 0; j < colLen; ++j) {
            for (const dir of directions) {
                if (rows[i][j] === word[0]) {
                    dfs(i, j, dir, word)
                }
            }
        }
    }
    return [res, visited];
}

const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
]

// all directions
const [part1Result, ] = find(input, 'XMAS', dirs);
console.log("PART1", part1Result);
// filter only diagonal directions
const [, part2Paths] = find(input, 'MAS', dirs.filter(([dx, dy]) => Math.abs(dx) === 1 && Math.abs(dy) === 1));
// count the occurrences of the middle points (A)
const result = [...part2Paths].map(path => path.split('->')[1]).reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1
    return acc;
}, {});
// Filter middle points (A) which occur exactly twice. This indicates a X
console.log("PART2", Object.entries(result).filter(([k, v]) => v === 2).length);
