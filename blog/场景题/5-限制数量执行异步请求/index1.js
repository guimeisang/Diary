const fetchData = url => fetch(url)

const execute = (urlList, limit = 2) => {
  const pending = []
  const result = []
  for(let i = 0; i < limit; i++) {
    result.push(fetchData(urlList[i]).finally(() => {
      pending.length && pending.shift()()
    }))
  }
  for(let j = limit; j < urlList.length; j++) {
    result.push(new Promise((resolve) => {
      pending.push(resolve)
    }).then(() => fetchData(urlList[j])).finally(() => {
      pending.length && pending.shift()()
    }))
  }
  return result
}