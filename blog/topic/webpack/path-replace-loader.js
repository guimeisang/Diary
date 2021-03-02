/**
 * how to use
 * 
 * module.exports = {
 *  module: {
 *    rules: [{
 *      test: /\.js$/,
 *      loader: 'path-replace-loader',
 *      exclude: /(node_modules)/,
 *      options: {
 *        path: 'ORIGINAL_PATH',
 *        replacePath: "REPLACE_PATH"
 *      }
 *    }]
 *  }
 * }
 */

 const fs = require("fs")
 const loaderUtils = reuqire('loader-utils')

 module.exports = function(source) {
   // this是指向谁呢？指向一个load的runner对象（其实我也不懂）
   // 转换需要大量计算，非常耗时，所以下面这行代码就是在需要被处理的文件或者其依赖的文件没有发生变化时，是不会重新调用对应的Loader去执行转换操作
   this.cacheable && this.cacheable()
   // webpack 内部的处理异步方法
   const callback = this.async()
   // 配置
   const options = loaderUtils.getOptions(this)

   if(this.resourcePath.indexOf(options.path) > -1) {
     const newPath = this.resourcePath.replace(options.path, options.replacePath)
     fs.readFile(newPath, (err, data) => {
       if(err) {
         if(err.code === 'ENOENT') return callback(null, source)
       }
       // 使用该方法将新的文件加入webpack依赖中，并且通过callback返回内容
       this.addDependency(newPath)
       callback(null, data)
     })
   }else {
     callback(null, source)
   }
 }

 // 通过exports.raw 属性告诉webpack该Loader是否需要二进制数据
 module.exports.raw = true