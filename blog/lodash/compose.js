var reverse = arr => arr.reverse()
var _pipe = (f, g) => (...args) => g.call(this, f.apply(this, args));
var compose = (...args) => reverse(args).reduce(_pipe, args.shift())

var classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
var toUpper = str => str.toUpperCase()
var repeat = str => str.repeat(2)
var result = compose(repeat, toUpper, classyGreeting)('dong', 'zhe')
console.log('让我们来看看数据：', result)