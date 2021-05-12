// 上一个函数的结果就是下一个函数的参数
var _pipe = (f, g) => (...args) => g.call(this, f.apply(this, args))