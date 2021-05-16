function throttle(fn, interval) {
  var doing = false

  return function() {
    if(doing) return

    doing = true

    fn.apply(this, arguments)
    setTimeout(function() {
      doing = false
    }, interval)
  }
}