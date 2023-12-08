import fs from 'node:fs';
import { join } from 'node:path';

const dataFile = join(__dirname, 'example-data.txt');
const data = fs.readFileSync(dataFile, { encoding: 'utf-8' }).split('\n');

const seeds = /seeds: (.*)/.exec(data[0])![1].trim().split(' ');
console.log(seeds);

const maps = data.slice(1).reduce(
  (aggregator, line) => {
    if (line.trim() === '') {
      return aggregator;
    }

    if (/.*map/.test(line)) {
      aggregator.push(new Map());
    } else {
      const numbers = line.split(' ').map(Number);
      aggregator[aggregator.length - 1].set(numbers[0], numbers.slice(1));
    }
    return aggregator;
  },
  // Maps preserve insertion order
  [] as Map<number, number[]>[],
);

console.log(maps);
