const Koa = require('koa')
const app = new Koa()

async function limitWrapper(asyncFunc, maxAllowedRequest) {
  const queue = []
  const counter = 0
  return async function () {
    if(counter > maxAllowedRequest) {
      await new Promise((resolve, resject) => {
        queue.push(resolve)
      })
    }
    counter++
    const result = await asyncFunc()
    counter--
    queue.shift()()
    return result
  }
}