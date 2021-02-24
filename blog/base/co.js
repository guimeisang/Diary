// 例如express中间件，给异步任务async-fun传入一个next方法，只有调用next，队列才会继续往下走。那next就非常重要了，它会控制队列往后移动一位
// 执行下一个async-fun，所以需要一个队列，来保存async-fun，也需要一个游标，来控制顺序
// queue.add 添加异步任务 和 queue.run 执行队列
// 参考文档：https://segmentfault.com/a/1190000011402741

// 静态的，就是一开始就add好，中间不能add
const queue = () => {
  const list = []
  let index = 0
  const isStop = false

  // 这里又一个递归函数
  const next = () => {
    if(index >= list.length - 1 || isStop) return // 判断条件

    // 游标 + 1
    const cur = list[++index] // 入归
    cur(next) // 执行
  }

  const add = (...fn) => {
    list.push(...fn)
  }

  const run = (...args) => {
    const cur = list[index]
    typeof cur === 'function' && cur(next)
  }

  const stop = () => {
    isStop = true
  }

  const retry = () => {
    isStop = false
    run()
  }

  const goOn = () => {
    isStop = false
    run()
  }

  return {
    add,
    run,
    stop,
    retry,
    goOn
  }
}

const _async = (x) => {
  return (next) => {
    setTimeout(() => {
      console.log(x)
      next()
    }, 1000)
  }
}

const q = queue()
const funs = '123456'.split('').map(x => _async(x))
q.add(...funs)
q.run()

// 如何改造成动态，可以随时在add，也可以一直在run；是不是要新起一个进程
