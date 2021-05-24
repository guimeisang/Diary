async function limiter(ctx, next) {
  if(counter >= maxAllowedRequest) {
    await new Promise((resolve, reject) => {
      queue.push(resolve)
    })
  }
  counter++
  await next()
  counter--
  queue.shift()()
}

// how to use
router.use('/api', limiter)