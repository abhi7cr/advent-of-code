const locksAndKeys = input.split("\n\n");
const locks = [];
const keys = [];
for (const lockOrKey of locksAndKeys) {
  if (lockOrKey[0][0] === "#") {
    locks.push(lockOrKey.split("\n").map((item) => item.split("")));
  } else {
    keys.push(lockOrKey.split("\n").map((item) => item.split("")));
  }
}

const rows = locks[0].length;
const cols = locks[0][0].length;
const lockHeights = [];
const keyHeights = [];
for (let l = 0; l < locks.length; ++l) {
  const lock = locks[l];
  const key = keys[l];
  lockHeights[l] = new Array(cols).fill(0);
  keyHeights[l] = new Array(cols).fill(0);
  for (let i = 0; i < cols; ++i) {
    let lh = 0;
    let kh = 0;
    for (let j = 0; j < rows; ++j) {
      if (lock[j][i] === "#") {
        lh++;
      }
      if (key[j][i] === "#") {
        kh++;
      }
    }
    lockHeights[l][i] = lh - 1;
    keyHeights[l][i] = kh - 1;
  }
}

let res = 0;
for (const lockHeight of lockHeights) {
  for (const keyHeight of keyHeights) {
    let fits = true;
    for (let i = 0; i < cols; ++i) {
      const totalHeight = lockHeight[i] + keyHeight[i];
      if (totalHeight >= rows - 1) {
        fits = false;
        break;
      }
    }
    if (fits) {
      res++;
    }
  }
}

console.log(res);
