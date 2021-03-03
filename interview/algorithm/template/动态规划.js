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

// 动态规划关键点
// 1. 最优子结构 opt[n] = best_of(opt[n-1], opt[n-2], ...)
// 2. 存储中间状态：opt[i]
// 3. 递推公式（美其名曰：状态转移方程或者DP方程）
//    Fib: opt[i] = opt[n-1] + opt[n-2]
//    二维路径：opt[i, j] = opt[i+1][j] + opt[i][j+1]