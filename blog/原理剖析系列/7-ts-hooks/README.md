### basic hooks
useCallback: 将闭包函数注册到react中
useContext: Provider还是按照之前的方法提供，但是在函数组件中还是可以用useContext去做cunstomer
useMemo: 缓存，和useCallback很像，用法，但是需要看源码才能知道不一样在哪
useReducer: 还是需要自己去实现reducer和initialState，但是在函数组件中，可以使用useReducer直接的拿到对应的值，和改变值的dispatch，我感觉还是比之前更好用了！

### 源码 