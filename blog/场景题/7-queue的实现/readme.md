### 看下题目

```js
/**
 * Queue is a queue function, it can limit the number of simultaneous execution methods.
 * For example, when uploading multiple files at the same time,
 * using the queue function can limit uploading up to 3 files each time,
 * When one file is uploaded, upload the next file.
 *
 * Queue是一个队列函数，它可以限制同时执行方法的数量。
 * 比如同时上传多个文件，使用队列函数可以限制每次最多上传3个文件，
 * 当一个文件上传完毕后，接着上传下一个文件。
 */
```

### 测试用例

```js
/**
 * example:
 *
 * function task() { / * do something * / }
 *
 * const queue = new Queue({ workerLen: 3 });
 *
 * queue.add(
 *   [task, undefined, 1],
 *   [task, undefined, 2],
 *   [task, undefined, 3],
 *   // ...
 * );
 * queue.run();
 *
 * queue.add([task, undefined, 4]);
 * queue.add([task, undefined, 5]);
 * queue.run();
 */
```

### 参考文档

https://duan602728596.github.io/article/queue-in-js
