实现一个lazyMan，按照下面的方式调用的时候，得到相关输出

```js
LazyMan('Mulige')
// Hi! This is Mulige

LazyMan('Mulige').sleep(10).eat('dinner')
// Hi! This is Mulige
// 等待10s
// wake up after 10
// Eat dinner~

LazyMan('Mulige').eat('dinner').eat('supper')
// Hi! This is Mulige
// eat dinner
// eat supper

LazyMan('Mulige').sleepFirst(5).eat('supper')
// 等待5秒
// Wake up after 5
// Hi! This is Mulige
// Eat supper~

```