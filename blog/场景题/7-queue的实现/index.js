class Queue {
  constructor(workerLen) {
    this.workerLen = workerLen || 3;
    this.list = [];
    this.worker = new Array(this.workerLen);
  }

  addList(list) {
    for (const item of list) {
      this.list.unshift(item);
    }
  }

  *executionFunc(index, fn, ...args) {
    // console.log("executionFunc params", ...args);
    yield fn.call(this, ...args).then(() => {
      // 任务执行完毕之后，再次分配任务并执行任务
      this.worker[index] = undefined;
      this.run();
    });
  }

  run() {
    const runIndex = [];
    for (let i = 0; i < this.workerLen; i++) {
      const len = this.list.length;
      if (!this.worker[i] && len > 0) {
        // 需要执行的任务
        this.worker[i] = this.executionFunc(i, ...this.list[len - 1]);
        runIndex.push(i);
        // 从任务队列中删除任务
        this.list.pop();
      }
    }
    // 执行任务
    for (const index of runIndex) {
      this.worker[index].next();
    }
  }
}

module.exports = Queue;
