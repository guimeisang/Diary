```js
/**
* 有一组 url 的数组：array = [url1, url2..]
* 一个拉取url的fetch方法，返回promise：fetch(url).then();
* 实现execute方法，同时最多只能有 limit 个 fetch 可以同时执行。
* 并且下载的尽可能快，在1个fetch 下载完成后就马上开始下一个待下载的url。
**/
```

### 思考
其实和红绿灯很像，就是维护一个队列
并且自执行