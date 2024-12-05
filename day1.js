const fs = require('fs');
const contents = fs.readFileSync('day1_testinput.txt', { encoding: 'utf-8'});
const lines = contents.split('\n');
const arr1 = [];
const arr2 = [];
let countMap = new Map();
let answer = 0;
let simScore = 0;

for (let i = 0; i < lines.length; i++) {
    const [itemFromList1, itemFromList2] = lines[i].split('  ');
    arr1.push(Number(itemFromList1));
    arr2.push(Number(itemFromList2));
    countMap.set(Number(itemFromList2), (countMap.get(Number(itemFromList2)) || 0) + 1);
}

arr1.sort();
arr2.sort();

for (let i = 0; i < arr1.length; ++i) {
    answer += Math.abs(arr1[i] - arr2[i])
    const item = arr1[i];
    countMap.get(item);
   
    simScore += item * (countMap.get(item) || 0);
}
console.log(answer);
console.log('simScore', simScore);
