'use strict';

const Stack = require('./stack');

class Tower {
  constructor(idx) {
    this.disks = new Stack();
    this.idx = idx;
  }

  isEmpty() {
    return this.disks.isEmpty();
  }

  add(i) {
    const disks = this.disks;

    if (!this.isEmpty() && i >= disks.peek()) {
      throw new Error(`Can\'t add ${i} to the tower with top ${disks.peek()}`);
    }

    disks.push(i);
  }

  remove() {
    if (this.isEmpty()) {
      throw new Error('There is no disks to remove');
    }

    return this.disks.pop();
  }

  moveTop(destination) {
    if (this.isEmpty()) {
      return;
    }

    const top = this.remove();
    console.log(`Moving top ${top} from Tower #${this.idx} -> Tower #${destination.idx}`)
    destination.add(top);
  }

  moveDisks(n, destination, buffer) {
    if (n <= 0) return;

    this.moveDisks(n - 1, buffer, destination);
    this.moveTop(destination);
    buffer.moveDisks(n - 1, destination, this);
  }
}

class Hanoi {
  constructor(N) {
    this.N = N;
    this.towers = [];
    for (let i = 0; i < 3; i++) {
      this.towers[i] = new Tower(i);
    }

    for (let i = N - 1; i >= 0; i--) {
      this.towers[0].add(i);
    }
  }

  print() {
    this.towers.forEach((tower) => {
      let disk = tower.disks.top;
      process.stdout.write(`#${tower.idx}: `);
      while(disk) {
        process.stdout.write(`${disk.value} `);
        disk = disk.next;
      }
      process.stdout.write("\n");
    });
  }

  play() {
    const towers = this.towers;
    towers[0].moveDisks(this.N, towers[2], towers[1]);
  }
}

// TEST CODE
const h = new Hanoi(5);

h.print();
h.play();
h.print();
