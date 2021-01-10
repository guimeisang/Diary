// compose
function compose(middleware) {
  // 参数
  if(!Array.isArray(middleware)) throw new TypeError('middleware must be array')
  for(const fn of middleware) {
    if(typeof fn !== 'function') {
      throw new TypeError('middleware must be function')
    }
  }

  // return Promise
  return function (context, next) {
    let index = -1
    // 开始调用
    return dispatch(0)
    function dispatch(i) {
      if(i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i;

      // 跳出条件
      let fn = middleware[i]
      if(i === middleware.length) fn = next
      if(!fn) return Promise.resolve()

      try {
        // 递归
        return Promise.resolve(fn(context, dispatch.bind(null, i+1)))
      } catch (error) {
        return Promise.reject(err)
      }
    }
  }
}