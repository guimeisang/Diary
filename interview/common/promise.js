// 手写一个promise
class Promsie {
  constructor(executor) {
    this.PENDING = 'PENDING'
    this.FULFILLED = 'FULFILLED'
    this.REJECTED = 'REJECTED'
    this.status =this.PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolve = []
    this.onReject = []

    let resolve = (value) => {
      if(this.status ===this.PENDING) {
        this.status =this.FULFILLED
        this.value = value
        this.onResolve.forEach(fn => fn())
      }
    }

    let reject = (reason) => {
      if(this.status ===this.PENDING) {
        this.status =this.REJECTED
        this.reason = reason
        this.onReject.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }

    let promise2 = new Promise((resolve, reject) => {
      if(this.status ===this.FULFILLED) {
        // 用setTimeout 模拟
        setTimeout(() => {
          try {
            let res = onFulfilled(this.value)
            this.resolvePromise(promise2, res, resolve, reject)
          }catch(e) {
            reject(e)
          }
        }, 0)
      }

      if(this.status ===this.REJECTED) {
        setTimeout(() => {
          try {
            let res = onRejected(this.reason)
            this.resolvePromise(promise2, res, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }

      if(this.status ===this.PENDING) {
        this.onResolve.push(() => {
          setTimeout(() => {
            try {
              let res = onFulfilled(this.value)
              this.resolvePromise(promise2, res, resolve, reject) 
            } catch (error) {
              reject(e)
            }
          }, 0)
        })

        this.onReject.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              this.resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })

    return promise2
  }

  // 说白了，就是onfulfilled和onrejected 函数有可能返回的是基本类型值，也有可能返回的时候promise实例；
  resolvePromise = (promise2, x, resolve, reject) => {
    if (promise2 === x) { 
      return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }

    let called
    // 就是处理resolve或者reject返回为函数或者promise
    if((typeof x === 'object' && x != null) || typeof x === 'function') {
      try {
        let then = x.then
        // 其实看起来没怎么看懂
        if (typeof then === 'function') {
          then.call(x, y => {
            if(called) return
            called = true
            resolvePromise(promise2, y, resolve, reject)
          }, r => {
            if(called) return
            called = true
            reject(r)
          })
        }else {
          resolve(x)
        }
      } catch (e) {
        if(called) return
        called = true
        reject(e)
      }
    }else {
      resolve(x)
    }
  }

}