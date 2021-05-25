#### 防抖函数
经典写法：

```js
function debounce(fn, time) {
  let timer
  return function(...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, ...args)
      timer = null
    }, time)
  }
}
```

然后来思考下在react-hook中如何写，先写下如何使用：

```js
export default function() {
  const [counter, setCounter] = useState(0)

  const handleClick = useDebounce(() => {
    setCounter(counter + 1)
  }, 1000)

  return (
    <div>
      <Button
        onClick={handleClick}
      ></Buttom>  
      <div>{counter}</div>
    </div>
  )
}

```