/**
 * setImmediate(): do something on the next tick
 * process.nextTick(): do something immediately
 *
 * 是不是感觉很难受，命名和作用刚好相反
 */

// function step(iteration) {
//   if (iteration === 10) return;
//   setImmediate(() => {
//     console.log(`setImmediate iteration: ${iteration}`);
//     step(iteration + 1);
//   });
//   process.nextTick(() => {
//     console.log(`nextTick iteration: ${iteration}`);
//   });
// }
// step(0);

// nextTick iteration: 0
// setImmediate iteration: 0
// nextTick iteration: 1
// setImmediate iteration: 1

function step(iteration) {
  if (iteration === 3) return;
  setImmediate(() => {
    console.log(`setImmediate iteration: ${iteration}`);
  });

  process.nextTick(() => {
    console.log(`nextTick iteration: ${iteration}`);
    step(iteration + 1);
  });
}
step(0);

/**
nextTick iteration: 0
nextTick iteration: 1
nextTick iteration: 2
setImmediate iteration: 0
setImmediate iteration: 1
setImmediate iteration: 2
 */

// 总结：需要记住nodejs-event-loop的代码，会发现如果nextTick是真的是在下一个事件之后执行，而setImmediate则是在所有的nextTick执行完之后再执行
