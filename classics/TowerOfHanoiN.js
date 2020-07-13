import Stack from '../datastructures/Stack.js';

let moved = 0;

function move(beginStack, endStack, tempStacks, diskNumber) {
  // If there is only one disk left, move it to the end stack.
  // Else, move everything above it to the temp stack,
    // where for each extra temp stack takes the last of the disk
  // then move the last disk to the end stack,
    // then for each extra temp stack, move each disk to the end stack.
  // then do the same to the rest of the temp stack.
  moved++;

  if (diskNumber === 1) {
    endStack.push(beginStack.pop());
  } else {
    move(beginStack, tempStacks[tempStacks.length - 1], [...tempStacks.slice(0, tempStacks.length - 1), endStack], diskNumber - (tempStacks.length - 1) - 1);
    move(beginStack, endStack, tempStacks, 1);
    for (let i = 0; i < tempStacks.length - 1; i++) {
      endStack.push(tempStacks[tempStacks.length - 2 - i].pop());
    }
    move(tempStacks[tempStacks.length - 1], endStack, [...tempStacks.slice(0, tempStacks.length - 1), beginStack], diskNumber - (tempStacks.length - 1) - 1);
  }
}

function hanoiN () {
  const stackA = new Stack();
  for (let i = 1; i <= 7; i++) {
    stackA.push(i);
  }
  const stackC = new Stack();
  const assistStacks = Array(2).fill(new Stack());

  console.log(stackA, assistStacks, stackC);

  move(stackA, stackC, assistStacks, stackA.size());

  console.log(stackA, assistStacks, stackC);
  console.log('Moved ', moved);
}

hanoiN();
