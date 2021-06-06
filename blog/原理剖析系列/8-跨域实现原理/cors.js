// cors实现（最常用） -- 服务端设置
// express示例

const whiteList = ['http://localhost:3000']
app.use((req, res, next) => {
  let origin = req.headers.origin
  if(whiteList.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin) // 允许哪个源可以访问我
    res.setHeader('Access-Control-Allow-Headers', 'name') // 允许携带哪个头访问我
    res.setHeader('Access-Control-Allow-Methods', 'POST') // 允许哪个方式访问我
    res.setHeader('Access-Control-Max-Age', 6) // 预检的存活时间
    res.setHeader('Access-Control-Allow-Credentials', true) // 允许携带cookie
    res.setHeader('Access-Control-Expose-Headers', 'name') // 允许返回的头

    // post/put请求前会发送options请求,试探作用,看服务器是否支持
    if (req.method === 'OPTIONS') {
      next()
    }
  }
})