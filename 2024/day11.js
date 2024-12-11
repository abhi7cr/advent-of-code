const calculateStonesAfterBlinks = (stones, blinks) => {
    for (let i = 0; i < blinks; ++i) {
        const newStones = {};
        Object.entries(stones).forEach(([stone, count]) => {
            const parsedStone = parseInt(stone);
            if (parsedStone === 0) {
                newStones[1] = (newStones[1] || 0) + count;
                return;
            }
            const numDigits = Math.floor(Math.log10(parsedStone) + 1);
            if (stone.length % 2 === 0) {
                const left = Math.floor(parsedStone / Math.pow(10, numDigits / 2));
                const right = Math.floor(parsedStone % Math.pow(10, numDigits / 2));
                newStones[left] = (newStones[left] || 0) + count;
                newStones[right] = (newStones[right] || 0) + count;
            } else newStones[parsedStone * 2024] = (newStones[parsedStone * 2024] ?? 0) + count;
        });
        stones = newStones;
    }

    return Object.values(stones).reduce((acc, count) => acc + count, 0);
}

const stones = `77 515 6779622 6 91370 959685 0 9861`;
const stonesArr = stones.split(' ').map(Number);
let stoneCounts = {};
stonesArr.forEach(stone => stoneCounts[stone] = (stoneCounts[stone] ?? 0) + 1);
console.log(calculateStonesAfterBlinks(stoneCounts, 25));
console.log(calculateStonesAfterBlinks(stoneCounts, 75));
