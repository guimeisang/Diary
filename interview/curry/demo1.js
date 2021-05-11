// sum(1)(2)(3)
// 第一
// function sum(a) {
//   return function(b) {
//     return function(c) {
//       return a + b + c
//     }
//   }
// }

// // 其实很像递归能够解决的问题

var add = function(num1, num2) {
  return num1 + num2
}

function curry(fn) {
  var args = [...arguments]
  return function() {
    return fn.apply(null, args.concat([...arguments]))
  }
}

var sum = curry(add)
console.log(sum(4)(3)(2)(1))