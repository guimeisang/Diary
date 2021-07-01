/**
 * 这个代码只是表达
 */
while (true) {
  queue = getNextQueue();
  task = queue.pop(); // setTimeout, I/O,
  execute(task);

  while (microtaskQueue.hasTasks()) doMicrotask(); // promise

  if (isRepaintTime()) {
    // requestAnimationFrame的回调函数
    animationTasks = animationQueue.copyTasks();
    for (task in animationTasks) doAnimationTask(task);

    repaint();
  }
}
