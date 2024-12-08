console.log([...str.matchAll(/(?<MUL>mul\(\d+\,\d+\))/g)].map(m => m.groups.MUL).reduce((acc, group) => { 
    const [, num1, num2] = group.match(/mul\((\d+)\,(\d+)/);
    return acc + Number(num1) * Number(num2)
}, 0))

console.log([...test.matchAll(/(?<MUL>mul\(\d+\,\d+\))|(?<DO_OR_DONT>do(n\'t)?\(\))/g)].reduce((acc, m) => {
    const { MUL: mul, DO_OR_DONT:doOrDont } = m.groups;
    if (doOrDont) {
       hasDont = doOrDont === "don't()";
       return acc;
    }
    if (mul && !hasDont) {
     const [, num1, num2] = mul.match(/mul\((\d+)\,(\d+)/);
     return acc + Number(num1) * Number(num2);
    }
    return acc;
}, 0));
