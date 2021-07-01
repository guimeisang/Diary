/**
 * setImmediate(): 在栈完成后（等待I/O之前）立即执行
 */

while (tasksAreWaiting()) {
  queue = getNextQueue();
  while (queue.hasTasks()) {
    task = queue.pop();
    execute(task);

    while (nextTickQueue.hasTasks()) {
      doNextTickTask();
    }

    while (promiseQueue.hasTasks()) {
      doPromiseTask();
    }
  }
}
