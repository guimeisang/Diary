// 手写：模拟红绿灯：红灯3s，绿灯2s，黄灯1s，如此循环（async await）
function LightParams(color, timestamp) {
  this.color = color
  this.timestamp = timestamp
}

const invokeLight = (color, timestamp) => {
  return new Promise(resolve => setTimeout(() => {
    resolve(console.log(`${color}灯 ${timestamp}`))
  }, timestamp * 1000))
}

const temp = [
  new LightParams('红', 3),
  new LightParams('绿', 2),
  new LightParams('黄', 1)
]

// 原来 Promise.resolve() 还有这个作用
const circleLight = (list, func) => {
  list.reduce(async (pre, cur) => {
    await pre;
    return func(cur.color, cur.timestamp);
  }, Promise.resolve())
}

circleLight(temp, invokeLight)