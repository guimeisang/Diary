// 调用方式：
jsonp({
  url: 'xxx',
  params: {
    wd: 'aa'
  },
  cb: 'show'
}).then(data => {
  console.log(data)
})

// jsonp实现
function jsonp({
  url,
  params,
  cb
}) {
  return new Promise((resolve, reject) => {
    window[cb] = function(data) {
      resolve(data)
      document.body.removeChild(script)
    }
    params = {
      ...params,
      cb
    }
    let arrs = []
    for(const key in params) {
      arrs.push(`${key}=${params[key]}`)
    }
    let script = document.createElement('script')
    script.src = `${url}?${arrs.join('&')}`
    document.body.appendChild(script)
  })
}