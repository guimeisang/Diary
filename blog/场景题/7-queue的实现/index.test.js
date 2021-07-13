const Queue = require("./index");

function sleep(id, timer) {
  console.log("开始id", id);

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("结束id", id);
      resolve();
    }, timer * 1000);
  });
}

const queue = new Queue();

queue.addList([
  [sleep, "0001", 3],
  [sleep, "0002", 5],
  [sleep, "0003", 8],
  [sleep, "0004", 1],
  [sleep, "0005", 12],
  [sleep, "0006", 8],
  [sleep, "0007", 2],
  [sleep, "0008", 10],
]);

queue.run();
