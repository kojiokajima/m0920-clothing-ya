const first = num => num + 1;

const second = num => num * num;

const third = num => num * num * num;

function compose(...funcs){
  // console.log(funcs);
  // --> funcsは配列になってる
  // 0: num => num + 1 これがfirst
  // 1: num => num * num これがsecond
  // 2: num => num * num * num これがthird

  funcs.reduce((before, after) => console.log("before: ", before + "    after: ", after))
  // before:  num => num + 1    after:  num => num * num
  // before:  undefined    after:  num => num * num * num

  funcs.reduce((before, after) => {
    console.log("ARGS ", args);
    return (args)
  })

  const result = funcs.reduce((before, after) => (...args) => before(after(...args)))


  return result
}

const result = compose(first, second, third)(3);
console.log(result);