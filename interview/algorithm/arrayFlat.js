let sourceArr = [[0], [2, 3, 4], 1, [1, [2, 3]]];
let resultArr = [];

function arrayFlat(arr) {
  if(!hasChildArray(arr)) {
    resultArr = resultArr.concat(arr)
  }else {
    arr.forEach(element => {
      if(typeof element == 'number') {
        resultArr.push(element)
      }else if (Array.isArray(element)) {
        arrayFlat(element) // 其实就是运用了递归的方式去解决，并且注意那些类型判
      }
    });
  }
}

arrayFlat(sourceArr)

console.log(resultArr)

function hasChildArray(arr) {
  return arr.some((item) => {
    if(Array.isArray(item)) {
      return true
    }
  })
}