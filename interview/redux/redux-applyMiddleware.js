export default function applyMiddleware(...middlewares) {
  return (next) => 
    (reducer, initialState) => {
      var store = next(reducer, initialState)
      var dispatch = store.dispatch
      var chain = []

      var middlewareAPI = {
        getState: store.getState,
        dispatch: (action) => dispatch(action)
      }

      chain = middlewares.map(middleware => middleware(middlewareAPI))

      dispatch = compose(...chain, store.dispatch)

      return {
        ...store,
        dispatch
      }
    }
}

export default function compose(...funcs) {
  funcs.length === 0 && return arg => arg
  funcs.length === 1 && return funcs[0]
  return funcs.reduce((a, b) => (...args) => a(b(...args))) // 递归
}