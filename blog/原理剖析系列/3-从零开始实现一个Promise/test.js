const Promise = require("./Promise")

function task1() {
  return new Promise(function(resolve, reject) {
      console.log("task1");
  })
}

function task2() {
  return new Promise(function(resolve, reject) {
      console.log("task2");
  })
}

function task3() {
  return new Promise(function(resolve, reject) {
      console.log("task3");
  })
}

// 调用函数
task1()
  .then(task2())
  .then(task3())