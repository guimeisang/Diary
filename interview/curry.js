const curry = (func) => fn = (...args) => {
  if(args.length < func.length) {
    return function() {
      return fn(...args.concat(Array.from(arguments)))
    }
  }
  return func(...args)
}

var fn = curry(function(a,b,c){
  return a + b + c;
})
const result = fn("a")("b")("c")
console.log('result: ', result)