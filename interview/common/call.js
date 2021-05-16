Function.prototype.myCall = function(context) {
  context = context || window
  let fn = mySymbol(context)
  context[fn] = this
  let arg = [...arguments].slice(1)
  context[fn](...arg)
  delete context[fn]
}

function mySymbol(obj) {
  let unique = (Math.random() + new Date().getTime()).toString(32).slice(0, 8)
  if(obj.hasOwnProperty(unique)) {
    return mySymbol(obj)
  } else {
    return unique
  }
}