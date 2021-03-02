const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()

const queue = []
const maxAllowedRequest = 3
let counter = 1

async function requestApi(index) {
  // console.log("requestApi", index)
  if(counter > maxAllowedRequest) {
    await delay()
  }

  counter++
  // console.log("执行前", index)
  const result = await new Promise((resolve, reject) => {
    setTimeout(()=> {
      // console.log("异步任务做完啦")
      resolve("哈哈哈")
    }, 3000)
  })
  console.log("执行后", index, counter, queue.length)
  counter--

  typeof queue.shift() === 'function' && queue.shift()()
  return result
}

function delay() {
  return new Promise((res, rej) => {
    // console.log("delay 完成了！！！")
    queue.push(res)
  })
}

// 路由
router.all('/api', async ctx => {
  const { index } = ctx.query
  requestApi(index)
  ctx.body = "已经在处理了,index: " + index
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(8989)