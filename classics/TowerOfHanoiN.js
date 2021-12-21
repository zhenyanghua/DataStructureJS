import Stack from '../datastructures/Stack.js';

const towers = 2;
let moved = 0;
const stackA = new Stack();
for (let i = 1; i <= 4; i++) {
  stackA.push(i);
}
const stackC = new Stack();
const assistStacks = new Array(towers).fill(0).map(() => new Stack());

function move(beginStack, endStack, tempStacks, numberOfDisks) {
  // If there is only one disk left, move it to the end stack.
  // Else, move everything above it to the temp stack,
  //  - where for each extra temp stack takes the last of the disk
  // then move the last disk to the end stack,
  //  - then for each extra temp stack, move each disk to the end stack.
  // then do the same to the rest of the temp stack.

  if (numberOfDisks === 1) {
    endStack.push(beginStack.pop());
    console.log(++moved, stackA, assistStacks, stackC);
  } else if (numberOfDisks > 1) {
    move(
      beginStack,
      tempStacks[tempStacks.length - 1],
      [...tempStacks.slice(0, tempStacks.length - 1), endStack],
      numberOfDisks - tempStacks.length
    );
    const moveUntilDisk = tempStacks.length - 1;
    for (let i = 0; i < moveUntilDisk && !beginStack.isEmpty(); i++) {
      tempStacks[i].push(beginStack.pop());
      console.log(++moved, stackA, assistStacks, stackC);
    }
    move(beginStack, endStack, tempStacks, 1);
    for (let i = tempStacks.length - 2; i >= 0; i--) {
      const disk = tempStacks[i].pop();
      if (disk) {
        endStack.push(disk);
        console.log(++moved, stackA, assistStacks, stackC);
      }
    }

    move(
      tempStacks[tempStacks.length - 1],
      endStack,
      [beginStack, ...tempStacks.slice(0, tempStacks.length - 1)],
      numberOfDisks - tempStacks.length
    );
  }
}

console.log(stackA, assistStacks, stackC);
console.log('Start Moving');
move(stackA, stackC, assistStacks, stackA.size());

console.log('Moved ', moved);
