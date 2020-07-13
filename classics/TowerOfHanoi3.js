import Stack from '../datastructures/Stack.js';

function move(beginStack, endStack, tempStack, diskNumber) {
  // If there is only one disk left, move it to the end stack.
  // Else, move everything above it to the temp stack,
  // then move the last disk to the end stack,
  // then do the same to the rest of the temp stack.
  if (diskNumber === 1) {
    endStack.push(beginStack.pop());
  } else {
    move(beginStack, tempStack, endStack, diskNumber - 1);
    move(beginStack, endStack, tempStack, 1);
    move(tempStack, endStack, beginStack, diskNumber - 1);
  }
}

function hanoi3 () {
  const stackA = new Stack();
  for (let i = 1; i <= 3; i++) {
    stackA.push(i);
  }
  const stackB = new Stack();
  const stackC = new Stack();

  console.log(stackA, stackB, stackC);

  move(stackA, stackC, stackB, stackA.size());

  console.log(stackA, stackB, stackC);
}

hanoi3();
