// 以解决Fibonacci 数列为例

// 自顶向下
function fib(n, memo) {
  if(n <= 1) {
    return n
  }

  if(!memo[n]) {
    memo[n] = fib(n - 1) + fib(n - 2)
  }

  return memo[n]
}

// 自低向上
function fib2(n) {
  var a = []
  a[0] = 0
  a[1] = 1
  for(var i = 2; i < n; i++) {
    a[i] = a[i - 1] + a[i - 2]
  }
  return a[n]
}

// 暴力法：傻递归
// 动态规划关键点
// 1. 重复性（分治，分解成子问题）
// 2. 定义状态数组（是一维的还是二维的）
// 3. DP方程：自底向上 或者是 数学归纳法方程

// 例如三角形最小路径和
// 1. 重复性（分治）： problem(i,j) = min(sub(i+1, j), sub(i+1, j+1)) + a[i, j]
// 2. 定义状态数组：f[i,j]
// 3. DP方程：f[i,j] = min(f[i+1, j], f[i+1, j+1]) + a[i, j] 