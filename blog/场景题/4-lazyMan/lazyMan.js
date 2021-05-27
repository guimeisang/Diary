function LazyMan(name) {
  if(new.target === LazyMan) {
    this.queue = [() => {
      console.log(`Hi! this is ${name}`)
      this.next()
    }]
    setTimeout(() => {
      this.next()
    })
  }else {
    return new LazyMan(name)
  }
}

LazyMan.prototype.eat = function(foot) {
  this.queue.push(() => {
    console.log(`Eat ${foot}`)
    this.next()
  })
  return this
}

LazyMan.prototype.sleep = function(seconds) {
  this.queue.push(() => {
    return new Promise((res) => {
      setTimeout(() => {
        console.log(`Wake up after ${seconds}`)
        res()
        this.next()
      }, seconds * 1000)
    })
  })
  return this
}

LazyMan.prototype.sleepFirst = function(seconds) {
  this.queue.unshift(() => {
    return new Promise((res) => {
      setTimeout(() => {
        console.log(`Wake up after ${seconds}`)
        res()
        this.next()
      }, seconds * 1000)
    })
  })
  return this
}

LazyMan.prototype.next = function() {
  const task = this.queue.shift()
  task && task()
}