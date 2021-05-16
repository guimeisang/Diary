// 概括柯里化：把接收多参的函数转化成可以逐个调用单个参数并返回接收剩下参数的函数

const curry = (func) => fn = (...args) => {
  console.log("see", func.length, args.length)
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