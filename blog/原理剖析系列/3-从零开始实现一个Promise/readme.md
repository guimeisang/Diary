先看看promise的一个基本用法：

```js
function task1() {
  return new Promise((resolve, reject) => {
    console.log('task')
  })
}
function task2() {
  return new Promise((resolve, reject) => {
    console.log('task2')
  })
}
function task3() {
  return new Promise((resolve, reject) => {
    console.log('task3')
  })
}

// 调用函数
task1().then((res) => {}, (err) => {})
```

参考文档：https://github.com/iloveyou11/learning-blog/issues/25