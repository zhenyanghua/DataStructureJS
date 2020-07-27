function fib(num) {
  let prev = 0;
  let current = 1;
  let fibNum = prev;
  for (let i = 0; i < num; i++) {
    fibNum = prev;
    prev = current;
    current = fibNum + current;
    console.log(`${i + 1} - ${fibNum}`);
  }
  return fibNum;
}

fib(40);
