const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

class MyPromise {
    constructor(executor) {
        this.state = PENDING
        this.value = undefined
        this.reason = undefined
        this.onFulfilledFunc = []; //保存成功回调
        this.onRejectedFunc = []; //保存失败回调
        executor(this.resolve, this.reject)
    }

    resolve(value) {
        if (this.state === PENDING) {
            this.value = value
            this.onFulfilledFunc.forEach(fn => fn(value))
            this.state = RESOLVED
        }
    }

    reject(reason) {
        if (this.state === PENDING) {
            this.reason = reason
            this.onRejectedFunc.forEach(fn => fn(reason))
            this.state = REJECTED
        }
    }
}

MyPromise.prototype.then = (onFullFilled, onRejected) => {
    var promise2 = new Promise((resolve, reject) => {})
    var self = this 
    if (this.state === PENDING) {
      promise2 = new Promise(function(resolve, reject){
        if (typeof onFulfilled === 'function') {
          self.onFulfilledFunc.push(() => {
            setTimeout(() => {
              try {
                let x = onFullFilled(self.value)
                resolvePromise(promise2, x, resolve, reject) //解析then返回值与新Promise对象
              } catch (error) {
                reject(error)
              }
            })
          }); //保存回调
        }
        if (typeof onRejected === 'function') {
          self.onRejectedFunc.push(()=>{
            setTimeout(()=> {
              try {
                let x = onRejected(self.reason)
                resolvePromise(promise2, x, resolve, reject)
              } catch (error) {
                reject(error)
              }
            })
          }); //保存回调
        }
      })
        
    }
    if (this.state === RESOLVED) {
        if (typeof onFullFilled === 'function') {
          promise2 = new Promise((resolve, reject) => {
            setTimeout(() => {
              try {
                let x = onFullFilled(self.value)
                resolvePromise(promise2, x, resolve, reject)
              } catch (error) {
                reject(error)
              }
            })
          })
        }
    }
    if (this.state === REJECTED) {
        if (typeof onRejected === 'function') {
          promise2 = new Promise((resolve, reject) => {
            setTimeout(() => {
              try {
                let x = onRejected(self.reason)
                resolvePromise(promise2, x, resolve, reject)
              } catch (error) {
                reject(error)
              }
            })
          })
        }
    }
    return promise2
}

/**
 * 解析then返回值与新Promise对象
 * @param {Object} promise2 新的Promise对象
 * @param {*} x 上一个then的返回值
 * @param {Function} resolve promise2的resolve
 * @param {Function} reject promise2的reject
 */
function resolvePromise(promise2, x, resolve, reject) {
  if(promise2 === x) {
    reject(new TypeError('Promise发生了循环引用'))
  }
  if(x !== null && (typeof x === 'object') || typeof x === 'function') {
    // 可能是个对象或者是函数
    try {
      let then = x.then
      if(typeof then === 'function') {
        let y = then.call(x, (y) => {
          // 递归调用，传入y若是Promise对象继续循环
          resolvePromise(promise2, y ,resolve, reject)
        }, (r) => {
          reject(r)
        })
      }else {
        resolve(x)
      }
    } catch (error) {
      reject(error)
    }
  } else {
    // 是个普通的值
    resolve(x)
  }
}

module.exports = MyPromise
