const fs = require('fs');
const contents = fs.readFileSync('day2_testinput.txt', { encoding: 'utf-8' });
const rows = contents.split('\n');
let answer = 0;
const numRows = rows.length;

const isRelativelySafeLevel = (absoluteDiff, isMonotonicallyIncreasing, isIncreasing) => {
    return absoluteDiff >= 1 && absoluteDiff <= 3 && isMonotonicallyIncreasing === isIncreasing;
}

const computeDiffAndDirection = (levels, index) => {
    const diff = levels[index] - levels[index - 1];
    const absoluteDiff = Math.abs(diff);
    const isCurrentLevelIncreasing = diff > 0;
    return [absoluteDiff, isCurrentLevelIncreasing];
}

const isSafeReport = (levels) => {
    const len = levels.length;
    const isIncreasing = levels[1] - levels[0] > 0;
    for (let i = 1; i < len; ++i) {
        const [absoluteDiff, isCurrentLevelIncreasing] = computeDiffAndDirection(levels, i);
        if (!isRelativelySafeLevel(absoluteDiff, isCurrentLevelIncreasing, isIncreasing)) {
            return false;
        }
    }
    return true;
}

for (let i = 0; i < numRows; i++) {
    const levels = rows[i].split(' ');
    if (isSafeReport(levels)) {
        answer++;
        continue;
    }
    const len = levels.length;
    let unsafe = true;
    for (let j = 0; j < len; ++j) {
        if (isSafeReport(levels.filter((_, index) => index !== j))) {
            unsafe = false;
            break;
        }
    }
    if (!unsafe) {
        answer++;
    }
}

console.log(answer);
