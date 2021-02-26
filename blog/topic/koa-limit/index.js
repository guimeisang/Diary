const Koa = require('koa')
const app = new Koa()

const queue = []

app.use( async (ctx, next) => {
  ctx.body = 'hello'
  console.log("我的请求来了")
  setTimeout(() => {
    console.log("我完成任务啦啦啦～～～")
    queue.shift()()
  }, 3000);
  await delay()
  console.log("这个时候我才能进入新的任务哦")
})

function delay() {
  return new Promise((res, rej) => {
    queue.push(res)
  })
}

app.listen(8989)