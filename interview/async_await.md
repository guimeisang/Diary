#### async await 
> 在平时的写代码中，经常遇到这个，但是感觉对其的了解还是不够准确，全面和深刻
async 函数是Generator 函数的语法糖。使用关键词async来表示，

##### async 

async 异步函数（包含函数声明、函数表达式、Lambda表达式[箭头函数]等使用形式）
1. 返回一个 Promise 对象
  1. 直接返回成功或失败状态的promise
    1.1 函数体没有await，return 一个普通值（非promise和thenable对象，默认undefined），async立刻返回一个成功状态的promise，值为该普通值
    1.2 函数体中没有await或在await之前，抛出异常，async立即返回失败的promise，值为失败原因，异常不会抛到函数体外面影响外面代码的执行
  2. 先返回PENDING状态的promise，然后再异步修改状态
    2.1 函数体中有await，在await获取到值之前，async先返回 PENDING 状态的promise，然后再根据await后面表达式返回promise的状态而改变
    2.2 如果await后面表达式返回的promise失败且未捕获异常，则async返回的promise失败，失败原因是表达式返回promise的失败原因
2. 最外层async无法用 await 获取其返回值，应该用原来的方式：then() 链来处理async返回的 promise 对象

##### await 表达式（包含promise对象，普通函数调用，基本值类型）
1. 【等待】表达式的【返回值】
    1.1 如果表达式的值是promise对象，则等待promise返回（调用其then方法，异步获取），并将其返回值作为await表达式的值
    1.2 如果表达式的值不是promise对象，则通过 Promise.resolve 转换为 promise对象,等待其返回，并将其返回值作为await表达式的值
2. await相当于调用后面表达式返回promise的then方法，异步（等待）获取其返回值。即 await<==>promise.then
    2.1 不管代码中是否用到await表达式返回值，await都会去获取（调用其then方法），在获取到之前，async会返回一个 PENDING 状态的promise。
    2.2 函数体中await表达式后面的代码相当于promise.then方法的第一个回调(onResolved),可以拿到表达式返回promise的返回值（即await表达式返回值）
        因此await会阻塞函数体中后面代码的执行（异步执行then的回调），但是表达式是同步执行的【因此await操作符只能出现在async异步函数中】
        如果await表达式后面没有代码，则相当于then的第一个回调不传，使用默认回调函数（v=>v）
    2.3 调用promise.then方法的第二个回调默认不传，使用默认回调函数（err=>{throw err}）
        因此当表达式报错或返回失败的promise，await会将该异常抛出到函数体中，可以（需要）通过try-catch捕获异常
        如果await promise调用了其catch方法，则不会抛出，因为catch也返回一个promise，相当于await调用catch返回promise的then方法
        第二个回调传递方式：
          1. 当表达式返回值是promise且调用其catch方法时，相当于传递了第二个回调（即catch方法中的回调）
          2. 当await表达式放在try-catch中时，相当于传递了第二个回调（即catch方法中的回调）

async/await和Promise是必须要完全搞清楚的，但是实际上还是需要不断的使用和不断的理解才能完全的掌握它
