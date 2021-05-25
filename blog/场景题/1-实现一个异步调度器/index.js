/**
 * 设计一个调度器，先执行
 * */ 
var Promise = require('bluebird')

class Scheduler {
  constructor() {
    this.list = []
    this.maxCount = 2
    this.cur = 0
  }

  add(promiseCreator) {
    return new Promise((res, rej) => {
      this.list.push([promiseCreator, res])
      if(this.cur < 2) {
        this.run()
      }
    })
  }

  // 递归行数很重要
  run() {
    if(this.list.length == 0) return
    const [task, resolve] = this.list.shift()
    this.cur += 1
    task().then(_ => {
      this.cur -= 1
      resolve()
      this.run()
    })
  }
}

const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})

const scheduler = new Scheduler()

const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order))
}

addTask(1000, "1")
addTask(500, "2")
addTask(300, "3")
addTask(400, "4")
