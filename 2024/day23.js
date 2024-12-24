// set input string

const connections = input.split("\n");
const adjacencyList = new Map();
for (const connection of connections) {
  const [from, to] = connection.split("-");
  if (!adjacencyList.has(from)) {
    adjacencyList.set(from, []);
  }
  if (!adjacencyList.has(to)) {
    adjacencyList.set(to, []);
  }
  adjacencyList.get(from).push(to);
  adjacencyList.get(to).push(from);
}

const intersect = (a, b) => {
  const res = new Set();
  for (const item of a) {
    if (b.has(item)) {
      res.add(item);
    }
  }
  return res;
};

let maxClique = new Set();
const triplets = [];
const itemsWithT = new Set();

// https://en.wikipedia.org/wiki/Bron%E2%80%93Kerbosch_algorithm
const findCliques = (r, p, x, cliqueSize) => {
  if (cliqueSize && cliqueSize === r.size) {
    triplets.push(r);
  }
  if (p.size === 0 && x.size === 0) {
    if (r.size > maxClique.size) {
      maxClique = r;
    }
    return r;
  }
  for (const vertex of p) {
    findCliques(
      new Set([...r, vertex]),
      intersect(p, new Set(adjacencyList.get(vertex))),
      intersect(x, new Set(adjacencyList.get(vertex))),
      cliqueSize
    );
    p = new Set([...p].filter((v) => v !== vertex));
    x.add(vertex);
  }
};

findCliques(new Set(), new Set(adjacencyList.keys()), new Set(), 3);
for (const triplet of triplets) {
  const items = [...triplet];
  const hasT = items.some((item) => item.startsWith("t"));
  if (hasT) {
    itemsWithT.add(items.join(","));
  }
}
console.log("PART1", itemsWithT.size);

findCliques(new Set(), new Set(adjacencyList.keys()), new Set());
console.log("PART2", [...maxClique].sort().join(","));
