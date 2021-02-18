const _async = (func) => {
  const p = new Promise((resolve, reject) => {
    try {
      const value = func()
      if (((typeof value === 'object' && value !== null) || typeof value === 'function') && typeof value.then === 'function') {
        Promise.resolve(value).then(resolve, reject)
      }else {
        resolve(value)
      }
    } catch (error) {
      reject(error)
    }
  })
  return p
}

const _await = (arg) => (onResolved, onRejected) => {
  const innerPromise = onRejected ? Promise.resolve(arg).catch(onRejected).then(onResolved, onRejected) : Promise.resolve(arg).then(onResolved, onRejected)
  return innerPromise
}

module.exports = {
  _async,
  _await
}

// 如何使用

function resolveAfter3Seconds() {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve("哈哈哈")
    }, 3000)
  })
}

async function asyncCall() {
  console.log("我直接就打印了")
  const result = await resolveAfter3Seconds()
  console.log(result)
}