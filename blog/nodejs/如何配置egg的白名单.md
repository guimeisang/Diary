### 场景
用anywhere 跑一个本地的html，结果在调用本地的nodejs服务的时候，一直出现跨域问题（csrf）


### 解决办法
在egg项目中的 config.default.js中

```js
 config.security = {
    "csrf": false,
    "debug": "csrf-disable",
    "domainWhiteList": [ 'http://localhost:3002', 'http://172.18.165.30:3002' ]
};

```
如上设置跨域的白名单

### 总结
这个是egg框架为了安全这一块，增加了csrf这个模块