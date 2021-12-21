/**
 * @param {number} n
 * @return {string[]}
 */
 var generateParenthesis = function(n) {
    // for each new pair, there are three combinations:
    // ( ) X
    // ( X )
    // X ( )
    // where X is the combination from the previous iteration.
    if (n === 1) {
        return ['()'];
    }
    const res = new Set();
    for (let s of generateParenthesis(n - 1)) {
        res.add('()' + s);
        res.add('(' + s + ')');
        res.add(s + '()');
    }
    return [...res];
};

function checkBalance(s) {
    let opens = 0;
    let i = 0;
    while (i < s.length) {
        if (s[i] === '(') {
            opens++;
        } else {
            if (opens === 0) {
                return false;
            }
            opens--;
        }
        i++;
    }
    return opens === 0;
}

// let x = generateParenthesis(4);
// x.sort();
// console.log(x.length, '\n', x);
// const y = ["(((())))","((()()))","((())())","((()))()","(()(()))","(()()())","(()())()","(())(())","(())()()","()((()))","()(()())","()(())()","()()(())","()()()()"]
// y.sort();
// console.log(y.length, '\n', y);


console.log(checkBalance('((()))'));
console.log(checkBalance('(())()'));
console.log(checkBalance('((())))'));