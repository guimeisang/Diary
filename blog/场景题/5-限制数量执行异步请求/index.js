let getUrl = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
    .then(data => resolve(data))
    .catch(err => reject(err))
  })
}

let result = []
let index = 0
let excuteFn = (arr, limit) => {
  if(index > arr.length - 1) return
  const p = getUrl(arr[index]).finally(() => result.splice(result.indexOf(p), 1))
  result.push(p)
  ++index

  if(result.length >= limit) {
    Promise.race(result).then(() => excuteFn(arr, limit))
  }else {
    excuteFn(arr, limit)
  }
}

